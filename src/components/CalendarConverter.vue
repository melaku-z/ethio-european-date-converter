<template>
  <div class="flex flex-wrap mx-auto my-14">
    <div class="card">
      <label
        for="EuropeanDate"
        class="card-header"
        style="background-color: rgb(70, 163, 255)"
      >
        European Date
      </label>

      <div class="p-6 bg-white flex-grow">
        <input
          v-model="eurCalForm"
          type="date"
          class="mb-1 block w-full appearance-none rounded border border-gray-200 bg-white py-1 px-2 text-base leading-normal text-gray-800"
          id="EuropeanDate"
          pattern="\d{4}-\d{2}-\d{2}"
          v-bind:min="
            minEurDate.getFullYear() +
            '-' +
            minEurDate.getMonth() +
            '-' +
            minEurDate.getDate()
          "
          v-bind:max="
            maxEurDate.getFullYear() +
            '-' +
            maxEurDate.getMonth() +
            '-' +
            maxEurDate.getDate()
          "
        />
        <p class="my-2">
          {{ eurCalText }}
        </p>
        <span class="help-block">
          ⓘ Change the date above to convert to Ethiopian calendar.
        </span>
      </div>
    </div>

    <div class="card">
      <label
        for="EthioianDate"
        class="card-header"
        style="
          background-image: linear-gradient(#90ee90, #ffffe0, #ffffe0, #e87171);
        "
      >
        Ethiopian Date
      </label>
      <div class="p-6 bg-white flex-grow">
        <div
          class="flex items-center"
          id="EthioianDate"
          aria-label="Ethioian Date"
        >
          <input
            v-model.lazy.number="ethCalMon"
            aria-label="Ethioian Month"
            type="number"
            class="mb-1 block w-full appearance-none rounded border border-gray-200 bg-white py-1 px-2 text-base leading-normal text-gray-800"
            id="EthMonthScroll"
            min="1"
            max="13"
            style="width: 3em; padding-left: 2px; padding-right: 0"
          />
          /
          <input
            v-model.lazy.number="ethCalDate"
            aria-label="Ethioian Date of Month"
            type="number"
            class="mb-1 block w-full appearance-none rounded border border-gray-200 bg-white py-1 px-2 text-base leading-normal text-gray-800"
            id="EthDayScroll"
            min="1"
            max="30"
            style="width: 3em; padding-left: 2px; padding-right: 0"
          />
          /
          <input
            v-model.lazy.number="ethCalYear"
            aria-label="Ethioian Year"
            type="number"
            class="mb-1 block w-full appearance-none rounded border border-gray-200 bg-white py-1 px-2 text-base leading-normal text-gray-800"
            id="EthYearScroll"
            v-bind:min="minEthYear"
            v-bind:max="maxEthYear"
            style="width: 4em; padding-left: 2px; padding-right: 0"
          />
        </div>
        <p class="my-2">
          {{ ethCalText }}
        </p>
        <span class="help-block">
          ⓘ Change the date above to convert to European calendar.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCalendarConverter from '@/composables/useConverter'

const {
  ethCalDate,
  ethCalMon,
  ethCalYear,
  ethCalText,
  eurCalForm,
  eurCalText,
  minEurDate,
  maxEurDate,
  minEthYear,
  maxEthYear,
} = useCalendarConverter()
</script>

<style lang="postcss">
.card {
  @apply flex flex-col rounded border border-gray-300 p-4 w-full md:w-96 md:mx-auto;
  background-color: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
.card-header {
  @apply mb-0 border-gray-300 bg-gray-200 py-3 px-6 text-center text-gray-900 rounded-t;
  color: black;
}
.help-block {
  @apply mt-auto text-sm;
}
</style>
