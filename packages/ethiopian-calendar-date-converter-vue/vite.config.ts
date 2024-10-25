import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

import packageJson from './package.json'

const getPackageName = () => {
  return packageJson.name as string
}

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase())
  } catch (err) {
    throw new Error('Name property in package.json is missing.')
  }
}

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
} as const

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(
        __dirname,
        'src/ethiopianCalendarDateConverter-vue.ts',
      ),
      name: getPackageNameCamelCase(),
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => fileName[format as 'es' | 'cjs' | 'iife'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'ethiopian-calendar-date-converter'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'ethiopian-calendar-date-converter': 'EthDateTime',
        },
      },
    },
  },
})
