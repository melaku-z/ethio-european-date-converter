import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'
import './assets/main.postcss'
import { registerSW } from 'virtual:pwa-register'

if (typeof document !== 'undefined') {
  registerSW()
}

export const createApp = ViteSSG(App)
