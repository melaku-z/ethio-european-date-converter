<template>
  <details class="rounded break-words border border-1">
    <summary
      class="cursor-pointer list-none text-center border w-full py-3 px-6"
    >
      ⓘ About Application
    </summary>

    <div class="flex-auto p-6">
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
  </details>
</template>

<style lang="postcss" scoped>
details {
  @apply border-gray-300 bg-theme-bg text-theme-text;
  summary {
    @apply bg-gray-200 border-gray-300 text-gray-900;
  }
}

@media (prefers-color-scheme: dark) {
  details {
    border-color: var(--theme-input-border);
    summary {
      color: rgb(214, 211, 205);
      background-color: rgb(37, 40, 42);
      border-color: rgb(60, 65, 67);
    }
  }
}
</style>
