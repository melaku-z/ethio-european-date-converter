var nowEuropean = new Date()
var oneHour = 60 * 60 * 1000
var oneDay = 24 * oneHour
var oneYear = 365 * oneDay
var oneLeapYear = 366 * oneDay
var fourYears = 3 * oneYear + oneLeapYear
var globalDifference = new Date("December 9, 2012").getTime() - new Date("April 1, 2005").getTime()

function ethDayOfWeek() {
    return (this.year + 2 * this.month + this.date + ethDifference(this.year)) % 7
    function ethDifference(ethYear) {
        return -(Math.floor((2023 - ethYear) / 4))
    }
}

function dayOfWeekString(day) {
    switch (day) {
        case 0:
            return "Sun "
        case 1:
            return "Mon "
        case 2:
            return "Tue "
        case 3:
            return "Wed "
        case 4:
            return "Thu "
        case 5:
            return "Fri "
        case 6:
            return "Sat "
    }
}

function monthStringEth(month) {
    switch (month) {
        case 1:
            return "Meskerem "
        case 2:
            return "Tikimt "
        case 3:
            return "Hidar "
        case 4:
            return "Tahsas "
        case 5:
            return "Tir "
        case 6:
            return "Yekatit "
        case 7:
            return "Megabit "
        case 8:
            return "Meyazya "
        case 9:
            return "Ginbot "
        case 10:
            return "Sene "
        case 11:
            return "Hamle "
        case 12:
            return "Nehase "
        case 13:
            return "Pagume "
    }
}

function ethTime(date, mon, yr, hr, min, sec) {//mon in human form
    if (date == 31) {
        this.date = 30
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
    this.timeString = dayOfWeekString(this.getDay()) + " " + monthStringEth(mon) + this.date + ", " + this.year + " "
    if (hr < 13) {
        this.timeString += hr + ":" + min + ":" + sec + " a.m"
    } else {
        this.timeString += (hr - 12) + ":" + min + ":" + sec + " p.m"
    }
}

function toEthiopianDateTime(eurDate) {
    var difference = eurDate.getTime() - new Date("September 12, 1971").getTime()
    var fourYearsPassed = Math.floor(difference / fourYears)
    var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear)
    if (remainingYears == 4) {
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
    return toEthiopianDateTime(eurDate).timeString
}

function toEthiopianDateString(eurDate) {
    var dayarray = toEthiopianDateTimeString(eurDate).split(" ")
    return dayarray[0] + " " + dayarray[1] + " " + dayarray[2] + " " + dayarray[3] + " " + dayarray[4]
}

function toEuropeanDate(ethDate) {
    var initialEuropean = new Date(new Date(ethDate.year, ethDate.month - 1, ethDate.date).getTime() + globalDifference)
    if (ethDate.month == 13) {
        if ((ethDate.year % 4 == 3 && ethDate.date > 6) || (ethDate.year % 4 != 3 && ethDate.date > 5)) {
            return "error month-13" //todo: handle error
        }
    }
    for (var count = -8; count < 9; count++) {
        EngDate = new Date(initialEuropean.getTime() + count * oneDay)
        var difference = EngDate.getTime() - new Date("September 12, 1971").getTime()
        var fourYearsPassed = Math.floor(difference / fourYears)
        var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear)
        if (remainingYears == 4) {
            remainingYears = 3
        }
        var remainingMonths = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay))
        var remainingDays = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay)
        if (ethDate.date == remainingDays + 1 && ethDate.month == remainingMonths + 1) {
            return EngDate
        }
    }
}

function toEuropeanDateString(ethDate) {
    return toEuropeanDate(ethDate).toDateString()
}

function updateCalculatedEthDateOnPage() {
    ethDate = toEthiopianDateTime(new Date($('#EuropeanDate').val()))
    $('#EthDayScroll')[0].selectedIndex = ethDate.date-1
    $('#EthMonthScroll')[0].selectedIndex = ethDate.month-1
    $('#EthYearScroll')[0].options[$('#EthYearScroll')[0].selectedIndex].text = ethDate.year //todo
    $('#EurDayTextArea').html(toEuropeanDateString(ethDate))
    $('#ethDayTextArea').html(toEthiopianDateString(new Date($('#EuropeanDate').val())))
}

function updateCalculatedEurDateOnPage() {
    ethDate_Year = parseInt($('#EthYearScroll')[0].options[$('#EthYearScroll')[0].selectedIndex].text)
    ethDate_Month = parseInt($('#EthMonthScroll')[0].options[$('#EthMonthScroll')[0].selectedIndex].text)
    ethDate_Day = parseInt($('#EthDayScroll')[0].options[$('#EthDayScroll')[0].selectedIndex].text)
    ethDate = new ethTime(ethDate_Day, ethDate_Month, ethDate_Year, 0, 0, 0)
    eurDate = toEuropeanDate(ethDate)
    $('#EuropeanDate').val(eurDate.toJSON().slice(0, 10))
    $('#EurDayTextArea').html(toEuropeanDateString(ethDate))
    $('#ethDayTextArea').html(toEthiopianDateString(eurDate))
}

function initDates() {
    $('#ethTodayTextArea').html(toEthiopianDateTimeString(new Date()))
    $('#EuropeanDate').val(new Date().toJSON().slice(0, 10))
    updateCalculatedEthDateOnPage()
    updateCalculatedEurDateOnPage()
}