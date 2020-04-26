require('bootstrap/dist/css/bootstrap.css');
require('../css/dateconverter.css');

import Vue from 'vue';
import CalendarConverter from './components/CalendarConverter.vue';
import ethTodayTextArea from './components/ethTodayTextArea.vue';
import footer from './components/footer.vue';

new Vue({
  el: '#CalendarConverter',
  ...CalendarConverter,
});
new Vue({
  el: '#ethTodayTextArea',
  ...ethTodayTextArea,
});

new Vue(footer);

window.CalendarConverter = CalendarConverter;
