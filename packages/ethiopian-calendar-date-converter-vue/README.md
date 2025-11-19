# Ethio-European Date Converter - Vue

> Vue composables to convert date-time values between Ethiopian and European/Gregorian calendar.

---

![build and test](https://github.com/melaku-z/ethio-european-date-converter/workflows/build%20and%20test/badge.svg)
[![Version](https://img.shields.io/npm/v/ethiopian-calendar-date-converter-vue.svg?sanitize=true)](https://www.npmjs.com/package/ethiopian-calendar-date-converter-vue)
[![License](https://img.shields.io/npm/l/ethiopian-calendar-date-converter-vue.svg?sanitize=true)](https://www.npmjs.com/package/ethiopian-calendar-date-converter-vue)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmelaku-z%2Fethio-european-date-converter.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmelaku-z%2Fethio-european-date-converter?ref=badge_shield)

Ethiopian calendar is unique for having 13 months, 12 months each with 30 days and 1 more month with 5 or 6 days. It is also 7/8 years behind the European/Gregorian calendar.
This library contains [Vue.js composables](https://vuejs.org/guide/reusability/composables.html) for conversion of the date formats back and forth.

## Install

### npm

```bash
npm install -S ethiopian-calendar-date-converter-vue
```

### pnpm

```bash
pnpm install ethiopian-calendar-date-converter-vue
```

## Usage

```js
import { defineComponent } from 'vue'
import {
  useEthTodayDateTimeText,
  useCalendarConverter,
} from 'ethiopian-calendar-date-converter-vue'

export default defineComponent({
  setup() {
    const {
      liveRefreshEnabled,
      refreshEthDate,
      ethTodayDateText,
      ethTodayTimeText,
    } = useEthTodayDateTimeText()

    const { ethDate, eurCalString, setInitialCurrentDate } =
      useCalendarConverter()

    setInitialCurrentDate()

    return {
      liveRefreshEnabled,
      refreshEthDate,
      ethTodayDateText,
      ethTodayTimeText,
      ethDate,
      eurCalString,
    }
  },
})
```

## Demo

A sample web application using this library can be accessed at <https://ethiopian-calendar.pages.dev>

## License

This project is licensed under the [MIT license](LICENSE).
