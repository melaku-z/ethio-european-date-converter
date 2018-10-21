import {
  ethTime,
  toEthiopianDateTime,
  toEthiopianDateTimeString,
  toEuropeanDate,
  toEuropeanDateString
} from './dateconverter.js';

const Vue = require('vue/dist/vue.min.js');

function updateCalculatedEthDateOnPage() {
  const EuropeanDateValueArray = document.getElementById('EuropeanDate').value.split('-');
  const eurYear = EuropeanDateValueArray[0];
  const eurMon = EuropeanDateValueArray[1];
  const eurDate = EuropeanDateValueArray[2];
  const ethDate = toEthiopianDateTime(new Date(Date.UTC(eurYear, eurMon - 1, eurDate)));
  document.getElementById('EthDayScroll').value = ethDate.date;
  document.getElementById('EthMonthScroll').value = ethDate.month;
  document.getElementById('EthYearScroll').value = ethDate.year;
  document.getElementById('EurDayTextArea').innerHTML = toEuropeanDateString(ethDate);
  document.getElementById('ethDayTextArea').innerHTML = ethDate.dateWithDayString;
}

function updateCalculatedEurDateOnPage() {
  const ethDate_Year = parseInt(document.getElementById('EthYearScroll').value);
  const ethDate_Month = parseInt(document.getElementById('EthMonthScroll').value);
  const ethDate_Day = parseInt(document.getElementById('EthDayScroll').value);
  const ethDate = new ethTime(ethDate_Day, ethDate_Month, ethDate_Year, 0, 0, 0);
  const eurDateTime = toEuropeanDate(ethDate);
  var eurDate;
  if (typeof (eurDateTime) != 'string')
    eurDate = eurDateTime.toJSON().slice(0, 10);
  else
    eurDate = eurDateTime;
  document.getElementById('EuropeanDate').value = eurDate;
  document.getElementById('EurDayTextArea').innerHTML = toEuropeanDateString(ethDate);
  document.getElementById('ethDayTextArea').innerHTML = ethDate.dateWithDayString;
}

function initDates() {
  const currentDate = new Date();
  const dateAtGMT = new Date(currentDate.valueOf() + currentDate.getTimezoneOffset() * 60000);
  document.getElementById('EuropeanDate').value = dateAtGMT.toJSON().slice(0, 10);
  updateCalculatedEthDateOnPage();
  updateCalculatedEurDateOnPage();
}

function createEventListnersHTML() {
  document.querySelector('body').onload = initDates;
  document.querySelector('#EuropeanDate').onchange = updateCalculatedEthDateOnPage;
  document.querySelector('#EthMonthScroll').onchange = updateCalculatedEurDateOnPage;
  document.querySelector('#EthDayScroll').onchange = updateCalculatedEurDateOnPage;
  document.querySelector('#EthYearScroll').onchange = updateCalculatedEurDateOnPage;
}

var ethTodayTextArea = new Vue({
  el: '#ethTodayTextArea',
  data: {
    ethTodayText: '...'
  },
  methods: {
    refreshEthDateOnPage : function () {
      this.ethTodayText = toEthiopianDateTimeString(new Date());
    },
    liveDateRefresh: function () {
      setInterval(() => this.ethTodayText = toEthiopianDateTimeString(new Date()), 1000);
    },
  },
  created : function () {
    this.refreshEthDateOnPage();
    this.liveDateRefresh();
  },
});

export {
  createEventListnersHTML
};