import { flushPromises } from '@vue/test-utils'
import { EthDateTime } from 'ethiopian-calendar-date-converter'
import { describe, expect, it } from 'vitest'

import { useEthTodayDateTimeText } from '../src/ethiopianCalendarDateConverter-vue'

describe('useEthTodayDateTimeText', () => {
  it('should return the current Ethiopian date and time', () => {
    const { ethTodayDateText, ethTodayTimeText, refreshEthDate } =
      useEthTodayDateTimeText()
    refreshEthDate()

    const now = EthDateTime.now()
    expect(ethTodayDateText.value).toBe(now.toDateWithDayString())
    expect(ethTodayTimeText.value).toBe(now.toTimeString())
  })

  it('should refresh the date and time when liveRefreshEnabled is true', async () => {
    const { liveRefreshEnabled, ethTodayDateText, ethTodayTimeText } =
      useEthTodayDateTimeText()
    liveRefreshEnabled.value = true
    await flushPromises()

    const before = EthDateTime.now()
    expect(ethTodayDateText.value).toBe(before.toDateWithDayString())
    expect(ethTodayTimeText.value).toBe(before.toTimeString())
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const after = EthDateTime.now()
    expect(ethTodayDateText.value).toBe(after.toDateWithDayString())
    expect(ethTodayTimeText.value).toBe(after.toTimeString())
  })

  it('should stop refreshing the date and time when liveRefreshEnabled is false', async () => {
    const { liveRefreshEnabled, ethTodayDateText, ethTodayTimeText } =
      useEthTodayDateTimeText()
    liveRefreshEnabled.value = true
    await flushPromises()

    const before = EthDateTime.now()
    expect(ethTodayDateText.value).toBe(before.toDateWithDayString())
    expect(ethTodayTimeText.value).toBe(before.toTimeString())
    liveRefreshEnabled.value = false
    await flushPromises()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    await flushPromises()

    expect(ethTodayDateText.value).toBe(before.toDateWithDayString())
    expect(ethTodayTimeText.value).toBe(before.toTimeString())
  })
})
