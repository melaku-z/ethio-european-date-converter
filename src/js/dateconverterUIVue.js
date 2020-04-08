import {
  ethTime,
  toEthiopianDateTime,
  toEthiopianDateTimeString,
  toEuropeanDate,
  minEurDate, maxEurDate,
  minEthYear, maxEthYear
} from 'ethiopian-calendar-date-converter';

import Vue from 'vue';

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
    window.onfocus = () => { ethTodayTextArea.liveRefreshEnabled = true; };
    window.onblur = () => { ethTodayTextArea.liveRefreshEnabled = false; };
  },
});

var CalendarConverter = new Vue({
  el: '#CalendarConverter',
  data: {
    ethCalDate: '',
    ethCalMon: '',
    ethCalYear: '',
    eurCalForm: '',
    minEurDate, maxEurDate,
    minEthYear, maxEthYear
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
      try {
        return new ethTime(this.ethCalDate, this.ethCalMon, this.ethCalYear);
      } catch (error) {
        return '';
      }
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
      try {
        const calculatedEthDate = toEthiopianDateTime(this.eurCal);
        [this.ethCalDate, this.ethCalMon, this.ethCalYear] =
          [calculatedEthDate.date, calculatedEthDate.month, calculatedEthDate.year];
      } catch (error) {
        [this.ethCalDate, this.ethCalMon, this.ethCalYear] = [null, null, null];
      }
    },
    updateCalculatedEurDate: function () {
      try {
        this.eurCalForm = toEuropeanDate(this.ethCalObj).toJSON().slice(0, 10);
      } catch (error) {
        this.eurCalForm = '';
      }
    },
    updateCurrentEthDate () {
      const currentDate = new Date();
      const dateAtGMT = new Date(currentDate.valueOf() + currentDate.getTimezoneOffset() * 60000);
      this.eurCalForm = dateAtGMT.toJSON().slice(0, 10);
      this.updateCalculatedEthDate();
    },
  },
  watch: {
    eurCal: function () {
      this.updateCalculatedEthDate();
    },
    ethCalObj: function () {this.updateCalculatedEurDate();},
  },
  created: function () {
    this.updateCurrentEthDate();
  },
});

export {
  ethTodayTextArea,
  CalendarConverter
};
