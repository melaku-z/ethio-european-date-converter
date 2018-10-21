require('bootstrap/dist/css/bootstrap.css');
require('../css/dateconverter.css');
var Vue = require('vue/dist/vue.min.js');
// require('@fortawesome/fontawesome-free/js/all.js');
// require('@fortawesome/fontawesome-free/css/brands.css');
import { createEventListnersHTML, toEthiopianDateTimeString } from './dateconverterUI.js';
createEventListnersHTML();
var ethTodayTextArea = new Vue({
  el: '#ethTodayTextArea',
  data: {
    ethTodayText: toEthiopianDateTimeString(new Date())
  }
});