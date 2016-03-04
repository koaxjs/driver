/**
 * Imports
 */

import channel from '@f/channel'
import identity from '@f/identity'
import {fork} from '@koax/fork'

/**
 * Actions
 */

const BOOT = '@koax/driver/BOOT'
const NEXT = '@koax/driver/NEXT'

/**
 * driver
 * @param {Function} fn subscriber
 * @return {Object} {push, drive} and drive functions
 */

function driver (fn) {
  let {take: getDispatch, put: dispatch} = channel()
  fn && fn(push)
  return {
    push,
    drive: function * (listener) {
      listener = listener || identity
      return yield fork(drive(getDispatch, listener))
    }
  }

  function push (val) {
    let {take: getRet, put: ret} = channel()
    return dispatch([val, ret])
      .then(function () {
        return getRet()
      })
      .then(function (task) {
        return task.done
      })
  }
}

/**
 * Drive values to listener (`fn`)
 * @param {Function} take
 * @param {Function} fn listener
 */

function * drive (getDispatch, fn) {
  while (true) {
    let [val, ret] = yield getDispatch()
    ret(yield fork(function * () {
      return yield next(fn(val))
    }))
  }
}


/**
 * Next action creator
 * @param  {Object}   action
 * @return {Object}
 */

function next (action) {
  return {type: NEXT, payload: action}
}

/**
 * Boot action creator
 * @param {Object} ctx
 * @return {Object}
 */

function boot (ctx) {
  return {type: BOOT, payload: ctx}
}

/**
 * Exports
 */

export default driver
export {next, NEXT, boot, BOOT}
