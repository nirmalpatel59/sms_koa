const assert = require('assert')
// const moment = require('moment')

const openTime = '2018-04-01T02:00:00.000Z'
const closeTime = '2018-04-01T01:00:00.000Z'

/**
 *
 * @param {Date} openTime
 * @param {Date} closeTime
 * @param {Date} time
 */
const isOpen = (openTime, closeTime, currentTime) => {
  openTime = new Date(openTime)
  closeTime = new Date(closeTime)
  currentTime = new Date(currentTime)

  removeDate(openTime)
  removeDate(closeTime)
  removeDate(currentTime)

  const openTimeStamp = openTime.getTime()
  const closeTimeStamp = closeTime.getTime()
  const currentTimeStamp = currentTime.getTime()

  if (openTimeStamp === closeTimeStamp) {
    return true
  } else if (openTimeStamp < closeTimeStamp) {
    return currentTimeStamp >= openTimeStamp && currentTimeStamp <= closeTimeStamp
  } else {
    return currentTimeStamp >= openTimeStamp || currentTimeStamp <= closeTimeStamp
  }
}

/**
 *
 * @param {Date} date
 */
const removeDate = (date) => {
  date.setFullYear(1970, 0, 1)
}

describe('Test', () => {
  // it('2018-04-13T11:00:00Z', () => {
  //   assert.equal(isOpen(openTime, closeTime, '2018-04-13T11:00:00Z'), true)
  // })
  // it('2018-04-13T12:30:00Z', () => {
  //   assert.equal(isOpen(openTime, closeTime, '2018-04-13T12:30:00Z'), true)
  // })
  // it('2018-04-14T01:30:00Z', () => {
  //   assert.equal(isOpen(openTime, closeTime, '2018-04-14T01:30:00Z'), false)
  // })
  it('Restaurant test', () => {
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T00:32:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T01:22:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T02:39:30Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T03:40:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T04:52:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T08:00:01Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T08:01:00Z'), true)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T08:01:12Z'), true)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T08:10:00Z'), true)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T09:42:00Z'), true)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T10:05:00Z'), true)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T11:32:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T12:22:30Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T13:23:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T14:12:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T15:42:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T16:22:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T17:28:30Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T18:32:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T19:38:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T20:49:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T21:59:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T22:59:00Z'), false)
    assert.equal(isOpen('2018-01-01T08:01:00Z', '2018-01-01:10:29:00Z', '2018-04-14T23:59:00Z'), false)
  })
})
