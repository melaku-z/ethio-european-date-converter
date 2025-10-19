<script setup lang="ts">
import { limits } from 'ethiopian-calendar-date-converter'
import { useCalendarConverter } from 'ethiopian-calendar-date-converter-vue'
import { computed, onMounted } from 'vue'

const { ethDate, eurCalString, setInitialCurrentDate } = useCalendarConverter()

onMounted(setInitialCurrentDate)

const eurCalText = computed(() => {
  const [eurYear, eurMon, eurDate] = eurCalString.value.split('-').map(Number)
  if (!eurDate) return ''

  return (
    new Date(Date.UTC(eurYear!, eurMon! - 1, eurDate))
      .toUTCString()
      .substring(0, 16) + ' (at GMT+0)'
  )
})

const ethCalText = computed(() =>
  'toDateWithDayString' in ethDate.value
    ? ethDate.value.toDateWithDayString()
    : '',
)
</script>

<template>
  <div class="flex flex-wrap mx-auto my-14">
    <section class="card">
      <label
        for="EuropeanDate"
        class="card-header european-date-header text-theme-header-text bg-theme-blue-bg"
      >
        European Date
      </label>

      <div class="p-6 bg-theme-bg text-theme-text flex-grow">
        <input
          v-model="eurCalString"
          type="date"
          class="mb-1 block w-full appearance-none rounded border border-theme-border bg-theme-bg text-theme-text py-1 px-2 text-base leading-normal"
          id="EuropeanDate"
          pattern="\d{4}-\d{2}-\d{2}"
          :min="
            limits.europeanCalendarDate.min.getFullYear() +
            '-' +
            limits.europeanCalendarDate.min.getMonth() +
            '-' +
            limits.europeanCalendarDate.min.getDate()
          "
          :max="
            limits.europeanCalendarDate.max.getFullYear() +
            '-' +
            limits.europeanCalendarDate.max.getMonth() +
            '-' +
            limits.europeanCalendarDate.max.getDate()
          "
        />
        <p class="my-2">
          {{ eurCalText }}
        </p>
        <span class="help-block">
          ⓘ Change the date above to convert to Ethiopian calendar.
        </span>
      </div>
    </section>

    <section class="card">
      <label for="EthioianDate" class="card-header ethioian-date-header">
        Ethiopian Date
      </label>
      <div class="p-6 bg-theme-bg text-theme-text flex-grow">
        <div
          class="flex items-center"
          id="EthioianDate"
          aria-label="Ethioian Date"
        >
          <input
            v-model.lazy.number="ethDate.month"
            aria-label="Ethioian Month"
            type="number"
            class="eth-date-number-input"
            min="1"
            max="13"
          />
          /
          <input
            v-model.lazy.number="ethDate.date"
            aria-label="Ethioian Date of Month"
            type="number"
            class="eth-date-number-input"
            min="1"
            max="30"
          />
          /
          <input
            v-model.lazy.number="ethDate.year"
            aria-label="Ethioian Year"
            type="number"
            class="eth-date-number-input eth-date-year-input"
            :min="limits.ethiopianCalendarYear.min()"
            :max="limits.ethiopianCalendarYear.max()"
          />
        </div>
        <p class="my-2">
          {{ ethCalText }}
        </p>
        <span class="help-block">
          ⓘ Change the date above to convert to European calendar.
        </span>
      </div>
    </section>
  </div>
</template>

<style lang="postcss">
@reference "../assets/main.css";

.card {
  @apply flex flex-col rounded border border-gray-300 p-4 w-full md:w-96 md:mx-auto;
  background-color: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);

  .card-header {
    @apply mb-0 border-gray-300 py-3 px-6 text-center rounded-t;
  }
  .ethioian-date-header {
    background-image: linear-gradient(#90ee90, #ffffe0, #ffffe0, #e87171);
    color: black;
  }
}

.help-block {
  @apply mt-auto text-sm;
}

.eth-date-number-input {
  @apply mb-1 block rounded border border-theme-border bg-theme-bg text-theme-text py-1 text-base leading-normal;
  padding-left: 0.6rem;
  width: 3em;
}
.eth-date-year-input {
  width: 4em;
}
</style>
