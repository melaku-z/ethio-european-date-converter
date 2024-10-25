import { registerSW } from 'virtual:pwa-register'
import { ViteSSG, type ViteSSGContext } from 'vite-ssg/single-page'

import './assets/main.postcss'
import App from './App.vue'

export const createApp = ViteSSG(App)

if (typeof document !== 'undefined') {
  registerSW()
}
