import { flushPromises } from '@vue/test-utils'
import { EthDateTime } from 'ethiopian-calendar-date-converter'
import { describe, expect, it } from 'vitest'

import { useCalendarConverter } from '../src/ethiopianCalendarDateConverter-vue'

describe('useCalendarConverter', () => {
  it('should set the initial current date in both calendars', async () => {
    const { ethDate, eurCalString, setInitialCurrentDate } =
      useCalendarConverter()
    setInitialCurrentDate()

    const currentDate = new Date()
    const dateAtGMT = new Date(
      currentDate.valueOf() + currentDate.getTimezoneOffset() * 60000,
    )

    await flushPromises()

    expect(eurCalString.value).toBe(dateAtGMT.toJSON().slice(0, 10))
    expect((ethDate.value as EthDateTime).toDateString()).toMatchObject(
      EthDateTime.fromEuropeanDate(dateAtGMT).toDateString(),
    )
  })

  it('should update the Ethiopian date when the European date changes', async () => {
    const { ethDate, eurCalString } = useCalendarConverter()
    eurCalString.value = '2023-01-01'

    await flushPromises()

    expect((ethDate.value as EthDateTime).toDateString()).toBe(
      new EthDateTime(2015, 4, 23, 3).toDateString(),
    )
    eurCalString.value = '2023-12-31'
    await flushPromises()

    expect((ethDate.value as EthDateTime).toDateString()).toBe(
      new EthDateTime(2016, 4, 21).toDateString(),
    )
  })

  it('should update the European date when the Ethiopian date changes', async () => {
    const { ethDate, eurCalString } = useCalendarConverter()
    ethDate.value = new EthDateTime(2015, 4, 23)

    await flushPromises()

    expect(eurCalString.value).toBe('2023-01-01')
    ethDate.value = new EthDateTime(2016, 4, 22)

    await flushPromises()

    expect(eurCalString.value).toBe('2024-01-01')
  })

  it('should clear the Ethiopian date when the European date is invalid', async () => {
    const { ethDate, eurCalString } = useCalendarConverter()
    eurCalString.value = '2023-error'

    await flushPromises()

    expect(ethDate.value).toMatchObject({
      date: null,
      month: null,
      year: null,
    })
  })

  it('should clear the European date when the Ethiopian date is invalid', async () => {
    const { ethDate, eurCalString } = useCalendarConverter()
    ethDate.value = new EthDateTime(2015, 13, 7)

    await flushPromises()

    expect(eurCalString.value).toBe('')
  })
})
