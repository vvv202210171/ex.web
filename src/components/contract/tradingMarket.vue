<template>
  <div class="main-trading-market navBg allFlex column">
    <!-- 盘口， 实时成交 -->
    <div class="market-header-box allFlex">
      <span
        class="market-header cur listBg"
        :class="index === 0 ? 'market-active' : 'navColor'"
        @click="index = 0"
        >{{ $t('Certain.marketNar.titleLeft') }}</span
      >

      <span
        class="market-header listBg"
        :class="index === 1 ? 'market-active' : 'navColor'"
        @click="index = 1"
        >{{ $t('Certain.marketNar.titleRight') }}</span
      >
    </div>

    <div class="allFlex trading-market">
      <!--盘口-->
      <div
        class="trading-left-market allFlex column cur boxBg"
        :class="index === 1 && 'order-books'"
      >
        <!-- 数据导航标题 -->
        <div class="allFlex market-title">
          <span class="navColor"
            >{{ $t('Certain.marketNar.price') }}({{ titleObj.maincoin }})</span
          >
          <span class="navColor"
            >{{ $t('Certain.marketNar.num') }}({{ titleObj.tradcoin }})</span
          >
          <span class="navColor right">{{
            $t('Certain.marketNar.total')
          }}</span>
        </div>

        <!-- 卖出数据 -->
        <div class="market-data-left">
          <vue-scroll :ops="ops" style="height: 435px" ref="sell">
            <ul id="sell">
              <li
                v-for="(value, index) in rightInfo.sell"
                :key="index"
                class="allFlex"
                @click="toBuy(value)"
              >
                <span class="redColor">{{ Number(value.price) }}</span>
                <span class="navColor center">{{ value.amount }}</span>
                <span class="navColor right">{{
                  Number(value.quantityAll).toFixed(
                    rightInfo.info.price_accuracy
                  )
                }}</span>
              </li>
            </ul>
          </vue-scroll>
        </div>

        <!-- 最新价 -->
        <div class="market-price allFlex listBg">
          <div>
            <span
              :class="
                rightInfo.info && rightInfo.info.rise < 0
                  ? 'greenColor'
                  : 'redColor'
              "
              >{{ Number(rightInfo.info.price) }}</span
            >
            <span class="font-Two navColor marginTen"
              >≈{{
                Number(rightInfo.info.price * usdRate.price).toFixed(
                  rightInfo.info.price_accuracy
                )
              }}{{ usdRate.coin }}</span
            >
          </div>

          <span
            class="market-price-font"
            :class="
              rightInfo.info.rise.indexOf('-') >= 0 ? 'redColor' : 'greenColor'
            "
            >{{ rightInfo.info.rise }}%</span
          >
        </div>

        <!-- 买入数据 -->
        <div class="market-data-left">
          <vue-scroll :ops="ops" style="height: 435px">
            <ul>
              <li
                v-for="(value, index) in rightInfo.buy"
                :key="index"
                class="allFlex"
                @click="toBuy(value)"
              >
                <span class="greenColor">{{ Number(value.price) }}</span>
                <span class="navColor center">{{ value.amount }}</span>
                <span class="navColor right">{{
                  Number(value.quantityAll).toFixed(
                    rightInfo.info.price_accuracy
                  )
                }}</span>
              </li>
            </ul>
          </vue-scroll>
        </div>
      </div>
      <!--实时成交-->
      <div
        class="trading-left-market allFlex column boxBg"
        :class="index === 0 && 'order-books'"
      >
        <!-- 导航标题 -->
        <div class="allFlex market-title">
          <span class="navColor"
            >{{ $t('Certain.marketNar.price') }}({{ titleObj.maincoin }})</span
          >
          <span class="navColor"
            >{{ $t('Certain.marketNar.num') }}({{ titleObj.tradcoin }})</span
          >
          <span class="navColor right">{{ $t('Certain.marketNar.time') }}</span>
        </div>

        <!-- 最新成交 -->
        <div class="right-market-info">
          <vue-scroll :ops="ops" style="height: 910px">
            <ul class="market-data-right">
              <li
                v-for="(value, index) in rightInfo.top"
                :key="'data' + index"
                class="allFlex list-complete-item"
                @click="toBuy(value)"
              >
                <span
                  :class="value.type === 'buy' ? 'greenColor' : 'redColor'"
                  >{{ Number(value.price) }}</span
                >
                <span class="navColor center">{{ Number(value.number) }}</span>
                <span class="navColor right">{{ value.wdate }}</span>
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
    };
  },
  mixins: [mixin],
  computed: {
    ...mapState({
      usdRate: (state) => state.usdRate,
      cycleInfo: (state) => state.currency,
      certainInfo: (state) => state.certain,
    }),
    rightInfo() {
      return this.name == 'currency' ? this.cycleInfo : this.certainInfo;
    },
  },
  props: {
    titleObj: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: 'currency',
    },
  },
  watch: {
    rightInfo: {
      deep: true,
      handler(val) {
        if (val.sell.length > 10) {
          this.scroll();
        }
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll();
    });
  },
  methods: {
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
    toBuy(val) {
      this.$bus.$emit('toBuy');
    },
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 1600px) {
  .main .order-books {
    display: none;
  }
  .market-header-box {
    height: 40px;
    line-height: 40px;
    justify-content: flex-start;
    background: var(--list-bgColor);
  }
  .market-header {
    width: auto;
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    cursor: pointer;
    position: relative;
  }
  .main-right {
    width: 330px;
  }
  .market-active {
    border-bottom: 2px solid $mainColor;
    color: $mainColor;
  }
}
@media screen and (min-width: 1600px) {
  .main-right {
    width: 665px;
  }
  .market-header-box {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
  }
  .market-header {
    flex: 1;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    color: $titleColor;
  }
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
