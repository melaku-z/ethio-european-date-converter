# Ethio-European Date Converter

> convert date-time values between Ethiopian and European/Gregorian calendar.

---

![build and test](https://github.com/melaku-z/ethio-european-date-converter/workflows/build%20and%20test/badge.svg)
[![Version](https://img.shields.io/npm/v/ethiopian-calendar-date-converter.svg?sanitize=true)](https://www.npmjs.com/package/ethiopian-calendar-date-converter)
[![License](https://img.shields.io/npm/l/ethiopian-calendar-date-converter.svg?sanitize=true)](https://www.npmjs.com/package/ethiopian-calendar-date-converter)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmelaku-z%2Fethio-european-date-converter.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmelaku-z%2Fethio-european-date-converter?ref=badge_shield)

Ethiopian calendar is unique for having 13 months, 12 months each with 30 days and 1 more month with 5 or 6 days. It is also 7/8 years behind the European/Gregorian calendar.
This library contains javascript code (node/browser) for conversion of the date formats back and forth.

## Install

### Yarn

```bash
yarn add ethiopian-calendar-date-converter
```

### npm

```bash
npm i -S ethiopian-calendar-date-converter
```

### cdn

```html
<script
  type="text/javascript"
  src="https://unpkg.com/ethiopian-calendar-date-converter@2"
></script>
```

## Usage

```js
import { EthDateTime, limits } from 'ethiopian-calendar-date-converter'

// Create a date instance from current date-time
const ethDateTime = EthDateTime.now()

// Convert to Ethiopian date
const ethDateTime = EthDateTime.fromEuropeanDate(dateInput)

// Convert from Ethiopian date
const ethDateTime = new EthDateTime(
  2012, // year (in Ethioian Calendar)
  2, // month of year (second month of year, in Ethioian Calendar)
  29, // day of month (in Ethioian Calendar)
  1, // hour (in Ethioian Time format)
  52, // minute (in Ethioian Time format)
  52, // second (in Ethioian Time format)
)
const date = ethDateTime.toEuropeanDate()

// get `limits` import to get minimum and maximum dat values that can be processed
```

## Demo

A sample web application using this library can be accessed at <https://ethiopian-calendar.pages.dev>

## License

This project is licensed under the [MIT license](LICENSE).
