<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(true)
</script>

<template>
  <article
    class="flex flex-col rounded break-words border border-1 border-gray-300 bg-white"
  >
    <button
      class="border w-full py-3 px-6 bg-gray-200 border-b-1 border-gray-300 text-gray-900"
      type="button"
      aria-expanded="false"
      aria-controls="footer-info-body"
      @click="isCollapsed = !isCollapsed"
    >
      ⓘ About Application
    </button>

    <div
      class="flex-auto p-6"
      id="footer-info-body"
      v-bind:class="isCollapsed ? 'hidden' : ''"
    >
      <p>
        The Ethiopian calendar (Amharic: የኢትዮጵያ ዘመን አቆጣጠር) or Eritrean calendar
        is the principal calendar used in Ethiopia.
      </p>
      <p>
        The calendar has twelve months of thirty days plus five or six
        epagomenal days, which comprise a thirteenth month. A sixth epagomenal
        day is added every four years, without exception. There is a gap of
        seven to eight years between the Ethiopian and Gregorian calendars.
      </p>
      <p>
        New Year's Day occurs on September 11th in the Gregorian Calendar;
        except for the year preceding a leap year, when it occurs on September
        12th. (This date correspondence applies for the Gregorian years 1900 to
        2099.)
      </p>
      <p>
        This converter works for the range of March 1900 to February 2100 GC. It
        can be installed as a PWA for offline use.
      </p>
      <p>© Melaku Z.</p>
    </div>
  </article>
</template>
