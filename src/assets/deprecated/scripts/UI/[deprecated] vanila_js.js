import {
  ethDateTime,
  toEthiopianDateTime,
  toEthiopianDateTimeString,
  toEuropeanDate,
  toEuropeanDateString
} from 'ethiopian-calendar-date-converter';

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
  const ethDate = new ethDateTime(ethDate_Day, ethDate_Month, ethDate_Year, 0, 0, 0);
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

function refreshEthDateOnPage() {
  document.getElementById('ethTodayTextArea').innerHTML = toEthiopianDateTimeString(new Date());
}

function initDates() {
  refreshEthDateOnPage();
  const currentDate = new Date();
  const dateAtGMT = new Date(currentDate.valueOf() + currentDate.getTimezoneOffset() * 60000);
  document.getElementById('EuropeanDate').value = dateAtGMT.toJSON().slice(0, 10);
  updateCalculatedEthDateOnPage();
  updateCalculatedEurDateOnPage();
  window.onfocus = () => {ethTodayTextArea.liveRefreshEnabled = true;};
  window.onblur = () => {ethTodayTextArea.liveRefreshEnabled = false;};
}

function createEventListnersHTML() {
  document.querySelector('body').onload = initDates;
  document.querySelector('#refreshEthDateButton').onclick = refreshEthDateOnPage;
  document.querySelector('#EuropeanDate').onchange = updateCalculatedEthDateOnPage;
  document.querySelector('#EthMonthScroll').onchange = updateCalculatedEurDateOnPage;
  document.querySelector('#EthDayScroll').onchange = updateCalculatedEurDateOnPage;
  document.querySelector('#EthYearScroll').onchange = updateCalculatedEurDateOnPage;
}

export {
  createEventListnersHTML,
};
