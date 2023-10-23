import { ViteSSG, type ViteSSGContext } from 'vite-ssg/single-page'
import App from './App.vue'
import './assets/main.postcss'
import { registerSW } from 'virtual:pwa-register'

export const createApp = ViteSSG(App)

if (typeof document !== 'undefined') {
  registerSW()
}
