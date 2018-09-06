'use strict'
const $ = require('jquery')
import * as dateConverter from './dateconverter.js'

function updateCalculatedEthDateOnPage() {
  const ethDate = dateConverter.toEthiopianDateTime(new Date($('#EuropeanDate').val()))
  $('#EthDayScroll').val(ethDate.date)
  $('#EthMonthScroll').val(ethDate.month)
  $('#EthYearScroll').val(ethDate.year)
  $('#EurDayTextArea').html(dateConverter.toEuropeanDateString(ethDate))
  $('#ethDayTextArea').html(ethDate.dateWithDayString)
}

function updateCalculatedEurDateOnPage() {
  const ethDate_Year = parseInt($('#EthYearScroll')[0].value)
  const ethDate_Month = parseInt($('#EthMonthScroll')[0].value)
  const ethDate_Day = parseInt($('#EthDayScroll')[0].value)
  const ethDate = new dateConverter.ethTime(ethDate_Day, ethDate_Month, ethDate_Year, 0, 0, 0)
  const eurDateTime = dateConverter.toEuropeanDate(ethDate)
  var eurDate
  if (typeof(eurDateTime) != 'string')
    eurDate = eurDateTime.toJSON().slice(0, 10)
  else
    eurDate = eurDateTime
  $('#EuropeanDate').val(eurDate)
  $('#EurDayTextArea').html(dateConverter.toEuropeanDateString(ethDate))
  $('#ethDayTextArea').html(ethDate.dateWithDayString)
}

function refreshEthDateOnPage(){
  $('#ethTodayTextArea').html(dateConverter.toEthiopianDateTimeString(new Date()))
}

function initDates() {
  refreshEthDateOnPage()
  $('#EuropeanDate').val(new Date().toJSON().slice(0, 10))
  updateCalculatedEthDateOnPage()
  updateCalculatedEurDateOnPage()
}

module.exports = exports = {
  initDates,
  refreshEthDateOnPage,
  updateCalculatedEthDateOnPage,
  updateCalculatedEurDateOnPage,
  $
}