/**
 * Imports
 */

import test from 'tape'
import driver, {NEXT} from '../src'
import middleware from '@f/middleware'
import run from '@koax/run'
import promise from '@koax/promise'
import {forkEffect} from '@koax/fork'

/**
 * Tests
 */

test('should push', (t) => {
  t.plan(2)
  let {drive} = driver(push => {
    push(1)
    setTimeout(function () {
      push(2)
    })
  })

  let count = 1

  let dispatch = createDispatch()
  dispatch(drive(val => {
    t.equal(val, count++)
  }))
})

test('should resolve push', (t) => {
  t.plan(1)
  let {drive} = driver(push => {
    push(1).then(val => t.deepEqual(val, 2))
  })

  let count = 1

  let dispatch = createDispatch()
  dispatch(drive(val => {
    return val + 1
  }))
})

function createDispatch() {
  let i = middleware(run())
  return i.use(promise).use(forkEffect(i)).use(function (action, next) {
    if (action.type === NEXT)
      return action.payload
    return next()
  })
}
