<template>
  <div class="main-trading-market allFlex column">
    <!-- 盘口， 实时成交 -->
    <div class="market-header-box padding listBg allFlex">
      <span
        @click="index = 1"
        :class="index === 1 ? 'market-active' : 'mainColor'"
        >{{ $t('Target.order') }}</span
      >
      <span class="font-Four mainColor">{{ time || '_ _' }}</span>
      <!-- <span class="font-Four mainColor">2022: 03: 06</span> -->
    </div>

    <div class="trading-market">
      <!--实时成交-->
      <div class="trading-left-market allFlex column boxBg">
        <!-- 导航标题 -->
        <div class="allFlex market-title">
          <span
            v-for="(item, key) in tableArr"
            :key="key"
            class="navColor f1"
            :class="[key > 0 && key < 3 && 'center', key == 3 && 'right']"
            >{{ $t(item) }}</span
          >
        </div>

        <!-- 最新成交 -->
        <div class="right-market-info">
          <vue-scroll :ops="ops" style="height: 812px">
            <ul class="market-data-right">
              <li
                v-for="(item, index) in rightInfo.top"
                :key="'data' + index"
                class="allFlex list-complete-item"
                :class="item.type == 'sell' ? 'redColor' : 'greenColor'"
              >
                <span
                  class="f1 font-Four"
                  :class="item.type == 'buy' ? 'greenColor' : 'redColor'"
                  >{{
                    item.type == 'buy' ? $t('Target.up') : $t('Target.down')
                  }}</span
                >
                <span class="f1 navColor center font-Four">{{
                  item.last_profit
                }}</span>
                <span class="f1 navColor center font-Four">{{
                  item.income
                }}</span>
                <span class="f1 navColor right font-Four">{{
                  item.wdate
                }}</span>
              </li>
            </ul>
          </vue-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/Mixin';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      index: 0,
      tableArr: [
        'Target.table.title1',
        'Target.table.title2',
        'Target.table.title3',
        'Target.table.title4',
      ],
      time: '',
      timer: null,
      oldDate: 0,
    };
  },
  mixins: [mixin],
  watch: {
    date(val) {
      if (+this.oldDate < +val - 3000 || +this.oldDate > +val) {
        this.oldDate = val;
      }
    },
  },
  computed: {
    ...mapState({
      rightInfo: (state) => state.cycle,
      usdRate: (state) => state.usdRate,
      date: (state) => state.cycle.info.new_date,
    }),
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll();
      this.inter();
    });
  },
  methods: {
    inter() {
      this.oldDate = this.date;
      if (this.oldDate) {
        this.timer = setInterval(() => {
          this.oldDate = +this.oldDate + 1000;
          this.time = this.getTime(this.oldDate);
        }, 1000);
      }
    },
    ff(val) {
      return val < 10 ? `0${val}` : val;
    },
    getTime(date) {
      const dd = new Date(date);
      dd.setTime(date);
      const sq = 8;
      const len = dd.getTime();
      const offset = dd.getTimezoneOffset() * 60000;
      const utcTime = len + offset;
      const str = new Date(utcTime + 3600000 * sq);
      const year = str.getFullYear();
      const mon = this.ff(str.getMonth() + 1);
      const day = this.ff(str.getDay());
      const H = this.ff(str.getHours());
      const M = this.ff(str.getMinutes());
      const S = this.ff(str.getSeconds());
      return `${year}-${mon}-${day} ${H}:${M}:${S}`;
    },
    scroll() {
      this.$nextTick(() => {
        let div = document.getElementById('sell');

        // this.$refs['sell'].scrollTo({
        //   x: 0,
        //   y: div.scrollHeight || 680,
        // });
      });
    },
    tofix(val) {
      if (!val) {
        return 0;
      }
      let lang = this.$store.state.lang;
      return (val * this.$store.state[lang]).toFixed(2);
    },
  },
  destroyed() {
    let _this = this;
    this.timer && clearInterval(_this.timer);
  },
};
</script>

<style lang="scss">
.market-header-box {
  height: 40px;
  line-height: 40px;
}

/*挂单显示*/
.trading-market {
  flex: 1;
  width: 100%;
}
.trading-left-market {
  flex: 1;
}
.right-market-info {
  flex: 1;
}
.market-data-right li span {
  width: 33.3%;
}
.cur {
  margin-right: 5px;
}
.main-trading-market {
  height: 100%;
}
.main-trading-market ul li {
  padding: 0 15px;
}
.trading-left-market ul li {
  height: 25px;
  line-height: 25px;
}

.main-trading-market ul li span {
  display: inline-block;
  font-size: 12px;
  /*width: 50%;*/
}

.market-price {
  height: 40px;
  line-height: 40px;
  padding: 0 25px;
  font-size: 16px;
  position: relative;
}
.market-price span:first-child {
  font-size: 16px;
  font-weight: bold;
}
.market-price > span:last-child {
  margin-left: 30px;
}

.market-price-font {
  font-size: 12px;
}

.trading-left-market ul li {
  height: 32px;
  line-height: 32px;
}
/*右边实时数据*/
.market-data-left {
  flex: 1;
  overflow: hidden;
}
.market-data-left li span {
  display: inline-block;
  width: 33.3%;
}
/*实时成交*/

.market-data-right li span:first-child {
  display: inline-block;
}
.market-data-right li span:nth-child(2) {
  display: inline-block;
}
.market-title {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
}
.market-title span {
  display: inline-block;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flip-list-move {
  transition: transform 1s;
}
.right {
  text-align: right;
}
</style>
