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
        short_name: 'Ethiopian Date',
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
          },
          {
            src: '/icons-b23883c8/android-chrome-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/icons-b23883c8/android-chrome-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icons-b23883c8/android-chrome-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icons-b23883c8/android-chrome-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icons-b23883c8/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons-b23883c8/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icons-b23883c8/android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icons-b23883c8/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons-b23883c8/icons.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
          {
            src: '/icons-b23883c8/windows11/LargeTile.scale-100.png',
            sizes: '310x310',
          },
          {
            src: '/icons-b23883c8/windows11/LargeTile.scale-125.png',
            sizes: '388x388',
          },
          {
            src: '/icons-b23883c8/windows11/LargeTile.scale-150.png',
            sizes: '465x465',
          },
          {
            src: '/icons-b23883c8/windows11/LargeTile.scale-200.png',
            sizes: '620x620',
          },
          {
            src: '/icons-b23883c8/windows11/LargeTile.scale-400.png',
            sizes: '1240x1240',
          },
          {
            src: '/icons-b23883c8/android/android-launchericon-512-512.png',
            sizes: '512x512',
          },
          {
            src: '/icons-b23883c8/android/android-launchericon-192-192.png',
            sizes: '192x192',
          },
          {
            src: '/icons-b23883c8/android/android-launchericon-144-144.png',
            sizes: '144x144',
          },
          {
            src: '/icons-b23883c8/android/android-launchericon-96-96.png',
            sizes: '96x96',
          },
          {
            src: '/icons-b23883c8/android/android-launchericon-72-72.png',
            sizes: '72x72',
          },
          {
            src: '/icons-b23883c8/android/android-launchericon-48-48.png',
            sizes: '48x48',
          },
          {
            src: '/icons-b23883c8/ios/16.png',
            sizes: '16x16',
          },
          {
            src: '/icons-b23883c8/ios/20.png',
            sizes: '20x20',
          },
          {
            src: '/icons-b23883c8/ios/29.png',
            sizes: '29x29',
          },
          {
            src: '/icons-b23883c8/ios/32.png',
            sizes: '32x32',
          },
          {
            src: '/icons-b23883c8/ios/40.png',
            sizes: '40x40',
          },
          {
            src: '/icons-b23883c8/ios/50.png',
            sizes: '50x50',
          },
          {
            src: '/icons-b23883c8/ios/57.png',
            sizes: '57x57',
          },
          {
            src: '/icons-b23883c8/ios/58.png',
            sizes: '58x58',
          },
          {
            src: '/icons-b23883c8/ios/60.png',
            sizes: '60x60',
          },
          {
            src: '/icons-b23883c8/ios/64.png',
            sizes: '64x64',
          },
          {
            src: '/icons-b23883c8/ios/72.png',
            sizes: '72x72',
          },
          {
            src: '/icons-b23883c8/ios/76.png',
            sizes: '76x76',
          },
          {
            src: '/icons-b23883c8/ios/80.png',
            sizes: '80x80',
          },
          {
            src: '/icons-b23883c8/ios/87.png',
            sizes: '87x87',
          },
          {
            src: '/icons-b23883c8/ios/100.png',
            sizes: '100x100',
          },
          {
            src: '/icons-b23883c8/ios/114.png',
            sizes: '114x114',
          },
          {
            src: '/icons-b23883c8/ios/120.png',
            sizes: '120x120',
          },
          {
            src: '/icons-b23883c8/ios/128.png',
            sizes: '128x128',
          },
          {
            src: '/icons-b23883c8/ios/144.png',
            sizes: '144x144',
          },
          {
            src: '/icons-b23883c8/ios/152.png',
            sizes: '152x152',
          },
          {
            src: '/icons-b23883c8/ios/167.png',
            sizes: '167x167',
          },
          {
            src: '/icons-b23883c8/ios/180.png',
            sizes: '180x180',
          },
          {
            src: '/icons-b23883c8/ios/192.png',
            sizes: '192x192',
          },
          {
            src: '/icons-b23883c8/ios/256.png',
            sizes: '256x256',
          },
          {
            src: '/icons-b23883c8/ios/512.png',
            sizes: '512x512',
          },
          {
            src: '/icons-b23883c8/ios/1024.png',
            sizes: '1024x1024',
          },
          {
            src: './icons-b23883c8/maskable/maskable_icon_x48.png',
            sizes: '48x48',
            purpose: 'maskable',
          },
          {
            src: './icons-b23883c8/maskable/maskable_icon_x72.png',
            sizes: '72x72',
            purpose: 'maskable',
          },
          {
            src: './icons-b23883c8/maskable/maskable_icon_x96.png',
            sizes: '96x96',
            purpose: 'maskable',
          },
          {
            src: './icons-b23883c8/maskable/maskable_icon_x128.png',
            sizes: '128x128',
            purpose: 'maskable',
          },
          {
            src: './icons-b23883c8/maskable/maskable_icon_x192.png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: './icons-b23883c8/maskable/maskable_icon_x384.png',
            sizes: '384x384',
            purpose: 'maskable',
          },
          {
            src: './icons-b23883c8/maskable/maskable_icon_x512.png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
        categories: ['utilities'],
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
