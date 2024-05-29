<template>
  <div class="tranBox">
    <!-- 交易 -->
    <div class="boxBg tranBox-top">
      <!-- 币种信息 -->
      <div class="top-title listBg padding allFlex navColor">
        <div class="startFlex top-title_coin">
          <span
            v-for="(item, key) in navArr"
            :key="'nav' + key"
            @click="index = key"
            class="hand font-Four"
            :class="index == key ? 'navActive' : 'navColor'"
            >{{ $t(item) }}</span
          >
        </div>
        <div class="startFlex">
          <div class="hand">
            <el-dropdown @command="commandBar">
              <span class="el-dropdown-link">
                {{ sellBar }}X<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in options"
                  :key="item.lever"
                  :command="item.lever"
                  >{{ item.lever }}X</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="marginTy hand">
            <el-dropdown @command="commandModel">
              <span class="el-dropdown-link">
                {{
                  tdMode == 'lsolate'
                    ? $t('Certain.label.twelve')
                    : $t('Certain.label.thirteen')
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="lsolate">{{
                  $t('Certain.label.twelve')
                }}</el-dropdown-item>
                <el-dropdown-item command="cross">{{
                  $t('Certain.label.thirteen')
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <!-- 看多 看空 -->
      <div class="allFlex">
        <ul class="padding top-ul">
          <!-- 杠杠（删） -->
          <!-- <li class="allFlex top-ul-li">
            <span class="li-lable navColor font-Four">{{
              $t('Certain.label.six')
            }}</span>
            <div class="li-btn listBg f1">
              <el-select v-model="buyBar">
                <el-option
                  v-for="item in options"
                  :key="item.lever"
                  :label="`${item.lever}x`"
                  :value="item.lever"
                >
                </el-option>
              </el-select>
            </div>
          </li> -->

          <!-- 交易数量， 限价-->
          <li class="allFlex top-ul-li" v-if="index == 1">
            <span class="li-lable navColor font-Four">{{
              $t('Certain.label.seven')
            }}</span>
            <div class="li-btn padding allFlex listBg f1">
              <input type="text" v-model="buyPrice" class="titleColor f1" />
              <span class="titleColor">{{ mainColor }}</span>
            </div>
          </li>

          <!-- 交易数量,市价 -->
          <li class="allFlex top-ul-li" v-else>
            <span class="li-lable navColor font-Four">{{
              $t('Certain.label.seven')
            }}</span>
            <div class="li-btn padding allFlex listBg f1">
              <input
                type="text"
                class="titleColor f1 readonly"
                :placeholder="$t('Certain.nav.three')"
                readonly
              />
              <span class="titleColor">{{ mainColor }}</span>
            </div>
          </li>

          <!-- 张 -->
          <li class="allFlex top-ul-li">
            <span class="li-lable navColor font-Four">{{
              $t('Certain.label.eight')
            }}</span>
            <div class="li-btn padding allFlex listBg f1">
              <input
                type="text"
                v-model="buyFix"
                class="titleColor f1"
                onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
              />
              <span class="titleColor">{{ $t('Certain.fix') }}</span>
            </div>
          </li>

          <!-- 止盈止损 -->
          <li class="allFlex">
            <div class="li-btn li-loss padding allFlex listBg">
              <input
                type="number"
                v-model="buyProfitPrice"
                :placeholder="$t('Certain.label.ten')"
                class="titleColor f1"
              />
            </div>
            <div class="li-btn li-loss padding allFlex listBg">
              <input
                type="number"
                v-model="buyLossPrice"
                :placeholder="$t('Certain.label.eleven')"
                class="titleColor f1"
              />
            </div>
          </li>

          <!-- 滑块 -->
          <li class="padding top-ul-li">
            <el-slider
              v-model="buySlider"
              :marks="marks"
            >
            </el-slider>
          </li>

          <!-- 委托保证金 -->
          <li class="allFlex top-ul-text">
            <span class="li-lable-margin navColor font-Two">{{
              $t('Certain.bond')
            }}</span>

            <div class="f1">
              <span class="titleColor font-Two">{{ buyBond }}</span>
              <span class="titleColor font-Two">{{ mainColor }}</span>
            </div>
          </li>

          <!-- 开张 -->
          <li class="allFlex top-ul-text">
            <div>
              <span class="li-lable-balance navColor font-Two">{{
                $t('Certain.open')
              }}</span>
              <span class="titleColor font-Two"
                >{{ balanceObj.usable }}USDT</span
              >
            </div>
            <div>
              <span class="li-lable-balance navColor font-Two">{{
                $t('Certain.charge')
              }}</span>
              <span class="titleColor font-Two">{{
                (buyMargin * coinInfo.gas).toFixed(7) || '_ _'
              }}</span>
            </div>
          </li>

          <!-- 按钮 -->
          <li class="allFlex">
            <span
              class="greenBg titleColor font-Four li-buy-btn center hand"
              @click="toBuy"
              >{{ $t('Certain.btn1') }}</span
            >
          </li>
        </ul>

        <!-- sell -->
        <ul class="padding top-ul">
          <!-- 杠杠（删） -->
          <!-- <li class="allFlex top-ul-li">
            <span class="li-lable navColor font-Four">{{
              $t('Certain.label.six')
            }}</span>
            <div class="li-btn listBg f1">
              <el-select v-model="sellBar">
                <el-option
                  v-for="item in options"
                  :key="item.lever"
                  :label="`${item.lever}x`"
                  :value="item.lever"
                >
                </el-option>
              </el-select>
            </div>
          </li> -->

          <!-- 交易数量， 限价-->
          <li class="allFlex top-ul-li" v-if="index == 1">
            <span class="li-lable navColor font-Four">{{
              $t('Certain.label.seven')
            }}</span>
            <div class="li-btn padding allFlex listBg f1">
              <input type="text" v-model="sellPrice" class="titleColor f1" />
              <span class="titleColor">{{ mainColor }}</span>
            </div>
          </li>

          <!-- 交易数量,市价 -->
          <li class="allFlex top-ul-li" v-else>
            <span class="li-lable navColor font-Four">{{
              $t('Certain.label.seven')
            }}</span>
            <div class="li-btn padding allFlex listBg f1">
              <input
                type="text"
                class="titleColor f1 readonly"
                :placeholder="$t('Certain.nav.three')"
                readonly
              />
              <span class="titleColor">{{ mainColor }}</span>
            </div>
          </li>

          <!-- 张 -->
          <li class="allFlex top-ul-li">
            <span class="li-lable navColor font-Four">{{
              $t('Certain.label.eight')
            }}</span>
            <div class="li-btn padding allFlex listBg f1">
              <input
                type="number"
                v-model="sellFix"
                class="titleColor f1"
                onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
              />
              <span class="titleColor">{{ $t('Certain.fix') }}</span>
            </div>
          </li>

          <!-- 止盈止损 -->
          <li class="allFlex">
            <div class="li-btn li-loss padding allFlex listBg">
              <input
                type="number"
                v-model="sellProfitPrice"
                :placeholder="$t('Certain.label.ten')"
                class="titleColor f1"
              />
            </div>
            <div class="li-btn li-loss padding allFlex listBg">
              <input
                type="number"
                v-model="sellLossPrice"
                :placeholder="$t('Certain.label.eleven')"
                class="titleColor f1"
              />
            </div>
          </li>

          <!-- 滑块 -->
          <li class="padding top-ul-li">
            <el-slider
              v-model="sellSlider"
              :marks="marks"
            >
            </el-slider>
          </li>

          <!-- 委托保证金 -->
          <li class="allFlex top-ul-text">
            <span class="li-lable-margin navColor font-Two">{{
              $t('Certain.bond')
            }}</span>

            <div class="f1">
              <span class="titleColor font-Two">{{ sellBond }}</span>
              <span class="titleColor font-Two">{{ mainColor }}</span>
            </div>
          </li>

          <!-- 开张 -->
          <li class="allFlex top-ul-text">
            <div>
              <span class="li-lable-balance navColor font-Two">{{
                $t('Certain.open')
              }}</span>
              <span class="titleColor font-Two"
                >{{ balanceObj.usable }}USDT</span
              >
            </div>
            <div>
              <span class="li-lable-balance navColor font-Two">{{
                $t('Certain.charge')
              }}</span>
              <span class="titleColor font-Two">{{
                (sellMargin * coinInfo.gas).toFixed(7) || '_ _'
              }}</span>
            </div>
          </li>

          <!-- 按钮 -->
          <li class="allFlex">
            <span
              class="redBg titleColor font-Four li-buy-btn center hand"
              @click="toSell"
              >{{ $t('Certain.btn2') }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getLever,
  buyLimit,
  sellMarket,
  sellLimit,
  buyMarket,
  getContractAccount,
  getInfo,
} from '@/api/Certain';

import { mapState } from 'vuex';
export default {
  data() {
    return {
      index: 0,
      buyFix: 1,
      sellFix: 1,
      buyPrice: '',
      sellPrice: '',
      buyBar: '',
      sellBar: '',
      options: ['150', '100', '50'],
      mainColor: 'USDT',
      navArr: ['Certain.nav.two', 'Certain.nav.one'],
      // navArr: ['Certain.nav.two'],

      buySlider: 0,
      sellSlider: 0,
      step: 20,
      profit: 0,
      marks: {
        0: {
          style: {
            fontSize: '10px',
          },
          label: '0%',
        },
        20: {
          style: {
            fontSize: '10px',
          },
          label: '20%',
        },
        40: {
          style: {
            fontSize: '10px',
          },
          label: '40%',
        },
        60: {
          style: {
            fontSize: '10px',
          },
          label: '60%',
        },
        80: {
          style: {
            fontSize: '10px',
          },
          label: '80%',
        },
        100: {
          style: {
            fontSize: '10px',
          },
          label: '100%',
        },
      },
      balanceObj: {
        usable: '',
      },
      type: null,
      tradcoin: '',
      tdMode: 'cross',
      sellProfitPrice: '',
      sellLossPrice: '',
      buyProfitPrice: '',
      buyLossPrice: '',
    };
  },
  watch: {
    index(val) {
      if (val == 0) {
        this.buyPrice = this.titleObj.price;
        this.sellPrice = this.titleObj.price;
      }
    },
    buySlider(val) {
      let num = val / 100;
      if (this.index == 1) {
        if (this.buyPrice > 0) {
          // this.buyFix = Math.floor(
          //   (this.balanceObj.usable * num) / this.titleObj.unit / this.buyPrice
          // );
          this.buyFix = Math.floor(
            (this.balanceObj.usable * num * this.buyBar) /
              (Number(this.buyPrice * +this.titleObj.unit) +
                Number(
                  this.buyPrice *
                    this.titleObj.unit *
                    this.coinInfo.gas *
                    this.buyBar
                ))
          );
        }
      } else {
        this.buyFix = Math.floor(
          (this.balanceObj.usable * num * this.buyBar) /
            (this.titleObj.price * +this.titleObj.unit +
              Number(
                this.titleObj.price *
                  this.titleObj.unit *
                  this.coinInfo.gas *
                  this.buyBar
              ))
        );
      }
    },
    sellSlider(val) {
      let num = val / 100;
      if (this.index == 1) {
        if (this.sellPrice > 0) {
          this.sellFix = Math.floor(
            (this.balanceObj.usable * num * this.sellBar) /
              (Number(this.sellPrice * +this.titleObj.unit) +
                Number(
                  this.sellPrice *
                    this.titleObj.unit *
                    this.coinInfo.gas *
                    this.sellBar
                ))
          );
        }
      } else {
        this.sellFix = Math.floor(
          (this.balanceObj.usable * num * this.sellBar) /
            (Number(this.titleObj.price * +this.titleObj.unit) +
              Number(
                this.titleObj.price *
                  this.titleObj.unit *
                  this.coinInfo.gas *
                  this.sellBar
              ))
        );
      }
    },

    titleObj(val) {
      this.buyPrice = val.price;
      this.sellPrice = val.price;
      this.tradcoin = val.tradcoin;
    },
    tradcoin(val) {
      this.getLeverFn();
    },
  },

  computed: {
    ...mapState({
      coinInfo: (state) => state.certain.info,
    }),
    buyMargin() {
      let price = this.index == 1 ? this.buyPrice : this.coinInfo.price;
      return this.buyFix !== ''
        ? Number(this.buyFix * price * this.coinInfo.unit)
        : 0;
    },
    sellMargin() {
      let price = this.index == 1 ? this.sellPrice : this.coinInfo.price;
      return this.sellFix !== ''
        ? Number(this.sellFix * price * this.coinInfo.unit)
        : 0;
    },
    buyBond() {
      return this.buyFix !== ''
        ? Number(this.buyMargin / this.buyBar).toFixed(6)
        : 0.0;
    },
    sellBond() {
      return this.sellFix !== ''
        ? Number(this.sellMargin / this.sellBar).toFixed(6)
        : 0.0;
    },

    params() {
      let obj = {
        maincoin: this.titleObj.maincoin,
        tradcoin: this.titleObj.tradcoin,
        profitPrice: '',
        lossPrice: '',
        tdMode: this.tdMode,
      };
      return obj;
    },
  },
  props: {
    titleObj: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    commandBar(val) {
      this.sellBar = val;
      this.buyBar = val;
    },
    commandModel(val) {
      this.tdMode = val;
    },
    getInfoFn() {
      let data = {
        maincoin: this.titleObj.maincoin,
        tradcoin: this.titleObj.tradcoin,
      };
      getInfo(data).then((res) => {
        if (res.code == '200') {
          this.$store.commit('setCoinInfo', res.data);
        }
      });
    },
    //获取可用余额
    getBalance() {
      let data = {
        maincoin: this.titleObj.maincoin,
        tradcoin: this.titleObj.tradcoin,
      };

      getContractAccount(data).then((res) => {
        if (res.code == '200') {
          let data = { ... res.data}
          if(data.balance){
            data.balance.usable = Math.max(data.balance.usable ,0)
            data.balance.disable = Math.max(data.balance.disable ,0)
          }
          this.balanceObj = data.balance;
        }
      });
    },
    //看多
    toBuy() {
      if (
        +this.buyBond + +(this.buyMargin * this.coinInfo.gas) >
        +this.balanceObj.usable
      ) {
        this.$message.warning(this.$t('Assets.transferDialog.alert2'));
        return;
      }
      if (+this.buyFix < +this.titleObj.minnumber) {
        this.$message.warning(
          `${this.$t('Certain.alert.min')}${this.titleObj.minnumber}`
        );
        return;
      }
      if (+this.buyProfitPrice > 0) {
        this.params.profitPrice = this.buyProfitPrice;
      }
      if (+this.buyLossPrice > 0) {
        this.params.lossPrice = this.buyLossPrice;
      }
      this.index == 1 ? this.buyLimitFn() : this.buyMarketFn();
      // getCoupon(data).then((res) => {
      //   if (res.code == '200') {
      // let bool = res.data.some((item) => item.limitnumber < this.number);
      // if (bool) {
      //   this.type = this.index == 1 ? 'buyLimitFn' : 'buyMarketFn';
      //   this.$emit('couponList', res.data);
      // } else {
      //   this.index == 1 ? this.buyLimitFn() : this.buyMarketFn();
      // }

      // }
      // });
    },
    //看空
    toSell() {
      if (
        +this.sellBond + +(this.sellMargin * this.coinInfo.gas) >
        +this.balanceObj.usable
      ) {
        this.$message.warning(this.$t('Assets.transferDialog.alert2'));
        return;
      }
      if (+this.sellFix < +this.titleObj.minnumber) {
        this.$message.warning(
          `${this.$t('Certain.alert.min')}${this.titleObj.minnumber}`
        );
        return;
      }
      if (+this.sellProfitPrice > 0) {
        this.params.profitPrice = this.sellProfitPrice;
      }
      if (+this.sellLossPrice > 0) {
        this.params.lossPrice = this.sellLossPrice;
      }
      this.index == 1 ? this.sellLimitFn() : this.sellMarketFn();
      // let data = {
      //   token: localStorage.getItem('token'),
      //   type: 1,
      // };
      // getCoupon(data).then((res) => {
      //   if (res.code == '200') {
      //     let bool = res.data.some((item) => item.limitnumber < this.number);
      //     if (bool) {
      //       this.type = this.index == 1 ? 'sellLimitFn' : 'sellMarketFn';
      //       this.$emit('couponList', res.data);
      //     } else {
      //       this.index == 1 ? this.sellLimitFn() : this.sellMarketFn();
      //     }
      //   }
      // });
    },

    //限价买入
    buyLimitFn() {
      if (this.buyPrice <= 0) {
        this.$message.warning(this.$t('Certain.alert.price'));
        return;
      }

      this.params.price = this.buyPrice;
      this.params.number = this.buyFix;
      this.params.lever = this.buyBar;
      buyLimit(this.params).then((res) => {
        if (res.code == '200') {
          this.getBalance();
          this.$emit('downFn');
          this.buyPrice = this.titleObj.price;
          this.buyFix = 1;
          this.$message.success(res.msg);
        }
      });
    },

    //市价买入
    buyMarketFn() {
      this.params.number = this.buyFix;
      this.params.lever = this.buyBar;
      buyMarket(this.params).then((res) => {
        console.log(res);
        if (res.code == '200') {
          this.buyPrice = this.titleObj.price;
          this.buyFix = 1;
          this.$emit('downFn');
          this.getBalance();
          this.$message.success(res.msg);
        }
      });
    },

    //市价售出
    sellMarketFn() {
      this.params.number = this.sellFix;
      this.params.lever = this.sellBar;
      sellMarket(this.params).then((res) => {
        if (res.code == '200') {
          this.sellPrice = this.titleObj.price;
          this.sellFix = 1;
          this.$emit('downFn');
          this.getBalance();
          this.$message.success(res.msg);
        }
      });
    },

    //限价售出
    sellLimitFn() {
      if (this.sellPrice <= 0) {
        this.$message.warning(this.$t('Certain.alert.price'));
        return;
      }

      this.params.price = this.sellPrice;
      this.params.number = this.sellFix;
      this.params.lever = this.sellBar;
      sellLimit(this.params).then((res) => {
        if (res.code == '200') {
          this.sellPrice = this.titleObj.price;
          this.sellFix = 1;
          this.getBalance();
          this.$emit('downFn');
          this.$message.success(res.msg);
        }
      });
    },

    //获取杠杠倍数
    getLeverFn() {
      let data = {
        token: localStorage.getItem('token'),
        tradcoin: this.titleObj.tradcoin,
        maincoin: this.titleObj.maincoin,
      };
      getLever(data).then((res) => {
        console.log(res);
        if (res.code == '200') {
          this.options = res.data;
          this.sellBar = this.coinInfo.max_lever;
          this.buyBar = this.coinInfo.max_lever;
        }
      });
    },
  },
  created() {
    this.getInfoFn();
    this.getBalance();
    this.getLeverFn();
    this.buyPrice = this.titleObj.price;
    this.sellPrice = this.titleObj.price;
    this.$bus.$on('certainRefreshBalance', () => {
      this.getBalance();
    });
  },
  mounted() {},
  destroyed() {
    this.$bus.$off('certainRefreshBalance')
  }
};
</script>
<style scoped lang="scss">
@import '@/assets/css/transfer.scss';
.right {
  text-align: right;
}
.tranBox {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  // height: 100%;
}
.tranBox-top {
  height: 400px;
  margin-bottom: 5px;
}
.top-title {
  @include height(40px);
  &_coin {
    span {
      position: relative;
      margin-right: 10px;
      transition: ease-in-out 0.1s;
    }
  }
}
.top-ul {
  width: 46%;
  &-li {
    height: 45px;
    align-items: center;
    margin: 10px 0;
  }
  &-text {
    margin: 8px 0;
  }
}

.li-lable {
  width: 60px;
}
.li-btn {
  @include height(40px);
  border-radius: 20px;
  .el-select {
    width: 100%;
    :deep(input)  {
      border: none;
    }
  }
  .readonly::placeholder {
    color: $navColor;
  }
}
.li-loss {
  width: 47%;
}
.li-buy-btn {
  width: 70%;
  @include height(40px);
  border-radius: 20px;
  margin: 20px auto 0;
}

.top-bon li {
  height: 54px;
  line-height: 54px;
  border-bottom: 1px solid rgba($whiteColor, 0.1);
}

// .el-slider :deep(.el-slider__stop){
//   width: 12px;
//   height: 12px;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   background: $mainColor !important;
// }
// .el-slider :deep(.el-slider__runway) {
//   background: $listBg;
// }
.el-dropdown :deep(.el-dropdown-link){
  color: $titleColor;
}
</style>
