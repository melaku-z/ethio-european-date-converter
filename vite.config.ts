/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      devOptions: {
        enabled: false,
        disableRuntimeConfig: true,
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ethio-European Date Converter',
        description:
          'Convert dates between Ethiopian and European calendar offline.',
        background_color: '#fff', // Background colour for flattened icons. `string`
        theme_color: '#157878', // Theme color for browser chrome. `string`
        display: 'standalone', // Android display: "browser" or "standalone". `string`
        orientation: 'portrait', // Android orientation: "portrait" or "landscape". `string`
        start_url: '/', // Android start application's URL. `string` todo: /?homescreen=1 not getting serviceworker
        icons: [
          {
            src: '/icons-b23883c8/android-chrome-36x36.png',
            sizes: '36x36',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/android-chrome-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/android-chrome-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/android-chrome-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/android-chrome-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons-b23883c8/icons.svg',
            sizes: 'any',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.gradle',
      'android',
      '.git',
      '.cache',
      'packages',
      'e2e',
    ],
  },
})
