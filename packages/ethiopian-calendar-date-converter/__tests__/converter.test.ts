import { converterString } from '../src/ethiopianCalendarDateConverter'
import { describe, it, expect } from 'vitest'

const fixture = {
  dates: {
    European: new Date('09 Apr 2020 07:00:00'),
    Ethiopian: ['Meyazya 1, 2012', '07:00:00 a.m.'],
  },
}

describe('main', () => {
  it('converts European date to Ethiopian', () => {
    expect(
      converterString.dateTime.toEthiopian(fixture.dates.European),
    ).toStrictEqual(fixture.dates.Ethiopian)
  })
})
