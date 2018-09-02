const $ = require('jquery')
var nowEuropean = new Date()
var oneHour = 60 * 60 * 1000
var oneDay = 24 * oneHour
var oneYear = 365 * oneDay
var oneLeapYear = 366 * oneDay
var fourYears = 3 * oneYear + oneLeapYear
var globalDifference = new Date('December 9, 2012').getTime() - new Date('April 1, 2005').getTime()

function ethDayOfWeek() {
  return (this.year + 2 * this.month + this.date + ethDifference(this.year)) % 7
  function ethDifference(ethYear) {
    return -(Math.floor((2023 - ethYear) / 4))
  }
}

function dayOfWeekString(day) {
  switch (day) {
  case 0:
    return 'Sunday';
  case 1:
    return 'Monday';
  case 2:
    return 'Tuesday';
  case 3:
    return 'Wednesday';
  case 4:
    return 'Thursday';
  case 5:
    return 'Friday';
  case 6:
    return 'Saterday';
  }
}

function monthStringEth(month) {
  switch (month) {
  case 1:
    return 'Meskerem ';
  case 2:
    return 'Tikimt ';
  case 3:
    return 'Hidar ';
  case 4:
    return 'Tahsas ';
  case 5:
    return 'Tir ';
  case 6:
    return 'Yekatit ';
  case 7:
    return 'Megabit ';
  case 8:
    return 'Meyazya ';
  case 9:
    return 'Ginbot ';
  case 10:
    return 'Sene ';
  case 11:
    return 'Hamle ';
  case 12:
    return 'Nehase ';
  case 13:
    return 'Pagume ';
  }
}

function ethTime(date, mon, yr, hr, min, sec) {//mon in human form
  if (date === 31) {
    this.date = 30//todo
  } else {
    this.date = date
  }
  if (yr > 200) {
    this.year = yr
  } else {
    this.year = yr + 1900
  }
  this.month = mon
  this.hour = hr
  this.minute = min
  this.second = sec
  this.getDay = ethDayOfWeek
  this.dateString = monthStringEth(mon) + this.date + ', ' + this.year
  if (hr < 13) {
    this.timeString = leftpad(hr) + ':' + leftpad(min) + ':' + leftpad(sec) + ' a.m.';
  } else {
    this.timeString = leftpad(hr - 12) + ':' + leftpad(min) + ':' + leftpad(sec) + ' p.m.';
  }
  this.dateWithDayString = dayOfWeekString(this.getDay()) + ', ' + this.dateString
  this.dateTimeString = this.dateString + ', ' + this.timeString
  this.fullDateTimeString = this.dateTimeString + ', ' + dayOfWeekString(this.getDay()) + '.';
}

function toEthiopianDateTime(eurDate) {
  var difference = eurDate.getTime() - new Date('September 12, 1971').getTime()
  var fourYearsPassed = Math.floor(difference / fourYears)
  var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear)
  if (remainingYears === 4) {
    remainingYears = 3
  }
  var remainingMonths = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay))
  var remainingDays = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay)
  var remainingHours = eurDate.getHours() // - 6 to account for traditional local time
  if (remainingHours < 0) {
    remainingHours += 24
  }
  var ethDate = new ethTime(remainingDays + 1, remainingMonths + 1, remainingYears + 4 * fourYearsPassed + 1964, remainingHours, eurDate.getMinutes(), eurDate.getSeconds())
  return ethDate
}

function toEthiopianDateTimeString(eurDate) {
  return toEthiopianDateTime(eurDate).dateTimeString
}

function toEthiopianDateString(eurDate) {
  return toEthiopianDateTime(eurDate).dateString
}

function toEuropeanDate(ethDate) {
  var initialEuropean = new Date(new Date(ethDate.year, ethDate.month - 1, ethDate.date).getTime() + globalDifference)
  if (ethDate.month === 13) {
    if (ethDate.year % 4 === 3)
      maxDate = 6
    else
      maxDate = 5
    if (ethDate.date > maxDate) {
      errMsg = 'Pagume Only has ' + maxDate + ' days at year ' + ethDate.year + '. Please select another day.';
      $('#ethDayTextArea').html(errMsg) // todo: remove html elements from functions
      return errMsg
    }
  }
  for (var count = -8; count < 9; count++) {
    EngDate = new Date(initialEuropean.getTime() + count * oneDay)
    var difference = EngDate.getTime() - new Date('September 12, 1971').getTime()
    var fourYearsPassed = Math.floor(difference / fourYears)
    var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear)
    if (remainingYears === 4) {
      remainingYears = 3
    }
    var remainingMonths = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay))
    var remainingDays = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay)
    if (ethDate.date === remainingDays + 1 && ethDate.month === remainingMonths + 1) {
      return EngDate
    }
  }
}

function toEuropeanDateString(ethDate) {
  EuropeanDate = toEuropeanDate(ethDate)
  EuropeanDate = EuropeanDate.toDateString()
  return EuropeanDate
}

function updateCalculatedEthDateOnPage() {
  ethDate = toEthiopianDateTime(new Date($('#EuropeanDate').val()))
  $('#EthDayScroll').val(ethDate.date)
  $('#EthMonthScroll').val(ethDate.month)
  $('#EthYearScroll').val(ethDate.year)
  $('#EurDayTextArea').html(toEuropeanDateString(ethDate))
  $('#ethDayTextArea').html(ethDate.dateWithDayString)
}

function updateCalculatedEurDateOnPage() {
  ethDate_Year = parseInt($('#EthYearScroll')[0].value)
  ethDate_Month = parseInt($('#EthMonthScroll')[0].value)
  ethDate_Day = parseInt($('#EthDayScroll')[0].value)
  ethDate = new ethTime(ethDate_Day, ethDate_Month, ethDate_Year, 0, 0, 0)
  eurDateTime = toEuropeanDate(ethDate)
  eurDate = eurDateTime.toJSON().slice(0, 10)
  $('#EuropeanDate').val(eurDate)
  $('#EurDayTextArea').html(toEuropeanDateString(ethDate))
  $('#ethDayTextArea').html(ethDate.dateWithDayString)
}

function initDates() {
  $('#ethTodayTextArea').html(toEthiopianDateTimeString(new Date()))
  $('#EuropeanDate').val(new Date().toJSON().slice(0, 10))
  updateCalculatedEthDateOnPage()
  updateCalculatedEurDateOnPage()
}

function leftpad(Num, length) {
  length = length || 2
  return ('000000000' + Num).slice(-length)
}
