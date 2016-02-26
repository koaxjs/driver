/**
 * Imports
 */

import test from 'tape'
import driver from '../src'
import koax, {interpreter} from 'koax'

/**
 * Tests
 */

test('should work', (t) => {
  t.plan(2)
  let {drive} = driver(next => {
    next(1)
    setTimeout(function () {
      next(2)
    })
  })

  let count = 1

  let interpret = interpreter(koax())
  interpret(drive(val => {
    t.equal(val, count++)
  }))
})
