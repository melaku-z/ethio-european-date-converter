<template>
  <article class="eth-today-time-text-container">
    <div class="bg-white w-full p-4 pl-14">
      Today in Ethiopian Calendar is

      <strong style="font-weight: bold">{{ ethTodayDateText }}</strong>
      {{ ethTodayTimeText }}

      <button
        type="button"
        class="rounded border py-1 px-2 text-xl font-bold ml-1"
        :class="{
          'text-white border-white': liveRefreshEnabled,
        }"
      >
        ⟳
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { EthDateTime } from 'ethiopian-calendar-date-converter'
import { onMounted, ref, watch } from 'vue'

const ethTodayDateText = ref('...loading...')
const ethTodayTimeText = ref('')
const liveRefreshEnabled = ref(false)
const liveRefreshObj = ref<number>()

function refreshEthDateOnPage() {
  const now = EthDateTime.now()
  ethTodayDateText.value = now.toDateWithDayString()
  ethTodayTimeText.value = now.toTimeString()
}

function liveDateRefresh() {
  liveRefreshObj.value = window.setInterval(refreshEthDateOnPage, 1000)
}

watch(liveRefreshEnabled, (enabled) => {
  if (enabled) liveDateRefresh()
  else clearInterval(liveRefreshObj.value)
})

onMounted(() => {
  refreshEthDateOnPage()
  liveRefreshEnabled.value = true

  document.addEventListener('visibilitychange', (vis) => {
    liveRefreshEnabled.value = document.visibilityState == 'visible'
  })
})
</script>

<style>
.eth-today-time-text-container {
  @apply mx-auto sm:p-3 p-4 break-words text-center text-xl font-light rounded;
  background-color: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
</style>
