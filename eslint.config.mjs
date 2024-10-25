// @ts-check
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import * as importPlugin from 'eslint-plugin-import'
import pluginPlaywright from 'eslint-plugin-playwright'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'

/** @type {(import('eslint').Linter.Config | import('@typescript-eslint/utils').TSESLint.FlatConfig.Config)[]} */
export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/.build/**',
      '**/.esbuild/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.history/**',
      'mobile/**/public/**',
      'mobile/.gradle',
      'mobile/android',
      'playwright-report/**',
      '.vite-ssg-temp/**',
    ],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*', '**/*.{test,spec}.{ts}'],
  },

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts}'],
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    rules: {
      'simple-import-sort/exports': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-unresolved': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [['^@?\\w'], ['@tests']],
        },
      ],
    },
  },

  {
    name: 'app/js',
    files: ['**/*.js', '**/*.mjs'],
    plugins: {
      prettierPlugin,
    },
    languageOptions: {
      sourceType: 'module',
    },
  },

  {
    rules: {
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',

      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-empty-function': 'off',
      'simple-import-sort/exports': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^@?\\w'], ['^./components'], ['^@src?\\w'], ['@tests']],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'vue/block-order': [
        'warn',
        {
          order: ['script', 'template', 'style'],
        },
      ],
    },
  },

  skipFormatting,
]
