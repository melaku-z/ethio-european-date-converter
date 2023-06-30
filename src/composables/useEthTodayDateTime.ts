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
  const liveRefreshTimer = ref<NodeJS.Timer>()

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
