/*eslint-env node*/
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,html}'],
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
}
