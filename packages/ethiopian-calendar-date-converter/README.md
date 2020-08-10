# Ethio-European Date Converter

> convert date-time values between Ethiopian and European/Gregorian calendar.

---

![build and test](https://github.com/melaku-z/ethio-european-date-converter/workflows/build%20and%20test/badge.svg)

Ethiopian calendar is unique for having 13 months, 12 months each with 13 days and 1 more month with 5 or 6 days. It is also 7/8 years behind the European/Gregorian calendar.
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
  <script type="text/javascript" src="https://unpkg.com/ethiopian-calendar-date-converter@%5E1" ></script>
  <!-- "window.ethDateCoverter" variable is availlable to use -->
```

## Usage

```js
import {
  ethDateTime,
  limits,
  converterDateTime,
  converterString
} from 'ethiopian-calendar-date-converter';

// create an instance of ethiopian Calendar DateTime
const ethDateTime = new ethDateTime(
                                29, // day of month (in Ethioian Calendar)
                                2, // month of year (second month of year, in Ethioian Calendar)
                                2012, // year (in Ethioian Calendar)
                                1, // hour (in Ethioian Time format)
                                52, // minute (in Ethioian Time format)
                                52 // second (in Ethioian Time format)
                    );

// Imported items list:

    // max and min date limits convertible by this library
    const limits = {
      ethiopianCalendarYear: {
        min: 1892,
        max: 2092
      },
      europeanCalendarDate: {
        min: new Date(1900, 2, 1),
        max: new Date(2100, 1, 1)
      }
    }

    // convert between Ethiopian DateTime format (new ethDateTime()) and European DateTime format (new Date())
    const converterDateTime = {
      toEthiopian(), // returns: ethDateTime, parameter: Date
      toEuropean() // returns: Date, parameter: ethDateTime
    }

    // return string formated dates and times after convertion between Ethiopian DateTime format (new ethDateTime()) and European DateTime format (new Date())
    const converterString = {
      date: {
        toEthiopian(),
        toEuropean()
      },
      time: {
        toEthiopian()
      },
      dateTime: {
        toEthiopian()
      }
    }
};
*/
```

## Demo

A sample web application using this library can be accessed at <https://ethiopian-calendar.netlify.app>

## License

[MIT](http://vjpr.mit-license.org)
