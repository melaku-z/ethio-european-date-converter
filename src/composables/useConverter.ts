import { EthDateTime, limits } from 'ethiopian-calendar-date-converter'
import { computed, onMounted, ref, watch } from 'vue'

export default function useCalendarConverter() {
  const ethCalDate = ref<number>()
  const ethCalMon = ref<number>()
  const ethCalYear = ref<number>()
  const eurCalForm = ref('')

  const eurCal = computed(() => {
    const [eurYear, eurMon, eurDate] = eurCalForm.value.split('-').map(Number)
    return eurDate ? new Date(Date.UTC(eurYear, eurMon - 1, eurDate)) : ''
  })

  const ethCalObj = computed(() => {
    try {
      if (ethCalDate.value)
        return new EthDateTime(
          ethCalYear.value as number,
          ethCalMon.value as number,
          ethCalDate.value as number,
        )
      else return null
    } catch (error) {
      return null
    }
  })

  const ethCalText = computed(
    () => ethCalObj.value?.toDateWithDayString() || '',
  )

  const eurCalText = computed(() =>
    eurCal.value
      ? eurCal.value.toUTCString().substring(0, 16) + ' (at GMT+0)'
      : '',
  )

  function updateCalculatedEthDate() {
    try {
      if (!eurCal.value) throw 'eurCalendar is empty'
      const calculatedEthDate = EthDateTime.fromEuropeanDate(eurCal.value)
      ;[ethCalDate.value, ethCalMon.value, ethCalYear.value] = [
        calculatedEthDate.date,
        calculatedEthDate.month,
        calculatedEthDate.year,
      ]
    } catch (error) {
      ;[ethCalDate.value, ethCalMon.value, ethCalYear.value] = [
        undefined,
        undefined,
        undefined,
      ]
    }
  }

  function updateCalculatedEurDate() {
    try {
      eurCalForm.value =
        ethCalObj.value?.toEuropeanDate().toJSON().slice(0, 10) || ''
    } catch (error) {
      eurCalForm.value = ''
    }
  }

  function updateCurrentEthDate() {
    const currentDate = new Date()
    const dateAtGMT = new Date(
      currentDate.valueOf() + currentDate.getTimezoneOffset() * 60000,
    )
    eurCalForm.value = dateAtGMT.toJSON().slice(0, 10)
    updateCalculatedEthDate()
  }

  watch(eurCal, updateCalculatedEthDate)
  watch(ethCalObj, updateCalculatedEurDate)

  onMounted(updateCurrentEthDate)

  return {
    ethCalDate,
    ethCalMon,
    ethCalYear,
    ethCalText,
    eurCalForm,
    eurCalText,
    minEurDate: limits.europeanCalendarDate.min,
    maxEurDate: limits.europeanCalendarDate.max,
    minEthYear: limits.ethiopianCalendarYear.min(),
    maxEthYear: limits.ethiopianCalendarYear.max(),
  }
}
