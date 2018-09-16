'use strict'
import * as dateConverter from './dateconverter.js'

function updateCalculatedEthDateOnPage() {
  const ethDate = dateConverter.toEthiopianDateTime(new Date(document.getElementById('EuropeanDate').val()))
  document.getElementById('EthDayScroll').val(ethDate.date)
  document.getElementById('EthMonthScroll').val(ethDate.month)
  document.getElementById('EthYearScroll').val(ethDate.year)
  document.getElementById('EurDayTextArea').html(dateConverter.toEuropeanDateString(ethDate))
  document.getElementById('ethDayTextArea').html(ethDate.dateWithDayString)
}

function updateCalculatedEurDateOnPage() {
  const ethDate_Year = parseInt(document.getElementById('EthYearScroll')[0].value)
  const ethDate_Month = parseInt(document.getElementById('EthMonthScroll')[0].value)
  const ethDate_Day = parseInt(document.getElementById('EthDayScroll')[0].value)
  const ethDate = new dateConverter.ethTime(ethDate_Day, ethDate_Month, ethDate_Year, 0, 0, 0)
  const eurDateTime = dateConverter.toEuropeanDate(ethDate)
  var eurDate
  if (typeof(eurDateTime) != 'string')
    eurDate = eurDateTime.toJSON().slice(0, 10)
  else
    eurDate = eurDateTime
  document.getElementById('EuropeanDate').val(eurDate)
  document.getElementById('EurDayTextArea').html(dateConverter.toEuropeanDateString(ethDate))
  document.getElementById('ethDayTextArea').html(ethDate.dateWithDayString)
}

function refreshEthDateOnPage(){
  document.getElementById('ethTodayTextArea').html(dateConverter.toEthiopianDateTimeString(new Date()))
}

function initDates() {
  refreshEthDateOnPage()
  document.getElementById('EuropeanDate').val(new Date().toJSON().slice(0, 10))
  updateCalculatedEthDateOnPage()
  updateCalculatedEurDateOnPage()
}

function createEventListnersHTML(){
  document.querySelector('body').onload=initDates
  document.querySelector('#refreshEthDateButton').onclick=refreshEthDateOnPage
  document.querySelector('#EuropeanDate').onchange=updateCalculatedEthDateOnPage
  document.querySelector('#EthMonthScroll').onchange=updateCalculatedEurDateOnPage
  document.querySelector('#EthDayScroll').onchange=updateCalculatedEurDateOnPage
  document.querySelector('#EthYearScroll').onchange=updateCalculatedEurDateOnPage
}

module.exports = exports = {
  createEventListnersHTML
}