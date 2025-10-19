import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,html,ts,postcss,css}'],
  theme: {
    extend: {
      colors: {
        'theme-bg': 'var(--theme-background)',
        'theme-text': 'var(--theme-text-color)',
        'theme-border': 'var(--theme-input-border)',
        'theme-header-text': 'var(--theme-header-text)',
        'theme-blue-bg': 'var(--theme-blue-bg)',
      },
    },
  },
} satisfies Config
