import { DayOfWeek, MonthEth } from './types'

const oneHour = 60 * 60 * 1000
const oneDay = 24 * oneHour
const oneYear = 365 * oneDay
const oneLeapYear = 366 * oneDay
const fourYears = 3 * oneYear + oneLeapYear
const globalTimeDifference =
  new Date('December 9, 2012').getTime() - new Date('April 1, 2005').getTime()

const minEurDate = new Date(1900, 2, 1)
const maxEurDate = new Date(2100, 1, 1)

function dayOfWeekString(day: DayOfWeek): string {
  const dayOfWeekStrings = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saterday',
  }
  return dayOfWeekStrings[day]
}

function monthStringEth(month: MonthEth): string {
  const ethMonthStrings = {
    1: 'Meskerem ',
    2: 'Tikimt ',
    3: 'Hidar ',
    4: 'Tahsas ',
    5: 'Tir ',
    6: 'Yekatit ',
    7: 'Megabit ',
    8: 'Meyazya ',
    9: 'Ginbot ',
    10: 'Sene ',
    11: 'Hamle ',
    12: 'Nehase ',
    13: 'Pagume ',
  }
  return ethMonthStrings[month]
}

export class EthDateTime {
  year: number
  month: MonthEth
  date: number
  hour: number
  minute: number
  second: number

  constructor(
    date: number,
    mon: number, //mon in human form
    yr: number,
    hr = 0,
    min = 0,
    sec = 0,
  ) {
    if (date > 30) throw new Error(`Invalid Ethiopian Date: ${date}`)

    this.year = yr > 200 ? yr : yr + 1900
    this.month = mon as MonthEth
    this.date = date
    this.hour = hr
    this.minute = min
    this.second = sec
  }

  timeString = () =>
    this.hour < 13
      ? leftpad(this.hour) +
        ':' +
        leftpad(this.minute) +
        ':' +
        leftpad(this.second) +
        ' a.m.'
      : leftpad(this.hour - 12) +
        ':' +
        leftpad(this.minute) +
        ':' +
        leftpad(this.second) +
        ' p.m.'

  dateString = () => monthStringEth(this.month) + this.date + ', ' + this.year

  dateWithDayString = () =>
    `${dayOfWeekString(this.getDay())}, ${this.dateString()}`

  dateTimeString = () => `${this.dateString()}, ${this.timeString()}`

  fullDateTimeString = () =>
    `${this.dateTimeString()}, ${dayOfWeekString(this.getDay())} .`

  getDay = () =>
    ((this.year + 2 * this.month + this.date + this.yearDifference(this.year)) %
      7) as DayOfWeek

  private yearDifference(ethYear: number) {
    return -Math.floor((2023 - ethYear) / 4)
  }
}

function eurDateIsConvertible(eurDate: Date): boolean {
  return eurDate >= minEurDate && eurDate <= maxEurDate
}

function toEthiopianDateTime(eurDate: Date): EthDateTime {
  if (!eurDateIsConvertible(eurDate))
    throw `Out of range input year: ${eurDate.getFullYear()}`
  const difference =
    eurDate.getTime() - new Date(Date.UTC(1971, 8, 12)).getTime()
  const fourYearsPassed = Math.floor(difference / fourYears)
  let remainingYears = Math.floor(
    (difference - fourYearsPassed * fourYears) / oneYear,
  )
  if (remainingYears === 4) {
    remainingYears = 3
  }
  const remainingMonths = Math.floor(
    (difference - fourYearsPassed * fourYears - remainingYears * oneYear) /
      (30 * oneDay),
  )
  const remainingDays = Math.floor(
    (difference -
      fourYearsPassed * fourYears -
      remainingYears * oneYear -
      remainingMonths * 30 * oneDay) /
      oneDay,
  )
  let remainingHours = eurDate.getHours() // - 6 to account for traditional local time
  if (remainingHours < 0) {
    remainingHours += 24
  }
  const ethDate = new EthDateTime(
    remainingDays + 1,
    remainingMonths + 1,
    remainingYears + 4 * fourYearsPassed + 1964,
    remainingHours,
    eurDate.getMinutes(),
    eurDate.getSeconds(),
  )
  return ethDate
}

function toEthiopianDateTimeString(eurDate: Date): [string, string] {
  const EthDateIn = toEthiopianDateTime(eurDate)
  return [EthDateIn.dateString(), EthDateIn.timeString()]
}

function toEthiopianDateString(eurDate: Date): string {
  return toEthiopianDateTime(eurDate).dateString()
}

function toEthiopianTimeString(eurDate: Date): string {
  return toEthiopianDateTime(eurDate).timeString()
}

function toEuropeanDate(ethDate: EthDateTime): Date {
  const initialEuropean = new Date(
    new Date(
      Date.UTC(ethDate.year, ethDate.month - 1, ethDate.date),
    ).getTime() + globalTimeDifference,
  )
  if (ethDate.month === 13) {
    let maxDate
    if (ethDate.year % 4 === 3) maxDate = 6
    else maxDate = 5
    if (ethDate.date > maxDate) {
      const errMsg =
        'Pagume Only has ' +
        maxDate +
        ' days at year ' +
        ethDate.year +
        '. Please select another day.'
      throw errMsg
    }
  }
  for (let count = -8; count < 9; count++) {
    const eurDate = new Date(initialEuropean.getTime() + count * oneDay)
    const difference =
      eurDate.getTime() - new Date(Date.UTC(1971, 8, 12)).getTime()
    const fourYearsPassed = Math.floor(difference / fourYears)
    let remainingYears = Math.floor(
      (difference - fourYearsPassed * fourYears) / oneYear,
    )
    if (remainingYears === 4) {
      remainingYears = 3
    }
    const remainingMonths = Math.floor(
      (difference - fourYearsPassed * fourYears - remainingYears * oneYear) /
        (30 * oneDay),
    )
    const remainingDays = Math.floor(
      (difference -
        fourYearsPassed * fourYears -
        remainingYears * oneYear -
        remainingMonths * 30 * oneDay) /
        oneDay,
    )
    if (
      ethDate.date === remainingDays + 1 &&
      ethDate.month === remainingMonths + 1
    ) {
      if (!eurDateIsConvertible(eurDate))
        throw `Out of range input year: ${eurDate.getFullYear()}`
      return eurDate
    }
  }
  throw `Date not converted: ${ethDate.year},  ${ethDate.month},  ${ethDate.date}, `
}

function toEuropeanDateString(ethDate: EthDateTime): string {
  const EuropeanDate = toEuropeanDate(ethDate)
  const EuropeanDateStr =
    EuropeanDate.toUTCString().substring(0, 16) + ' (at GMT+0)'
  return EuropeanDateStr
}

function leftpad(Num: number, length = 2): string {
  return ('000000000' + Num).slice(-length)
}

const minEthYear = toEthiopianDateTime(minEurDate).year
const maxEthYear = toEthiopianDateTime(maxEurDate).year

export const limits = {
  ethiopianCalendarYear: {
    min: minEthYear,
    max: maxEthYear,
  },
  europeanCalendarDate: {
    min: minEurDate,
    max: maxEurDate,
  },
}

const converter = {
  dateTime: {
    toEthiopian: toEthiopianDateTime,
    toEuropean: toEuropeanDate,
  },
  string: {
    date: {
      toEthiopian: toEthiopianDateString,
      toEuropean: toEuropeanDateString,
    },
    time: {
      toEthiopian: toEthiopianTimeString,
    },
    dateTime: {
      toEthiopian: toEthiopianDateTimeString,
    },
  },
}

export const converterDateTime = converter.dateTime
export const converterString = converter.string
