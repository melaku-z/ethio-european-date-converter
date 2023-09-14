/*eslint-env node*/
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,html}'],
  theme: {
    extend: {
      colors: {
        'theme-bg': 'var(--theme-background)',
        'theme-text': 'var(--theme-text-color)',
      }
    }
  }
}
