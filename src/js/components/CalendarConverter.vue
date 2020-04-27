<template>
  <div class="row" id="CalendarConverter">
    <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 offset-md-1 offset-lg-2 row-eq-height">
      <div class="card" style="width: 100%">
        <label for="EuropeanDate" class="card-header text-center" style="background-color:rgb(70, 163, 255);color:black">
            European Date
        </label>
        <div class="card-body">
            <div class="form-group">
                <input
                  v-model="eurCalForm"
                  type="date"
                  class="form-control"
                  id="EuropeanDate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  v-bind:min="minEurDate.getFullYear() + '-' + (minEurDate.getMonth()) + '-' + minEurDate.getDate()"
                  v-bind:max="maxEurDate.getFullYear() + '-' + (maxEurDate.getMonth()) + '-' + maxEurDate.getDate()"
                />
                <p  v-cloak>
                  {{ eurCalText }}
                </p>
                <span class="help-block">
                  Change the date above to convert to Ethiopian calendar.
                </span>
            </div>
        </div>
      </div>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 row-eq-height">
        <div class="card" style="width: 100%">
            <label for="EthioianDate" class="card-header text-center" style="background-image: linear-gradient(#90ee90,#ffffe0,#ffffe0,#e87171);color: black;">
                Ethiopian Date
            </label>
            <div class="card-body">
                <div class="form-inline" id="EthioianDate" aria-label="Ethioian Date">
                    <input
                      v-model.lazy.number="ethCalMon"
                      aria-label="Ethioian Month"
                      type="number"
                      class="form-control"
                      id="EthMonthScroll"
                      min="1"
                      max="13"
                      style="width:3em;padding-left:2px;padding-right:0;"
                    >
                    /
                    <input
                      v-model.lazy.number="ethCalDate"
                      aria-label="Ethioian Date of Month"
                      type="number"
                      class="form-control"
                      id="EthDayScroll"
                      min="1"
                      max="30"
                      style="width:3em;padding-left:2px;padding-right:0;"
                    >
                    /
                    <input
                      v-model.lazy.number="ethCalYear"
                      aria-label="Ethioian Year"
                      type="number"
                      class="form-control"
                      id="EthYearScroll"
                      v-bind:min="minEthYear"
                      v-bind:max="maxEthYear"
                      style="width:4em;padding-left:2px;padding-right:0;"
                    >
                </div>
                <p v-cloak style="width:100%;">
                  {{ ethCalText }}
                </p>
                <span class="help-block" style="width:100%;">
                  Change the date above to convert to European calendar.
                </span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
  ethDateTime,
  limits,
  converterDateTime
} from 'ethiopian-calendar-date-converter';

export default {
  data () {
    return {
      ethCalDate: '',
      ethCalMon: '',
      ethCalYear: '',
      eurCalForm: '',
      minEurDate: limits.europeanCalendarDate.min,
      maxEurDate: limits.europeanCalendarDate.max,
      minEthYear: limits.ethiopianCalendarYear.min,
      maxEthYear: limits.ethiopianCalendarYear.max,
    }
  },
  computed: {
    eurCal () {
      const EuropeanDateValueArray = this.eurCalForm.split('-');
      const eurYear = EuropeanDateValueArray[0];
      const eurMon = EuropeanDateValueArray[1];
      const eurDate = EuropeanDateValueArray[2];
      return new Date(Date.UTC(eurYear, eurMon - 1, eurDate));
    },
    ethCalObj () {
      try {
        return new ethDateTime(this.ethCalDate, this.ethCalMon, this.ethCalYear);
      } catch (error) {
        return '';
      }
    },
    ethCalText () {
      return this.ethCalObj.dateWithDayString;
    },
    eurCalText () {
      return this.eurCal.toUTCString().substring(0, 16) + ' (at GMT+0)';
    },
  },
  methods: {
    updateCalculatedEthDate () {
      try {
        const calculatedEthDate = converterDateTime.toEthiopian(this.eurCal);
        [this.ethCalDate, this.ethCalMon, this.ethCalYear] =
          [calculatedEthDate.date, calculatedEthDate.month, calculatedEthDate.year];
      } catch (error) {
        [this.ethCalDate, this.ethCalMon, this.ethCalYear] = [null, null, null];
      }
    },
    updateCalculatedEurDate () {
      try {
        this.eurCalForm = converterDateTime.toEuropean(this.ethCalObj).toJSON().slice(0, 10);
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
    eurCal () {
      this.updateCalculatedEthDate();
    },
    ethCalObj () {
      this.updateCalculatedEurDate();
    },
  },
  mounted () {
    this.updateCurrentEthDate();
  },
}
</script>
