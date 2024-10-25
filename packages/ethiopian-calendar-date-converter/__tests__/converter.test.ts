import { describe, expect, it } from 'vitest'

import { EthDateTime } from '../src/ethiopianCalendarDateConverter'

const fixture = {
  dates: [
    {
      European: new Date('09 Apr 2020 07:08:40'),
      Ethiopian: {
        string: 'Meyazya 1, 2012, 07:08:40 a.m.',
        year: 2012,
        month: 8,
        date: 1,
        hour: 7,
        minute: 8,
        second: 40,
      },
    },
  ],
}

describe('conversion', () => {
  it('converts European date to Ethiopian', () => {
    fixture.dates.forEach((date) => {
      const convertedEthiopianDate = EthDateTime.fromEuropeanDate(date.European)
      const fixtureEthiopianDate = date.Ethiopian

      expect(String(convertedEthiopianDate)).toBe(fixtureEthiopianDate.string)
      expect(convertedEthiopianDate.year).toBe(fixtureEthiopianDate.year)
      expect(convertedEthiopianDate.month).toBe(fixtureEthiopianDate.month)
      expect(convertedEthiopianDate.date).toBe(fixtureEthiopianDate.date)
      expect(convertedEthiopianDate.hour).toBe(fixtureEthiopianDate.hour)
      expect(convertedEthiopianDate.minute).toBe(fixtureEthiopianDate.minute)
      expect(convertedEthiopianDate.second).toBe(fixtureEthiopianDate.second)
    })
  })

  it('initialises Ethiopian date', () => {
    fixture.dates.forEach((date) => {
      const fixtureDate = date.Ethiopian
      const initialisedDate = new EthDateTime(
        fixtureDate.year,
        fixtureDate.month,
        fixtureDate.date,
        fixtureDate.hour,
        fixtureDate.minute,
        fixtureDate.second,
      )

      expect(String(initialisedDate)).toBe(initialisedDate.toString())
      expect(initialisedDate.year).toBe(initialisedDate.year)
      expect(initialisedDate.month).toBe(initialisedDate.month)
      expect(initialisedDate.date).toBe(initialisedDate.date)
      expect(initialisedDate.hour).toBe(initialisedDate.hour)
      expect(initialisedDate.minute).toBe(initialisedDate.minute)
      expect(initialisedDate.second).toBe(initialisedDate.second)
    })
  })

  it('converts Ethiopian date to European', () => {
    fixture.dates.forEach((date) => {
      const fixtureEthDate = date.Ethiopian
      const initialisedEthDate = new EthDateTime(
        fixtureEthDate.year,
        fixtureEthDate.month,
        fixtureEthDate.date,
        fixtureEthDate.hour,
        fixtureEthDate.minute,
        fixtureEthDate.second,
      )
      const convertedEuropeanDate = initialisedEthDate.toEuropeanDate()

      expect(convertedEuropeanDate.toDateString()).toBe(
        date.European.toDateString(),
      )
    })
  })

  it.todo('converts Ethiopian date-time to European', () => {
    fixture.dates.forEach((date) => {
      const fixtureEthDate = date.Ethiopian
      const initialisedEthDate = new EthDateTime(
        fixtureEthDate.year,
        fixtureEthDate.month,
        fixtureEthDate.date,
        fixtureEthDate.hour,
        fixtureEthDate.minute,
        fixtureEthDate.second,
      )
      const convertedEuropeanDate = initialisedEthDate.toEuropeanDate()

      expect(convertedEuropeanDate).toBe(date.European)
    })
  })
})
