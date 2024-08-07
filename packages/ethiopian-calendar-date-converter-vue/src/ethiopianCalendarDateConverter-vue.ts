import { EthDateTime } from 'ethiopian-calendar-date-converter'
import { computed, ref, watch } from 'vue'

export function useEthTodayDateTimeText() {
  const ethDateTimeNow = ref<EthDateTime>()
  const ethTodayDateText = computed(() =>
    ethDateTimeNow.value?.toDateWithDayString(),
  )
  const ethTodayTimeText = computed(
    () => ethDateTimeNow.value?.toTimeString() || '',
  )

  const liveRefreshEnabled = ref(false)
  const liveRefreshTimer = ref<NodeJS.Timeout>()

  function refreshEthDate() {
    ethDateTimeNow.value = EthDateTime.now()
  }

  function liveDateRefresh() {
    refreshEthDate()
    liveRefreshTimer.value = setInterval(refreshEthDate, 1000)
  }

  watch(liveRefreshEnabled, () => {
    if (liveRefreshEnabled.value) liveDateRefresh()
    else clearInterval(liveRefreshTimer.value)
  })

  return {
    liveRefreshEnabled,
    refreshEthDate,
    ethDateTimeNow,
    ethTodayDateText,
    ethTodayTimeText,
  }
}

interface EthDateRef {
  date: number | null
  month: number | null
  year: number | null
}

export function useCalendarConverter() {
  const ethDate = ref<EthDateRef | EthDateTime>({
    date: null,
    month: null,
    year: null,
  })

  const eurCalString = ref('')

  const eurCal = computed(() => {
    const [eurYear, eurMon, eurDate] = eurCalString.value.split('-').map(Number)

    try {
      return eurDate ? new Date(Date.UTC(eurYear, eurMon - 1, eurDate)) : null
    } catch (err) {
      return null
    }
  })

  const ethCalObj = computed(() => {
    try {
      return ethDate.value.date
        ? new EthDateTime(
            ethDate.value.year as number,
            ethDate.value.month as number,
            ethDate.value.date as number,
          )
        : null
    } catch (error) {
      return null
    }
  })

  function updateCalculatedEthDate() {
    try {
      if (!eurCal.value) throw 'eurCalendar is empty'
      ethDate.value = EthDateTime.fromEuropeanDate(eurCal.value)
    } catch (error) {
      ethDate.value = {
        date: null,
        month: null,
        year: null,
      }
    }
  }

  function updateCalculatedEurDate() {
    try {
      eurCalString.value =
        ethCalObj.value?.toEuropeanDate().toJSON().slice(0, 10) || ''
    } catch (error) {
      eurCalString.value = ''
    }
  }

  function setInitialCurrentDate() {
    const currentDate = new Date()
    const dateAtGMT = new Date(
      currentDate.valueOf() + currentDate.getTimezoneOffset() * 60000,
    )
    eurCalString.value = dateAtGMT.toJSON().slice(0, 10)
    updateCalculatedEthDate()
  }

  watch(eurCal, (dateNew, dateOld) => {
    if (dateOld?.getTime() != dateNew?.getTime()) updateCalculatedEthDate()
  })

  watch(ethCalObj, (dateNew, dateOld) => {
    if (dateNew?.toFullDateTimeString() != dateOld?.toFullDateTimeString())
      updateCalculatedEurDate()
  })

  return {
    ethDate,
    eurCalString,
    setInitialCurrentDate,
  }
}
