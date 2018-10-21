'use strict';

const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;
const oneYear = 365 * oneDay;
const oneLeapYear = 366 * oneDay;
const fourYears = 3 * oneYear + oneLeapYear;
const globalTimeDifference = new Date('December 9, 2012').getTime() - new Date('April 1, 2005').getTime();

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
  if (date <= 30) {
    this.date = date;
  } else {
    throw new Error('Invalid Ethiopian Date');
  }
  if (yr > 200) {
    this.year = yr;
  } else {
    this.year = yr + 1900;
  }
  this.month = mon;
  this.hour = hr;
  this.minute = min;
  this.second = sec;
  this.getDay = ethDayOfWeek;
  this.dateString = monthStringEth(mon) + this.date + ', ' + this.year;
  if (hr < 13) {
    this.timeString = leftpad(hr) + ':' + leftpad(min) + ':' + leftpad(sec) + ' a.m.';
  } else {
    this.timeString = leftpad(hr - 12) + ':' + leftpad(min) + ':' + leftpad(sec) + ' p.m.';
  }
  this.dateWithDayString = dayOfWeekString(this.getDay()) + ', ' + this.dateString;
  this.dateTimeString = this.dateString + ', ' + this.timeString;
  this.fullDateTimeString = this.dateTimeString + ', ' + dayOfWeekString(this.getDay()) + '.';
  function ethDayOfWeek() {
    return (this.year + 2 * this.month + this.date + ethDifference(this.year)) % 7;
    function ethDifference(ethYear) {
      return -(Math.floor((2023 - ethYear) / 4));
    }
  }
}

function toEthiopianDateTime(eurDate) {
  var difference = eurDate.getTime() - new Date(Date.UTC(1971, 8, 12)).getTime();
  var fourYearsPassed = Math.floor(difference / fourYears);
  var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear);
  if (remainingYears === 4) {
    remainingYears = 3;
  }
  var remainingMonths = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay));
  var remainingDays = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay);
  var remainingHours = eurDate.getHours(); // - 6 to account for traditional local time
  if (remainingHours < 0) {
    remainingHours += 24;
  }
  var ethDate = new ethTime(remainingDays + 1, remainingMonths + 1, remainingYears + 4 * fourYearsPassed + 1964, remainingHours, eurDate.getMinutes(), eurDate.getSeconds());
  return ethDate;
}

function toEthiopianDateTimeString(eurDate) {
  const EthDateIn = toEthiopianDateTime(eurDate);
  return [EthDateIn.dateString, EthDateIn.timeString];
}

function toEthiopianDateString(eurDate) {
  return toEthiopianDateTime(eurDate).dateString;
}

function toEthiopianTimeString(eurDate) {
  return toEthiopianDateTime(eurDate).timeString;
}

function toEuropeanDate(ethDate) {
  var initialEuropean = new Date(new Date(Date.UTC(ethDate.year, ethDate.month - 1, ethDate.date)).getTime() + globalTimeDifference);
  if (ethDate.month === 13) {
    var maxDate;
    if (ethDate.year % 4 === 3)
      maxDate = 6;
    else
      maxDate = 5;
    if (ethDate.date > maxDate) {
      const errMsg = 'Pagume Only has ' + maxDate + ' days at year ' + ethDate.year + '. Please select another day.';
      return errMsg;
    }
  }
  for (var count = -8; count < 9; count++) {
    const EngDate = new Date(initialEuropean.getTime() + count * oneDay);
    var difference = EngDate.getTime() - new Date(Date.UTC(1971, 8, 12)).getTime();
    var fourYearsPassed = Math.floor(difference / fourYears);
    var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear);
    if (remainingYears === 4) {
      remainingYears = 3;
    }
    var remainingMonths = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay));
    var remainingDays = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay);
    if (ethDate.date === remainingDays + 1 && ethDate.month === remainingMonths + 1) {
      return EngDate;
    }
  }
}

function toEuropeanDateString(ethDate) {
  var EuropeanDate = toEuropeanDate(ethDate);
  EuropeanDate = EuropeanDate.toUTCString().substring(0, 16) + ' (at GMT+0)';
  return EuropeanDate;
}

function leftpad(Num, length) {
  length = length || 2;
  return ('000000000' + Num).slice(-length);
}

export {
  ethTime,
  toEthiopianDateTime,
  toEthiopianDateString,
  toEthiopianTimeString,
  toEthiopianDateTimeString,
  toEuropeanDate,
  toEuropeanDateString
};