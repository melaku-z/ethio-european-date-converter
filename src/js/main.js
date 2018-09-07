const dateconverterUI = require('./dateconverterUI')

function createEventListnersHTML(){
  dateconverterUI.$('body').onload=dateconverterUI.initDates
  document.querySelector('#refreshEthDateButton').onclick=dateconverterUI.refreshEthDateOnPage
  document.querySelector('#EuropeanDate').onchange=dateconverterUI.updateCalculatedEthDateOnPage
  document.querySelector('#EthMonthScroll').onchange=dateconverterUI.updateCalculatedEurDateOnPage
  document.querySelector('#EthDayScroll').onchange=dateconverterUI.updateCalculatedEurDateOnPage
  document.querySelector('#EthYearScroll').onchange=dateconverterUI.updateCalculatedEurDateOnPage
  dateconverterUI.initDates()
}
createEventListnersHTML()

module.exports = {
  initDates: dateconverterUI.initDates,
  refreshEthDateOnPage: dateconverterUI.refreshEthDateOnPage,
  updateCalculatedEthDateOnPage: dateconverterUI.updateCalculatedEthDateOnPage,
  updateCalculatedEurDateOnPage: dateconverterUI.updateCalculatedEurDateOnPage,
  $: dateconverterUI.$
}