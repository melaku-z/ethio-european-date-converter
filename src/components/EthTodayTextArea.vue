<script setup lang="ts">
import { useEthTodayDateTimeText } from 'ethiopian-calendar-date-converter-vue'
import { onMounted } from 'vue'

const { ethTodayDateText, ethTodayTimeText, liveRefreshEnabled } =
  useEthTodayDateTimeText()

function onVisibilitychange() {
  liveRefreshEnabled.value = document.visibilityState == 'visible'
}

onMounted(() => {
  liveRefreshEnabled.value = true

  document.addEventListener('visibilitychange', onVisibilitychange)
})
</script>

<template>
  <article class="eth-today-time-text-container">
    <div class="bg-theme-bg text-theme-text w-full p-4">
      Today in Ethiopian Calendar is

      <strong class="font-bold">
        {{ ethTodayDateText || '...loading...' }}
      </strong>
      {{ ethTodayTimeText }}
    </div>
  </article>
</template>

<style lang="postcss">
@reference "../assets/main.css";

.eth-today-time-text-container {
  @apply mx-auto sm:p-3 p-4 break-words text-center text-xl font-light rounded;
  background-color: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
</style>
