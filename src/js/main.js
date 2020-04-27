require('bootstrap/dist/css/bootstrap.css');
require('../css/dateconverter.css');

import Vue from 'vue';
import calendarConverter from './components/CalendarConverter.vue';
import ethTodayTextArea from './components/ethTodayTextArea.vue';
import footer from './components/footer.vue';

const calendarConverterComponent = new Vue({
  el: '#CalendarConverter',
  ...calendarConverter,
});
new Vue({
  el: '#ethTodayTextArea',
  ...ethTodayTextArea,
});

new Vue(footer);

window.CalendarConverter = calendarConverterComponent; // make component accessible for tests
