import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'
import './assets/main.postcss'

if (typeof document !== 'undefined') {
  import('./scripts/pwa')
}

export const createApp = ViteSSG(App)
