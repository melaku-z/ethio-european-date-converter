<script setup lang="ts">
import EthTodayTextArea from './components/EthTodayTextArea.vue'
import SocialFooter from './components/SocialFooter.vue'
import FooterInfo from './components/FooterInfo.vue'
import CalendarConverter from './components/CalendarConverter.vue'
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 60px;
  height: 100vh;
}
</style>
