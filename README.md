# Ethio-European Date Converter

![build and test](https://github.com/melaku-z/ethio-european-date-converter/workflows/build%20and%20test/badge.svg)

Ethiopian calendar is unique for having 13 months, 12 months each with 13 days and 1 more month with 5 or 6 days. It is also 7/8 years behind the European/Gregorian calendar.
This project contains javascript code (node), and a progressive web application (PWA) for conversion of the date formats back and forth. The web app works offline.

This web application can be accessed at <https://ethiopian-calendar.netlify.app>

Automatically exported from code.google.com/p/ethio-european-date-converter

## Installation

Use [yarn](https://classic.yarnpkg.com/en/docs/install) to install and build dependencies.

```bash
yarn install
yarn build:dependencies
```

## Development

```bash
yarn start-server-dev:watch
```

View application with live relead on code edit at <http://localhost:8080/>

## Build and Deploy

1. Build the application

```bash
yarn install
yarn build:dependencies
yarn build:prod
```

2. [Optional] Serve

```bash
yarn start-server:prod
```

View application at <http://localhost:8000/>

3. [Optional] Test

```bash
yarn test:puppeteer
```

View application at <http://localhost:8000/>

4. Deploy

Deploy the contents of `./dist` to a static file server like [netlify](https://www.netlify.com)

## License

This project is licensed under the [MIT license](LICENSE).
