import * as dateconverterUI from './dateconverterUI'
dateconverterUI.$('body').onload='dateconverterUI.initDates()'

function createEventListnersHTML(){
  dateconverterUI.$('body').onload=dateconverterUI.initDates
  dateconverterUI.$('#refreshEthDateButton').onclick=dateconverterUI.refreshEthDateOnPage
  dateconverterUI.$('#EuropeanDate').onchange=dateconverterUI.updateCalculatedEthDateOnPage
  dateconverterUI.$('#EthMonthScroll').onchange=dateconverterUI.updateCalculatedEurDateOnPage
  dateconverterUI.$('#EthDayScroll').onchange=dateconverterUI.updateCalculatedEurDateOnPage
  dateconverterUI.$('#EthYearScroll').onchange=dateconverterUI.updateCalculatedEurDateOnPage
  dateconverterUI.initDates()
}
createEventListnersHTML()
module.exports = {
  initDates: dateconverterUI.initDates,
  refreshEthDateOnPage: dateconverterUI.refreshEthDateOnPage,
  updateCalculatedEthDateOnPage: dateconverterUI.updateCalculatedEthDateOnPage,
  updateCalculatedEurDateOnPage: dateconverterUI.updateCalculatedEurDateOnPage,
}