<template>
  <!--<div class="container currencyBox">-->
  <!--<app-header></app-header>-->
  <div class="main navBg">
    <div class="main-box">
      <div class="allFlex">
        <div class="main-left boxBg" :class="LShow ? ` leftShow` : `leftHide`">
          <div class="left-nav font-Six navColor listBg allFlex">
            {{ $t('Target.detailsTitle') }}
            <li class="navColor endFlex" style="flex: 1">
              <span>( 24H )</span>
            </li>
          </div>

          <div class="info">
            <div class="allFlex">
              <span
                v-for="(item, key) in rightNav"
                :key="key"
                class="navColor font-Four"
                >{{ $t(item) }}</span
              >
            </div>
            <vue-scroll :ops="ops" style="height: 800px">
              <ul>
                <li
                  v-for="(item, key) in dataInfo"
                  :key="key"
                  class="allFlex hand"
                  :class="key == leftIndex && 'navli'"
                  @click.stop="leftShow(key)"
                >
                  <div :style="{ width: $i18n.locale == 'AR' ? '40%' : '46%' }">
                    <span
                      :class="item.zt !== 0 ? `` : 'navColor'"
                      class="Medium titleColor font-Four"
                    >
                      {{ item.tradcoin.toUpperCase() }}</span
                    >
                    <span class="navColor font-Two">/USDT</span>
                  </div>
                  <span class="navColor font-Two center f1">{{
                    item.price
                  }}</span>
                  <span
                    :class="
                      item.rise && item.rise.indexOf('-') === -1
                        ? 'greenColor'
                        : 'redColor'
                    "
                    class="font-Two right f1"
                    >{{ item.rise.indexOf('-') === -1 ? '+' : ''
                    }}{{ item.rise }}%</span
                  >
                </li>
                <!--<li class="no-record" v-if="tableData.length===0">暂无记录</li>-->
              </ul>
            </vue-scroll>
          </div>

          <img
            src="@ContractImg/left-icon.png"
            alt=""
            v-if="LShow"
            @click="LShow = !LShow"
            class="centerAll left-icon hand"
          />
          <img
            src="@ContractImg/right-icon.png"
            alt=""
            v-else
            @click="LShow = !LShow"
            class="centerAll right-icon hand"
          />
        </div>

        <!--中间部分 k线-->
        <div class="main-center allFlex column boxBg">
          <ul class="right-header allFlex kTitle">
            <li class="allFlex">
              <el-dropdown szie="mini" @command="leftShow">
                <div class="trading el-dropdown-link hand">
                  <span class="font-Six Semibold mainColor">{{
                    titleObj.tradcoin
                  }}</span>

                  <span class="font-Six proFont mainColor"
                    >/{{ titleObj.maincoin }}</span
                  >
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="key"
                    v-for="(item, key) in dataInfo"
                    :key="'nav' + key"
                    >{{ item.tradcoin }}/{{ item.maincoin }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>

              <div class="allFlex column">
                <span
                  :class="
                    titleObj.rise && titleObj.rise.indexOf('-') >= 0
                      ? 'redColor'
                      : 'greenColor'
                  "
                  class="right-header-price Medium font-Six"
                  >{{ titleObj.price }}
                </span>

                <div>
                  <span class="font-Two navColor"
                    >≈{{ Number(titleObj.price * usdRate.price).toFixed(2)
                    }}{{ usdRate.coin }}</span
                  >
                  <span
                    class="item-value marginTen"
                    :class="
                      titleObj.rise && titleObj.rise <= 0
                        ? 'redColor'
                        : 'greenColor'
                    "
                    >{{ titleObj.rise }}%</span
                  >
                </div>
              </div>
            </li>

            <!-- 最高 -->
            <li class="allFlex">
              <div class="allFlex column">
                <span class="coinNav">{{ $t('message.k.high') }}</span>

                <span class="item-value navColor">
                  {{ titleObj.height }}
                  <span class="item-value-unit">{{ titleObj.maincoin }}</span>
                </span>
              </div>

              <!-- 最低 -->
              <div class="allFlex column">
                <span class="coinNav">{{ $t('message.k.row') }}</span>

                <span class="item-value navColor">
                  {{ titleObj.low }}
                  <span class="item-value-unit">{{ titleObj.maincoin }}</span>
                </span>
              </div>

              <!-- 交易量 -->
              <div class="allFlex column">
                <span class="coinNav">{{ $t('message.k.vol') }}</span>

                <span class="item-value navColor">
                  {{ titleObj.volume }}
                  <span class="item-value-unit">{{ titleObj.tradcoin }}</span>
                </span>
              </div>
            </li>
          </ul>
          <!--tradingview-->
          <div id="tradingview">
            <trading-view :kObj="kObj" :key="kObj.tradcoin"></trading-view>
          </div>

          <!-- 交易 -->
          <buy-form :titleObj="kObj" @downFn="downFn"></buy-form>
        </div>

        <!-- 右边盘口 -->
        <div class="main-right boxBg">
          <trading-market :titleObj="titleObj" name="certain"></trading-market>
        </div>
      </div>

      <!-- 记录 -->
      <div class="main-table">
        <table-record
          :positionData="positionData"
          :entrustData="entrustData"
          :profitData="profitData"
          @closeAll="closeAll"
          :page="page"
          @undoFn="undo"
          @toDo="toDo"
          @tableCheck="tableCheck"
          :Isuddo="Isuddo"
          @pageChange="pageChange"
          :total="total"
          @cancelLoss="cancelLoss"
        ></table-record>
      </div>
    </div>


    <!-- 止盈止损 -->
    <el-dialog :title="$t(alertTitle)" :visible.sync="alertShow" :close-on-click-modal="false" width="30%">
      <!-- 币种信息 -->
      <div class="horizontal_top allFlex">
        <span class="label DColor">{{ $t('Certain.table.trading') }}</span>
        <span class="navColor"
          >{{ rowObj.tradcoin }}/{{ rowObj.maincoin }}</span
        >
      </div>

      <!-- 下单方向 -->
      <div class="horizontal allFlex" v-show="num < 5">
        <span class="DColor">{{ $t('Certain.table.direction') }}</span>
        <span :class="rowObj.type === 'buy' ? 'greenColor' : 'redColor'">
          <span>{{
            rowObj.type == 'buy'
              ? $t('Certain.table.buy')
              : $t('Certain.table.sell')
          }}</span
          >{{
            rowObj.tdMode == 'lsolate'
              ? $t('Certain.label.twelve')
              : $t('Certain.label.thirteen')
          }}{{ rowObj.lever }}X</span
        >
      </div>

      <!-- 开仓均价 -->
      <div class="horizontal allFlex" v-show="num < 5">
        <span class="DColor">{{ $t('Certain.table.average') }}</span>
        <span class="navColor">{{ rowObj.price }}</span>
      </div>

      <!-- 仓位 -->
      <div class="horizontal allFlex" v-show="num < 5">
        <span class="DColor">{{ $t('Certain.table.seat') }}</span>
        <span class="navColor">{{ rowObj.unfilled }}</span>
      </div>

      <!-- 当前价格 -->
      <div class="horizontal allFlex" v-show="num == 1">
        <span class="DColor">{{ $t('Certain.profitLoss.label2') }}</span>
        <span class="navColor">{{ filterPrice(rowObj) }}</span>
      </div>

      <div class="horizontal allFlex">
        <span class="DColor label smallFont4"
          >{{ $t('Certain.table.close') }}:</span
        >
        <el-input type="text" v-model="number" :readonly="readonly" />
      </div>

      <!--修改订单-->
      <ul v-if="num == 1 || num == 5">
        <li class="allFlex horizontal_profit">
<!--          <el-checkbox v-model="checkProfit">{{-->
<!--            $t('Certain.table.profit')-->
<!--          }}</el-checkbox>-->
<!--          <el-checkbox v-model="checkLoss">{{-->
<!--            $t('Certain.table.loss')-->
<!--          }}</el-checkbox>-->
<!--          原本是止盈止损至少要选一个。现在改成默认必选-->
          <span>{{
              $t('Certain.table.profit')
            }}</span>
          <span>{{
              $t('Certain.table.loss')
            }}</span>
        </li>
        <li class="flex_between">
          <el-input type="text" v-model="profit" />
          <el-input type="text" v-model="loss" class="marginTy" />
        </li>
        <li class="flex_between horizontal_profit">
          <div>
            <span>{{ $t('Certain.profitLoss.label1') }}</span>
            <span>{{ getProfit | mathFloor(4) }} {{ rowObj.tradcoin }}</span>
          </div>
          <div>
            <span>{{ $t('Certain.profitLoss.label1') }}</span>
            <span>{{ getLoss | mathFloor(4) }} {{ rowObj.tradcoin }}</span>
          </div>
        </li>
      </ul>

      <!--平仓数量-->
      <div class="horizontal endFlex" v-show="num == 2">
        <span class="DColor smallFont4"
          >{{ $t('Certain.status.closeNum') }}:</span
        >
        <span>{{ rowObj.unfilled }}</span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="alertShow = false">{{
          $t('Certain.cancel')
        }}</el-button>
        <el-button type="primary" @click="modify">{{
          $t('Certain.comfirm')
        }}</el-button>
      </span>
    </el-dialog>
    <!-- <contract-alert
      :obj="alertObj"
      @hide="profitShow = false"
      :dialogShow="profitShow"
    ></contract-alert> -->
  </div>
</template>

<script>
import {
  closeEntrust,
  profitLoss,
  closePosition,
  changeMargin,
  getCertain,
  getCoinPosition,
  getCoinAccount,
  profitLossNum,
  getCoinProfitOrder,
  cancelProfit,
  coinAllCloseFn,
} from '@/api/Certain';

import mixin from '@/Mixin';
import { mapState } from 'vuex';
export default {
  name: '',
  data() {
    return {
      //原本是止盈止损至少要选一个。现在改成默认必选
      checkProfit: true,
      checkLoss: true,
      alertTitle: '',
      rowObj: {},
      alertShow: false,
      search: '',
      entrustData: [],
      positionData: [],
      profitData: [],
      LShow: true,
      num: 0,
      Isuddo: false,
      rightNav: ['Target.nav.one', 'Target.nav.two', 'Target.nav.three'],
      leftIndex: localStorage.getItem('leftIndexCertain') || 0,
      password: '',
      timer: null,
      timer2: null,
      timer3: null,
      type: 0,
      minutes: '15',
      total: 0,
      page: 1,
      profit: '',
      loss: '',
      number: '',
      bond: '',
      // profitShow: false,
      loadingShow: false,
      loadingOption: {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
      },
      count: 0,
      kObj: {},
      positionTimer: null,
      unit: '',
      readonly: false,
      navIndex: 0,
    };
  },
  mixins: [mixin],
  components: {
    tableRecord(resolve) {
      require(['./tableRecord'], resolve);
    },
    buyForm(resolve) {
      require(['./buyForm.vue'], resolve);
    },
    tradingMarket(resolve) {
      require(['@/components/contract/tradingMarket.vue'], resolve);
    },
  },
  watch: {
    alertShow(val) {
      if (!val) {
        //原本是止盈止损至少要选一个。现在改成默认必选
        // this.checkLoss = false;
        // this.checkProfit = false;
        this.profit = '';
        this.loss = '';
        this.number = '';
      }
    },
    positionData(val,pre){
      if(val?.length < pre?.length){
        //持仓减少后，更新子组件里的余额
        this.$bus.$emit('certainRefreshBalance')
      }
    }
  },

  computed: {
    ...mapState({
      usdRate: (state) => state.usdRate,
    }),
    getProfit() {
      let price =
        this.rowObj.type == 'buy'
          ? Number(this.profit) - Number(this.rowObj.price)
          : Number(this.rowObj.price) - Number(this.profit);
      return this.profit > 0 && this.number > 0
        ? price * this.unit * this.number
        : '--';
    },
    getLoss() {
      let price =
        this.rowObj.type == 'buy'
          ? Number(this.loss) - Number(this.rowObj.price)
          : Number(this.rowObj.price) - Number(this.loss);
      return this.loss > 0 && this.number > 0
        ? price * this.unit * this.number
        : '--';
    },
    dataInfo() {
      return this.$store.state.conSymbol;
    },
    titleObj() {
      return this.$store.state.certain.info;
    },
  },
  created() {
    let _this = this;
    // this.loadingShow = this.$loading(_this.loadingOption);
    // localStorage.setItem('tradingview.resolution', 15);
    this.detailsInfo();

    // if (localStorage.getItem('token')) {
    //   this.timer = setInterval(() => {
    //     this.getEntrust();
    //   }, 8000);
    // }
    //拉去挂单数据
    this.$bus.$on('wsReload',()=>{
      this.leftShow(this.leftIndex)
    })
  },
  mounted() {},

  methods: {
    cancelLoss(obj) {
      cancelProfit({ autoid: obj.autoid }).then((res) => {
        if (res.code == '200') {
          this.$message.success(res.msg);
          this.alertShow = false;
          this.getAllProfitFn();
        }
      });
    },
    filterPrice(val) {
      if (!val.maincoin) return;
      const obj = this.dataInfo.find((item) => item.tradcoin == val.tradcoin);
      this.unit = obj.unit;
      return Number(obj.price);
    },
    closeAll(type) {
      coinAllCloseFn({ coin: this.kObj.tradcoin, type }).then((res) => {
        if (res.code == '200') {
          this.navIndex == 0 && this.getCoinPositionFn();
          this.navIndex == 1 && this.getEntrust();
          this.navIndex == 2 && this.getAllProfitFn();
        }
      });
    },

    getInfo(obj) {
      let data = {
        maincoin: obj.maincoin,
        tradcoin: obj.tradcoin,
      };
      getCertain(data).then((res) => {
          if (res.code == '200') {
            let data = {
              conbuy: res.data.buy,
              consell: res.data.sell,
              coninfo: res.data.info,
              contop: res.data.top,
              updata: true,
            };
            this.loadingShow && this.loadingShow.close();
            this.$store.commit('updataCertain', data);
          }
        })
        .catch(() => {
          this.loadingShow && this.loadingShow.close();
        });
    },
    //下单后拉取记录
    downFn() {
      this.getCoinPositionFn();
    },
    //当前委托
    getEntrust() {
      const _this = this;
      _this.timer && clearTimeout(_this.timer)
      let data = {
        page: this.page,
        limit: 10,
        maincoin: this.kObj.maincoin,
        tradcoin: this.kObj.tradcoin,
      };
      getCoinAccount(data).then((res) => {
        if (res.code == '200') {
          this.total = res.count;
          this.entrustData = res.data;
          if (this.entrustData.length > 0 && this.navIndex == 1) {
            _this.timer && clearTimeout(_this.timer)
            this.timer = setTimeout(() => {
              this.getEntrust();
            }, 8000);
          }
        }
      });
    },
    //记录
    tableCheck(index) {
      this.page = 1;
      this.navIndex = index;
      index == 0 && this.getCoinPositionFn();
      index == 1 && this.getEntrust();
      index == 2 && this.getAllProfitFn();
    },
    //记录分页
    pageChange(page, index) {
      this.page = page;
      index == 1 && this.getEntrust();
      index == 2 && this.getAllProfitFn();
    },

    sendWsParams(coinData) {
      if (this.$ws && this.$ws.readyState == 1) {
        let selectedParams = localStorage.getItem('selectedParams');
        let minutes = selectedParams ? selectedParams.slice(selectedParams.lastIndexOf('_') + 1) : 1;
        localStorage.setItem('selectedParams', `${coinData.maincoin}_${coinData.tradcoin}_contract_${minutes}`);
        //通知 ws 更新币种数据
        this.$ws.send(`${coinData.maincoin}_${coinData.tradcoin}_contract_${minutes}`);
      } else {
        //如果ws没准备好  0.5s后再试
        this.timer2 = setTimeout(() => {
          //通知 ws 更新币种数据
          this.sendWsParams(coinData);
          clearTimeout(this.timer2)
        }, 500);
      }
    },

    //提示
    show(str, type) {
      this.$message({
        showClose: true,
        message: str,
        type: type || 'info',
      });
    },

    //撤销
    undo(obj) {
      let _this = this;
      this.Isuddo = true;
      let data = {
        id: obj.autoid,
      };
      closeEntrust(data).then((res) => {
        if (res.code == '200') {
          this.getEntrust();
          this.$message.success(res.msg);
        }
        this.Isuddo = false;
      });
    },

    modify() {
      if (+this.number <= 0) {
        this.$message.warning(this.$t('Certain.alert.close'));
        return;
      }
      if (+this.number > +this.rowObj.unfilled) {
        this.$message.warning(
          this.$t('Certain.alert.closeNum', { num: this.rowObj.unfilled })
        );
        return;
      }
      // 止盈止损
      if (this.num == 1 || this.num == 5) {
        if (this.checkProfit) {
          if (this.rowObj.type == 'buy' && +this.profit < +this.rowObj.price) {
            this.$message.warning(this.$t('Certain.profitLoss.label7'));
            return;
          }

          if (this.rowObj.type == 'sell' && +this.profit > +this.rowObj.price) {
            this.$message.warning(this.$t('Certain.profitLoss.label8'));
            return;
          }
        }

        if (this.checkLoss) {
          if (this.rowObj.type == 'buy' && +this.loss > +this.rowObj.price) {
            this.$message.warning(this.$t('Certain.profitLoss.label6'));
            return;
          }

          if (this.rowObj.type == 'sell' && +this.loss < +this.rowObj.price) {
            this.$message.warning(this.$t('Certain.profitLoss.label9'));
            return;
          }
        }

        this.num == 1 ? this.profitLossFn() : this.modifyProfit();
      }

      //平仓
      if (this.num == 2) {
        this.closeFn();
      }
    },

    //调整保证金
    getMargin() {
      let data = {
        autoid: this.rowObj.autoid,
        number: this.bond,
      };
      changeMargin(data).then((res) => {
        if (res.code == '200') {
          this.bond = '';
          this.alertShow = false;
          this.getCoinPositionFn();
          this.$message.success(res.msg);
        }
      });
    },

    //止盈止损
    profitLossFn() {
      let profitPrice = this.profit == '' ? 0 : this.profit;
      let lossPrice = this.loss == '' ? 0 : this.loss;
      let data = {
        autoid: this.rowObj.autoid,
        take_profit: this.checkProfit ? 'enable' : 'disable',
        take_profit_price: profitPrice,
        stop_loss: this.checkLoss ? 'enable' : 'disable',
        stop_loss_price: lossPrice,
        number: this.number,
      };
      profitLossNum(data).then((res) => {
        if (res.code == '200') {
          this.alertShow = false;
          this.getCoinPositionFn();
          //更新余额
          this.$bus.$emit('certainRefreshBalance')
          this.$message.success(res.msg);
        }
      }).catch(()=>{
        this.$bus.$emit('certainRefreshBalance')
      });
    },

    //止盈止损
    modifyProfit() {
      let profitPrice = this.profit == '' ? 0 : this.profit;
      let lossPrice = this.loss == '' ? 0 : this.loss;
      let data = {
        autoid: this.rowObj.autoid,
        take_profit: this.checkProfit ? 'enable' : 'disable',
        take_profit_price: profitPrice,
        stop_loss: this.checkLoss ? 'enable' : 'disable',
        stop_loss_price: lossPrice,
      };
      profitLoss(data).then((res) => {
        if (res.code == '200') {
          this.alertShow = false;
          this.getAllProfitFn();
          //更新余额
          this.$bus.$emit('certainRefreshBalance')
          this.$message.success(res.msg);
        }
      }).catch(()=>{
        this.$bus.$emit('certainRefreshBalance')
      });
    },
    //止盈止损列表
    getAllProfitFn() {
      const params = {
        page: this.page,
        limit: 10,
        maincoin: this.kObj.maincoin,
        tradcoin: this.kObj.tradcoin,
      };
      getCoinProfitOrder(params).then((res) => {
        if (res.code == '200') {
          this.profitData = res.data;
          this.total = res.count;
        }
      });
    },

    //平仓
    closeFn(bool) {
      let data = {
        token: localStorage.getItem('token'),
        autoid: this.rowObj.autoid,
        number: bool ? this.rowObj.unfilled : this.number,
      };
      closePosition(data).then((res) => {
        if (res.code == '200') {
          this.number = '';
          this.alertShow = false;
          this.getCoinPositionFn();
          //更新余额
          this.$bus.$emit('certainRefreshBalance')
          this.$message.success(res.msg);
        }
      }).catch(()=>{
        this.$bus.$emit('certainRefreshBalance')
      });
    },

    //止盈止损1，平仓2，保证金3
    //止盈止损1，平仓2，保证金3
    toDo(obj, num) {
      this.rowObj = obj;
      if (num == 4) {
        this.closeFn(true);
        return;
      }
      this.readonly = num == 5 ? true : false;
      this.num = num;
      this.alertTitle = num == 1 || num == 5 ? 'Certain.status.profit' : 'Certain.status.close';
      if (num == 5) {
        this.number = obj.number;
        this.checkProfit = obj.take_profit == 'enable';
        this.checkLoss = obj.stop_loss == 'enable';
        this.profit = obj.take_profit == 'enable' ? obj.take_profit_price : '';
        this.loss = obj.stop_loss == 'enable' ? obj.stop_loss_price : '';
      }
      this.alertShow = true;
    },

    //当前币种持仓
    getCoinPositionFn() {
      this.positionTimer && clearTimeout(this.positionTimer);
      const params = {
        maincoin: this.kObj.maincoin || 'USDT',
        tradcoin: this.kObj.tradcoin || 'BTC',
      };
      getCoinPosition(params).then((res) => {
        if (res.code == '200') {
          this.total = res.count;
          this.positionData = res.data;
          if (this.positionData.length > 0 && this.navIndex == 0) {
            this.positionTimer && clearTimeout(this.positionTimer);
            this.positionTimer = setTimeout(() => {
              this.getCoinPositionFn();
            }, 5000);
          }
        }
      });
    },

    //行情数据点击事件
    leftShow(index) {
      let _this = this;
      if (this.count == 3) return;
      this.count = 3;
       this.timer3 = setTimeout(() => {
        let value = this.dataInfo[index];
        if (value.state == 'disable') return;
        this.loadingShow = this.$loading(_this.loadingOption);
        this.leftIndex = index;
        localStorage.setItem('leftIndexCertain', this.leftIndex);
        this.kObj = value;
        this.$bus.$emit('tradingviewCon');
        this.getInfo(value);
        this.sendWsParams(value);
        this.navIndex == 0 && this.getCoinPositionFn();
        this.navIndex == 1 && this.getEntrust();
        this.navIndex == 2 && this.getAllProfitFn();
        this.count = 0;
        clearTimeout(this.timer3);
      }, 1000);
    },

    //行情数据
    detailsInfo() {
      //带参过来
      if (this.$route.params.maincoin) {
        this.leftIndex = this.dataInfo.findIndex((item) => {
          return item.tradcoin == this.$route.params.tradcoin;
        });
        localStorage.setItem('leftIndexCertain', this.leftIndex);
      }
      let data = this.dataInfo[this.leftIndex];
      if(!data) return;
      this.kObj = data;
      this.getInfo(data);
      this.sendWsParams(data);
      if (localStorage.getItem('token')) {
        //当前委托记录
        this.getCoinPositionFn();
      }
    },
  },
  destroyed() {
    let _this = this;
    clearInterval(_this.timer);
    clearInterval(_this.timer2);
    clearInterval(_this.timer3);
    clearInterval(_this.positionTimer);

    // this.$bus.$off('currency');
    this.$bus.$off('tradingviewCon');
    this.$bus.$off('wsReload');
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
};
</script>
<style scoped lang="scss">
.el-table::before {
  background: transparent !important;
}

/* 中间部分 */
.main {
  width: 100vw;
  min-width: 1200px;
  position: relative;
  min-height: calc(100vh - 54px);
  height: 100%;
  overflow: hidden;
}

.main-center {
  flex: 1 1 auto;
  min-width: 600px;
  margin: 5px 5px 0 0;
  z-index: 99;
}
.main-left {
  flex: 0 0 auto;
  position: relative;

  .left-icon,
  .right-icon {
    transition: opacity 0.5s;
    z-index: 990;
  }
  .left-icon {
    right: 0;
    opacity: 0;
  }
  .right-icon {
    right: -19px;
  }
}
.leftShow {
  width: 300px;
  &:hover {
    .left-icon {
      opacity: 1;
    }
  }
}
.leftHide {
  width: 0;
  &:hover {
    .right-icon {
      opacity: 1;
    }
  }
}
.main-left {
  div {
    overflow: hidden;
  }
  margin: 5px 5px 0 0;
  transition: width 0.2s;
}

/* 左边导航栏 */
.left-nav {
  width: 100%;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  @include height(50px);
  padding: 0 10px;
}
#active {
  background: $blueColor;
  color: $whiteColor;
  border-radius: 5px;
}
.active {
  color: $blueColor;
}
#rightNav-title {
  font-size: 13px;
}
/* 币种 */
.info {
  width: 100%;
}
.info > div {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
}
.info ul li {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  padding: 0 10px;
  position: relative;
  /*border-bottom: 1px solid #eee;*/
}
.info ul li:hover {
  background: $navli;
}

/*中间部分*/
/*tradingview*/
#tradingview {
  height: 530px;
  margin: 5px 0 0;
}

/* 委托 */
.main-table {
  overflow: hidden;
  margin: 5px 5px 0 0;
  flex: 1;
}

// 右边挂单数据
.main-right {
  flex: 0 0 auto;
  position: relative;
  margin: 5px 0 0;
  height: 940px;
}

// 币种信息
/* 头部信息显示 */
.right-header {
  width: 100%;
  //height: 50px;
  padding: 6px 0;
  justify-content: flex-start;
}
.right-header li > div {
  padding: 0 5px;
  margin: 0 10px;
}
.trading {
  line-height: 38px;
}

.right-header-price {
  margin-right: 15px;
}

.item-value {
  font-size: 12px;
}
.item-value-unit {
  margin-left: 5px;
}

.horizontal {
  &:not(:first-child) {
    height: 30px;
    line-height: 30px;
  }
  margin: 15px 0;
  .label {
    width: 120px;
  }
  .checkbox {
    display: inline-block;
  }
  &_profit {
    height: 30px;
    line-height: 30px;
  }
}
</style>
