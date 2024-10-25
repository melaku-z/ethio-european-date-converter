<script setup lang="ts">
import CalendarConverter from './components/CalendarConverter.vue'
import EthTodayTextArea from './components/EthTodayTextArea.vue'
import FooterInfo from './components/FooterInfo.vue'
import SocialFooter from './components/SocialFooter.vue'
</script>

<template>
  <main class="flex flex-col">
    <EthTodayTextArea />
    <article class="mx-auto sm:px-4">
      <CalendarConverter />
    </article>
  </main>
  <footer class="mt-auto">
    <SocialFooter />
    <FooterInfo />
  </footer>
</template>

<style>
#app {
  padding-top: 60px;
  height: 100vh;
}
</style>
