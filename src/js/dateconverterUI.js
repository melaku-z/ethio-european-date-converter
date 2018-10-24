import {
  ethTime,
  toEthiopianDateTime,
  toEthiopianDateTimeString,
  toEuropeanDate,
  toEuropeanDateString
} from './dateconverter.js';

import Vue from 'vue';

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
  window.onfocus = () => { ethTodayTextArea.liveRefreshEnabled = true; };
  window.onblur = () => { ethTodayTextArea.liveRefreshEnabled = false; };
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
    ethTodayDateText: '...',
    ethTodayTimeText: '...',
    liveRefreshEnabled: false,
    liveRefreshObj: null,
  },
  methods: {
    refreshEthDateOnPage: function () {
      [this.ethTodayDateText, this.ethTodayTimeText] = toEthiopianDateTimeString(new Date());
    },
    liveDateRefresh: function () {
      this.liveRefreshObj = setInterval(this.refreshEthDateOnPage, 1000);
    },
  },
  watch: {
    liveRefreshEnabled: function (enabled) {
      if (enabled)
        this.liveDateRefresh();
      else
        clearInterval(this.liveRefreshObj);
    }
  },
  created: function () {
    this.refreshEthDateOnPage();
    this.liveRefreshEnabled = true;
  },
});

var CalendarConverter = new Vue({
  el: '#CalendarConverter',
  data: {
    ethCalDate: '',
    ethCalMon: '',
    ethCalYear: '',
    eurCalForm: '',
  },
  computed: {
    eurCal: function () {
      const EuropeanDateValueArray = this.eurCalForm.split('-');
      const eurYear = EuropeanDateValueArray[0];
      const eurMon = EuropeanDateValueArray[1];
      const eurDate = EuropeanDateValueArray[2];
      return new Date(Date.UTC(eurYear, eurMon - 1, eurDate));
    },
    ethCalObj: function () {
      return new ethTime(this.ethCalDate, this.ethCalMon, this.ethCalYear);
    },
    ethCalText: function () {
      return this.ethCalObj.dateWithDayString;
    },
    eurCalText: function () {
      return this.eurCal.toUTCString().substring(0, 16) + ' (at GMT+0)';
    },
  },
  methods: {
    updateCalculatedEthDate: function () {
      const calculatedEthDate = toEthiopianDateTime(this.eurCal);
      [this.ethCalDate, this.ethCalMon, this.ethCalYear] = 
        [calculatedEthDate.date, calculatedEthDate.month, calculatedEthDate.year];
    },
    updateCalculatedEurDate: function () {
      this.eurCalForm = toEuropeanDate(this.ethCalObj).toJSON().slice(0, 10);
    },
  },
  watch: {
    eurCal: function () {
      this.updateCalculatedEthDate();
      console.log('updateCalculatedEthDate');
    },
    ethCalObj: function () {this.updateCalculatedEurDate();},
  },
  created: function () {    
    const currentDate = new Date();
    const dateAtGMT = new Date(currentDate.valueOf() + currentDate.getTimezoneOffset() * 60000);
    this.eurCalForm = dateAtGMT.toJSON().slice(0, 10);
    this.updateCalculatedEthDate();
  },
});

export {
  createEventListnersHTML,
  ethTodayTextArea,
  CalendarConverter
};