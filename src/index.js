/**
 * Imports
 */

import channel from '@f/channel'
import {fork} from '@koax/fork'

/**
 * driver
 * @param {Function} fn subscriber
 * @return {Object} {push, drive} and drive functions
 */

function driver (fn) {
  let {take, put} = channel()
  fn && fn(put)
  return {
    push: put,
    drive: function * (listener) {
      return yield fork(drive(take, listener))
    }
  }
}

/**
 * Drive values to listener (`fn`)
 * @param {Function} take
 * @param {Function} fn listener
 */

function * drive (take, fn) {
  while (true) {
    let val = yield take()
    yield fork(fn.bind(null, val))
  }
}

/**
 * Exports
 */

export default driver
