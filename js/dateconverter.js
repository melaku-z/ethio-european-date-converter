var nowEnglish = new Date()
var oneHour = 60 * 60 * 1000
var oneDay = 24 * oneHour
var oneYear = 365 * oneDay
var oneLeapYear = 366 * oneDay
var fourYears = 3 * oneYear + oneLeapYear
var globalDifference = new Date("December 9, 2012").getTime() - new Date("April 1, 2005").getTime()

function ethDay() {
    return (this.year + 2 * this.month + this.date + ethDifference(this.year)) % 7
    function ethDifference(ethYear) {
        return -(Math.floor((2023 - ethYear) / 4))
    }
}

function dayString(day) {
    switch (day) {
        case 0: return "Sun "
        case 1: return "Mon "
        case 2: return "Tue "
        case 3: return "Wed "
        case 4: return "Thu "
        case 5: return "Fri "
        case 6: return "Sat "
    }
}

function ethTime(date, mon, yr, hr, min, sec) {//mon in human form
    if (date == 31) { this.date = 30 } else { this.date = date }
    this.month = mon
    if (yr > 200) { this.year = yr } else { this.year = yr + 1900 }
    this.hour = hr
    this.minute = min
    this.second = sec
    this.getDay = ethDay//or yr+2*mon...
    if (hr < 13) { this.timeString = dayString(this.getDay()) + this.date + "/" + mon + "/" + this.year + " " + hr + ":" + min + ":" + sec + " a.m" }
    else { this.timeString = dayString(this.getDay()) + this.date + "/" + mon + "/" + this.year + " " + (hr - 12) + ":" + min + ":" + sec + " p.m" }
}

function toEthiopian(date) {
    var difference = date.getTime() - new Date("September 12, 1971").getTime()
    var fourYearsPassed = Math.floor(difference / fourYears)
    var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear)
    if (remainingYears == 4) { remainingYears = 3 }
    var remainingMonths = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay))
    var remainingDays = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay)
    var remainingHours = date.getHours() - 6
    if (remainingHours < 0) { remainingHours = 24 + remainingHours }
    var ethDate = new ethTime(remainingDays + 1, remainingMonths + 1, remainingYears + 4 * fourYearsPassed + 1964, remainingHours, date.getMinutes(), date.getSeconds())
    return ethDate.timeString
}

function toEthiopianDate(date) {
    var dayarray = toEthiopian(date).split(" ")
    return dayarray[0] + " " + dayarray[1]
}

function toEnglish(ethDate) {
    var initialEnglish = new Date(new Date(ethDate.year, ethDate.month - 1, ethDate.date).getTime() + globalDifference)
    if (ethDate.month == 13) {
        if ((ethDate.year % 4 == 3 && ethDate.date > 6) || (ethDate.year % 4 != 3 && ethDate.date > 5)) {
            return "error month-13"
        }
    }
    for (var count = -8; count < 9; count++) {
        EngDate = new Date(initialEnglish.getTime() + count * oneDay)
        var difference = EngDate.getTime() - new Date("September 12, 1971").getTime()
        var fourYearsPassed = Math.floor(difference / fourYears)
        var remainingYears = Math.floor((difference - fourYearsPassed * fourYears) / oneYear)
        if (remainingYears == 4) { remainingYears = 3 }
        var remainingMonths = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay))
        var remainingDays = Math.floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay)
        if (ethDate.date == remainingDays + 1 && ethDate.month == remainingMonths + 1) {
            return EngDate.toDateString()
        }
    }
}

function optionToEthiopian() {
    opt = document.form1
    document.form1.ethDayTextArea.value = toEthiopianDate(new Date(parseInt(opt.year.options[opt.year.selectedIndex].text), -1 + parseInt(opt.month.options[opt.month.selectedIndex].text), parseInt(opt.day.options[opt.day.selectedIndex].text)))
}
function optionToEnglish() {
    opt = document.form1
    document.form1.engDayTextArea.value = toEnglish(new ethTime(parseInt(opt.engDayScroll.options[opt.engDayScroll.selectedIndex].text), parseInt(opt.engMonthScroll.options[opt.engMonthScroll.selectedIndex].text), parseInt(opt.engYearScroll.options[opt.engYearScroll.selectedIndex].text), 0, 0, 0))
}