# Ethio-European Date Converter

![build and test](<https://github.com/melaku-z/ethio-european-date-converter/workflows/build and test/badge.svg>)
[![Version](https://img.shields.io/npm/v/ethiopian-calendar-date-converter.svg?sanitize=true)](https://www.npmjs.com/package/ethiopian-calendar-date-converter)
[![License](https://img.shields.io/npm/l/ethiopian-calendar-date-converter.svg?sanitize=true)](https://www.npmjs.com/package/ethiopian-calendar-date-converter)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmelaku-z%2Fethio-european-date-converter.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmelaku-z%2Fethio-european-date-converter?ref=badge_shield)

Ethiopian calendar is unique for having 13 months, 12 months each with 30 days and 1 more month with 5 or 6 days. It is also 7/8 years behind the European/Gregorian calendar.
This project contains javascript code (node), and a progressive web application (PWA) for conversion of the date formats back and forth. The web app works offline.

This web application can be accessed at <https://ethiopian-calendar.netlify.app>

Automatically exported from code.google.com/p/ethio-european-date-converter

## Usage

```js
import { EthDateTime, limits } from 'ethiopian-calendar-date-converter'

// Create a date instance from current date-time
const ethDateTime = EthDateTime.now()

// Convert to Ethiopian date
const ethDateTime = EthDateTime.fromEuropeanDate(dateInput)

// Convert from Ethiopian date
const ethDateTime = new EthDateTime(year, month, day, hour, minute, second)
const date = ethDateTime.toEuropeanDate()

// get `limits` import to get minimum and maximum dat values that can be processed
```

## Development

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
pnpm install
```

#### Compile and Hot-Reload for Development

```sh
pnpm dev
```

#### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

#### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
```

#### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## License

This project is licensed under the [MIT license](LICENSE).
