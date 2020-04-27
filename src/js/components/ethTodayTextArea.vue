<template>
  <article class="container" style="padding: 2em;">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="card" style="width: 100%">
                <p class="lead text-center" style="margin-top: 1rem">
                    Today in Ethiopian Calendar is
                    <span v-cloak>
                        <strong style="font-weight:bold">{{ ethTodayDateText }}</strong>
                        {{ ethTodayTimeText }}
                    </span>
                    <span v-once>
                        <span v-if="false">...loading...</span>
                    </span>
                    <button type="button" class="btn btn-sm" id="refreshEthDateButton" v-if="! liveRefreshEnabled">
                        <strong style="font-size: x-large">⟳</strong>
                    </button>
                </p>
            </div>
        </div>
    </div>
  </article>
</template>

<script>
import {
  ethDateTime,
  limits,
  converterDateTime,
  converterString
} from "ethiopian-calendar-date-converter";

export default {
  data () {
    return {
      ethTodayDateText: "...",
      ethTodayTimeText: "...",
      liveRefreshEnabled: false,
      liveRefreshObj: null
    };
  },
  methods: {
    refreshEthDateOnPage () {
      [
        this.ethTodayDateText,
        this.ethTodayTimeText
      ] = converterString.dateTime.toEthiopian(new Date());
    },
    liveDateRefresh () {
      this.liveRefreshObj = setInterval(this.refreshEthDateOnPage, 1000);
    }
  },
  watch: {
    liveRefreshEnabled (enabled) {
      if (enabled) this.liveDateRefresh();
      else clearInterval(this.liveRefreshObj);
    }
  },
  mounted () {
    this.refreshEthDateOnPage();
    this.liveRefreshEnabled = true;
    window.addEventListener('focus', () => {
      this.liveRefreshEnabled = true;
    });
    window.addEventListener('blur', () => {
      this.liveRefreshEnabled = false;
    });
  }
};
</script>
