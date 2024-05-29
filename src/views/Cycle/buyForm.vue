<template>
  <div class="tranBox allFlex column">
    <!-- 交易 -->
    <div class="boxBg tranBox-top">
      <!-- 币种信息 -->
      <div class="top-title listBg padding allFlex navColor">
        <span class="font-Four"
          >{{ titleObj.tradcoin }}/{{ titleObj.maincoin }}</span
        >
        <span class="font-Four marginTen">{{ titleObj.price }}</span>
      </div>

      <ul class="padding top-ul">
        <!-- 币种 -->
        <li class="allFlex top-ul_li">
          <span class="li-lable navColor font-Two">{{
            $t('Target.label.one')
          }}</span>

          <div class="li-btn listBg f1 allFlex">
            <span
              v-for="(item, key) in mainArr"
              :key="key"
              class="f1 center hand font-Four"
              :class="coinIndex == key ? 'mainBg Wcolor' : 'navColor'"
              @click="coinIndex = key"
              >{{ item.paycoin }}</span
            >
          </div>
        </li>
        <!-- 交易周期 -->
        <li class="allFlex top-ul_li">
          <span class="li-lable navColor font-Two">{{
            $t('Cycle.label.cycle')
          }}</span>

          <div class="li-btn listBg f1 allFlex">
            <span
              v-for="(item, key) in assetsArr"
              :key="key"
              class="f1 center hand font-Four"
              :class="assetsBuyIndex == key ? 'mainBg Wcolor' : 'navColor'"
              @click="assetsBuyIndex = key"
              >{{ item.lever }}s</span
            >
          </div>
        </li>

        <!-- 交易金额 -->
        <li class="allFlex top-ul_li">
          <span class="li-lable navColor font-Two">{{
            $t('Cycle.label.number')
          }}</span>

          <div class="li-btn listBg f1 allFlex padding">
            <input
              type="text"
              class="f1 number_ipt titleColor"
              v-model="number"
              :placeholder="`${leverObj.minnumber} ~ `"
              :min="leverObj.minnumber"
            />
            <span class="titleColor">{{ coinObj.paycoin }}</span>
          </div>
        </li>

        <!-- 可用余额 -->
        <li class="flex_between top-ul_li">
          <span class="li-lable navColor font-Two">{{
            $t('Target.label.two')
          }}</span>

          <div class="li-btn listBg f1 allFlex padding">
            <span class="titleColor">{{ balance }}</span>
            <span class="titleColor">{{ coinObj.paycoin }}</span>
          </div>
        </li>

        <!-- 预期收益 -->
        <li class="allFlex">
          <div>
            <span class="li-lable-balance navColor font-Two">{{
              $t('Target.label.five')
            }}</span>
            <span class="titleColor font-Four"
              >{{ (leverObj.profitGas * 100).toFixed(0) }} %
            </span>
          </div>

          <!-- 预期回报： -->
          <div>
            <span class="li-lable-balance navColor font-Two">{{
              $t('Target.label.six')
            }}</span>
            <span class="titleColor font-Four">{{
              (number * leverObj.profitGas) | mathFloor(2)
            }}</span>
          </div>
        </li>

        <!-- 按钮 -->
        <li class="top-ul_li allFlex">
          <div
            class="greenBg titleColor font-Four li-buy-btn center hand"
            @click="transfer(1)"
          >
            {{ $t('Target.up') }}
          </div>
          <div
            class="redBg titleColor font-Four li-buy-btn center hand"
            @click="transfer(2)"
          >
            {{ $t('Target.down') }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { buyFn, sellFn, getBalance, getCycleList } from '@/api/Cycle';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      assetsBuyIndex: 0,
      coinIndex: 0,
      number: '',
      balance: '',
      tableArr: [
        'Target.table.title1',
        'Target.table.title2',
        'Target.table.title3',
        'Target.table.title4',
      ],
      index: 1,
      assetsArr: [],
      hasDown: false,
    };
  },
  filters: {
    mathFloor(number, digit) {
      if (
        isNaN(Number(number)) ||
        !isFinite(Number(number)) ||
        isNaN(Number(digit))
      ) {
        return 0;
      }
      return (
        Math.floor(number * Math.pow(10, digit) + 1 / Math.pow(10, 9 - digit)) /
        Math.pow(10, Number(digit))
      ).toFixed(Number(digit));
    },
  },
  props: {
    kObj: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      titleObj: (state) => state.cycle.info,
      mainArr: (state) => state.cycle.info.limit,
    }),
    coinObj() {
      return this.mainArr && this.mainArr.length > 0
        ? this.mainArr[this.coinIndex]
        : { paycoin: '' };
    },
    paycoin() {
      return this.coinObj?.paycoin;
    },

    lever() {
      return this.leverObj.lever;
    },
    leverObj() {
      return (
        this.assetsArr[this.assetsBuyIndex] || { minnumber: '', profitGas: '' }
      );
    },
    params() {
      return {
        maincoin: this.titleObj.maincoin,
        tradcoin: this.titleObj.tradcoin,
        lever: this.lever,
        paycoin: this.coinObj.paycoin,
        number: this.number,
      };
    },
    cycleInfo() {
      return this.$store.state.cycle.info || {};
    },
  },
  watch: {
    kObj: {
      deep: true,
      handler(val) {
        this.getCycle();
      },
    },
    // coinIndex() {
    //   this.getBalanceFn(this.coinObj.paycoin);
    // },
    paycoin(val) {
      console.log(val);
      this.getBalanceFn(val);
    },
  },
  methods: {
    getCycle() {
      const params = {
        maincoin: 'USDT',
        tradcoin: this.kObj.tradcoin,
      };
      getCycleList(params).then((res) => {
        if (res.code == '200') {
          this.assetsArr = res.data.sort((a, b) => +a.lever - +b.lever);
        }
      });
    },
    getBalanceFn(coin) {
      const data = {
        coin: coin,
      };

      getBalance(data).then((res) => {
        if (res.code == '200') {
          this.balance = Math.max(res.data.usable ,0) ;
        }
      });
    },
    //交易
    transfer(num) {
      if (+this.number > +this.balance) {
        this.$message.warning(this.$t('Assets.transferDialog.alert2'));
        return;
      }
      if (+this.number < +this.leverObj.minnumber) {
        this.$message.warning(
          `${this.$t('Target.alert.min')}${this.leverObj.minnumber}`
        );
        return;
      }

      // if (+this.number > +this.coinObj.max_number) {
      //   this.$message.warning(
      //     `${this.$t('Target.alert.max')}${this.coinObj.max_number}`
      //   );
      //   return;
      // }
      if (this.hasDown) {
        console.log(111);
        return;
      }
      console.log(222);
      this.hasDown = true;
      const timer = setTimeout(() => {
        num == 1 ? this.buy() : this.sell();
        clearTimeout(timer);
      }, 800);
    },

    //看涨
    buy() {
      buyFn(this.params).then((res) => {
        if (res.code == '200') {
          this.number = '';
          this.hasDown = false;
          this.$emit('updata');
          this.getBalanceFn(this.coinObj.paycoin);
          this.$message.success(res.msg);
        }
      });
    },

    //看跌
    sell() {
      sellFn(this.params).then((res) => {
        if (res.code == '200') {
          this.number = '';
          this.hasDown = false;
          this.$emit('updata');
          this.getBalanceFn(this.coinObj.paycoin);
          this.$message.success(res.msg);
        }
      });
    },
    ff(val) {
      return val < 10 ? `0${val}` : val;
    },
  },

  created() {
    this.getCycle();
    if (this.paycoin) {
      this.getBalanceFn(this.paycoin);
    }
    this.$bus.$on('cycleRefreshBalance',()=>{
      this.getBalanceFn(this.paycoin);
    })
  },
  destroyed() {
    let _this = this;
    clearInterval(_this.timer);
    this.$bus.$off('cycleRefreshBalance')
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.right {
  text-align: right;
}
.tranBox {
  width: 100%;
  margin: 0 auto;
}
.tranBox-top {
  margin-bottom: 5px;
}
.top-title {
  @include height(40px);
}
.top-ul {
  &_li {
    height: 40px;
    align-items: center;
    margin: 20px 0;
  }
}

.li-lable {
  width: 70px;
}
.li-btn {
  @include height(40px);
  border-radius: 20px;
  overflow: hidden;
  span {
    transition: background ease-in-out 0.3s;
  }
  ::placeholder {
    color: $navColor;
  }
}
.li-buy-btn {
  width: 45%;
  @include height(40px);
  border-radius: 20px;
  margin: 0 auto;
}

.list-li {
  @include height(40px);
  &:hover {
    background: $navli;
  }
}

.activeNav {
  border-bottom: 1px solid $mainColor;
}
.number_ipt::placeholder {
  opacity: 0.35;
  color: $proText;
}
</style>
