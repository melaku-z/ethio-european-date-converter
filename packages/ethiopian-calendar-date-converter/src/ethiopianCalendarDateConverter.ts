import {
  fourYears,
  globalTimeDifference,
  maxEurDate,
  minEurDate,
  oneDay,
  oneYear,
} from './dateConstants'
import { DayOfWeek, MonthEth } from './types'

function dayOfWeekString(day: DayOfWeek): string {
  const dayOfWeekStrings = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
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
    yr: number,
    mon: number, // mon in human form
    date: number,
    hr = 0,
    min = 0,
    sec = 0,
  ) {
    if (date > 30) throw new Error(`Invalid Ethiopian Date: ${date}`)
    if (mon < 1 || mon > 13) throw new Error(`Invalid Ethiopian Month: ${mon}`)

    this.year = yr > 200 ? yr : yr + 1900
    this.month = mon as MonthEth
    this.date = date
    this.hour = hr
    this.minute = min
    this.second = sec
  }

  static now(): EthDateTime {
    const eurNow = new Date()
    return this.fromEuropeanDate(eurNow)
  }

  static fromEuropeanDate(europeanDate: Date): EthDateTime {
    return toEthiopianDateTime(europeanDate)
  }

  toEuropeanDate(): Date {
    return toEuropeanDate(this)
  }

  toTimeString = () =>
    this.hour < 13
      ? leftpadZero(this.hour) +
        ':' +
        leftpadZero(this.minute) +
        ':' +
        leftpadZero(this.second) +
        ' a.m.'
      : leftpadZero(this.hour - 12) +
        ':' +
        leftpadZero(this.minute) +
        ':' +
        leftpadZero(this.second) +
        ' p.m.'

  toDateString = () => monthStringEth(this.month) + this.date + ', ' + this.year

  toDateWithDayString = () =>
    `${dayOfWeekString(this.getDay())}, ${this.toDateString()}`

  toString = () => `${this.toDateString()}, ${this.toTimeString()}`

  toFullDateTimeString = () =>
    `${this.toString()}, ${dayOfWeekString(this.getDay())} .`

  getDay = () =>
    ((this.year +
      2 * this.month +
      this.date +
      yearDifferenceForEthDay(this.year)) %
      7) as DayOfWeek
}

function yearDifferenceForEthDay(ethYear: number) {
  return -Math.floor((2023 - ethYear) / 4)
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
    remainingYears + 4 * fourYearsPassed + 1964,
    remainingMonths + 1,
    remainingDays + 1,
    remainingHours,
    eurDate.getMinutes(),
    eurDate.getSeconds(),
  )
  return ethDate
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

function leftpadZero(Num: number, length = 2): string {
  return String(Num).padStart(length, '0')
}

export const limits = {
  ethiopianCalendarYear: {
    min: () => toEthiopianDateTime(minEurDate).year,
    max: () => toEthiopianDateTime(maxEurDate).year,
  },
  europeanCalendarDate: {
    min: minEurDate,
    max: maxEurDate,
  },
}
