<template>
  <div class="order navBg">
    <div class="cen boxBg">
      <el-menu :default-active="navIndex" class="el-menu-demo" mode="horizontal" @select="changeMenu">
        <el-menu-item index="0">{{ $t('Home.titleNav.one') }}</el-menu-item>
        <el-menu-item index="1">{{ $t('Home.titleNav.two') }}</el-menu-item>
      </el-menu>
      <div class="main-record">
        <div class="allFlex list-nav listBg padding">
          <div class=" ">
            <span v-for="(item, key) in navArr" @click="activeIndex = key + ''"
              :class="activeIndex == key ? 'mainColor' : 'navColor'" class="hand" :key="'nav' + key">{{ $t(item)
              }}</span>
          </div>
          <span v-show="navIndex == '1'" class="marginTy hand titleColor close-btn" @click="closeAll">{{
        $t('Certain.status.oneClose') }}</span>
        </div>

        <data-table :tableData="tableData" :queryData="queryData" :historyData="historyData" :index="activeIndex"
          :total="total" :page="page" v-show="navIndex == '0'" @undoFn="undo" :Isuddo="Isuddo"
          @pageChange="pageChange"></data-table>
        <table-record v-show="navIndex == '1'" :tableData="certainData" :page="page" @undoFn="undoCertain" @toDo="toDo"
          :index="activeIndex" :Isuddo="Isuddo" @pageChange="pageChangeCer" :total="total"
          @cancelLoss="cancelLoss"></table-record>
      </div>
    </div>

    <el-dialog :title="$t(alertTitle)" :visible.sync="alertShow" width="30%">
      <!-- 币种信息 -->
      <div class="horizontal_top allFlex">
        <span class="label DColor">{{ $t('Certain.table.trading') }}</span>
        <span class="navColor">{{ rowObj.tradcoin }}/{{ rowObj.maincoin }}</span>
      </div>

      <!-- 下单方向 -->
      <div class="horizontal allFlex" v-show="num < 5">
        <span class="label DColor">{{ $t('Certain.table.direction') }}</span>
        <span :class="rowObj.type === 'buy' ? 'greenColor' : 'redColor'">
          <span>{{
        rowObj.type == 'buy'
          ? $t('Certain.table.buy')
          : $t('Certain.table.sell')
      }}</span>{{
          rowObj.tdMode == 'lsolate'
            ? $t('Certain.label.twelve')
            : $t('Certain.label.thirteen')
        }}{{ rowObj.lever }}X</span>
      </div>

      <!-- 开仓均价 -->
      <div class="horizontal allFlex" v-show="num < 5">
        <span class="label DColor">{{ $t('Certain.table.average') }}</span>
        <span class="navColor">{{ rowObj.price }}</span>
      </div>

      <!-- 仓位 -->
      <div class="horizontal allFlex" v-show="num < 5">
        <span class="label DColor">{{ $t('Certain.table.seat') }}</span>
        <span class="navColor">{{ rowObj.unfilled }}</span>
      </div>

      <!-- 当前价格 -->
      <div class="horizontal allFlex" v-show="num == 1">
        <span class="label DColor">{{ $t('Certain.profitLoss.label2') }}</span>
        <span class="navColor">{{ filterPrice(rowObj) }}</span>
      </div>

      <div class="horizontal allFlex">
        <span class="DColor label smallFont4">{{ $t('Certain.table.close') }}:</span>
        <el-input type="text" v-model="number" :readonly="readonly" />
      </div>

      <!--修改订单-->

      <ul v-if="num == 1 || num == 5">
        <li class="allFlex horizontal_profit">
          <el-checkbox v-model="checkProfit">{{
        $t('Certain.table.profit')
      }}</el-checkbox>
          <el-checkbox v-model="checkLoss">{{
        $t('Certain.table.loss')
      }}</el-checkbox>
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
        <span class="DColor smallFont4">{{ $t('Certain.status.closeNum') }}:</span>
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
  </div>
</template>

<script>
import { getAllQuery, getAllHistory, getOrders } from '@/api/Order';
import {
  getPositionRecord,
  getPositionHistory,
  getAccount,
  getHistory,
  allCloseFn,
  profitLoss,
  closePosition,
  getAllProfitOrder,
  profitLossNum,
  cancelProfit,
} from '@/api/Certain';
import { undoFn } from '@/api/Currency';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      activeIndex: '0',
      listArr: [
        {
          title: 'Order.table.one',
          value: 'data',
        },
      ],
      changeArr: [],
      tableData: [],
      start: 1,
      total: 0,
      Isuddo: false,
      historyData: [],
      queryData: [],
      navIndex: '0',
      certainData: [],
      positionPage: 1,
      positionTimer: null,
      rowObj: {},
      num: 1,
      number: '',
      profit: '',
      loss: '',
      alertTitle: '',
      alertShow: false,
      unit: '',
      checkProfit: false,
      checkLoss: false,
      readonly: false,
    };
  },
  components: {
    dataTable(resolve) {
      return require(['./dataTable'], resolve);
    },
    tableRecord(resolve) {
      return require(['./tableRecord'], resolve);
    },
  },

  computed: {
    ...mapState({
      coinArr: (state) => state.conSymbol,
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
    page() {
      return this.navIndex == '0' ? this.start : this.positionPage;
    },
    navArr() {
      return this.navIndex == '1'
        ? [
          'Certain.entrust.one',
          'Certain.entrust.two',
          'Certain.entrust.three',
          'Certain.entrust.four',
          'Certain.entrust.five',
        ]
        : ['Order.nav.one', 'Order.nav.two', 'Order.nav.three'];
    },
  },
  watch: {
    alertShow(val) {
      if (!val) {
        this.checkLoss = false;
        this.checkProfit = false;
        this.profit = '';
        this.loss = '';
        this.number = '';
      }
    },
    activeIndex(val) {
      this.start = 1;
      this.positionPage = 1;
      this.certainData = []
      switch (val) {
        case '0':
          this.navIndex == '1' ? this.getPositionFn() : this.query();
          break;
        case '1':
          this.navIndex == '1' ? this.getPositionHistoryFn() : this.hisRecord();
          break;
        case '2':
          this.navIndex == '1' ? this.getAccountFn() : this.getAllOrder();
          break;
        case '3':
          this.getHistoryFn();
          break;
        case '4':
          this.getAllProfitFn();
          break;
      }
    },
    navIndex(val) {
      this.start = 1;
      this.positionPage = 1;
      this.activeIndex = '0';
      val == '1' ? this.getPositionFn() : this.query();
    },
  },

  mounted() { },
  created() {
    this.query();
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
      const obj = this.coinArr.find((item) => item.tradcoin == val.tradcoin);
      this.unit = obj.unit;
      return Number(obj.price);
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
          this.getPositionFn();
          this.$message.success(res.msg);
        }
      });
    },
    //修改止盈止损
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
          this.$message.success(res.msg);
        }
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
    //一键平仓
    closeAll() {
      allCloseFn().then((res) => {
        if (res.code == '200') {
          this.getPositionFn();
        }
      });
    },

    //平仓
    closeFn(bool) {
      const data = {
        autoid: this.rowObj.autoid,
        number: bool ? this.rowObj.unfilled : this.number,
      };
      closePosition(data).then((res) => {
        if (res.code == '200') {
          this.number = '';
          this.alertShow = false;
          this.getPositionFn();
          this.$message.success(res.msg);
        }
      });
    },

    //止盈止损1，平仓2，保证金3
    toDo(obj, num) {
      this.rowObj = obj;
      if (num == 4) {
        this.closeFn(true);
        return;
      }
      this.readonly = num == 5 ? true : false;
      this.num = num;
      this.alertTitle =
        num == 1 || num == 5 ? 'Certain.status.profit' : 'Certain.status.close';
      if (num == 5) {
        this.number = obj.number;
        this.checkProfit = obj.take_profit == 'enable';
        this.checkLoss = obj.stop_loss == 'enable';
        this.profit = obj.take_profit == 'enable' ? obj.take_profit_price : '';
        this.loss = obj.stop_loss == 'enable' ? obj.stop_loss_price : '';
      }
      this.alertShow = true;
    },
    //历史委托
    getHistoryFn() {
      const params = {
        page: this.positionPage,
        limit: 10,
      };
      getHistory(params).then((res) => {
        if (res.code == '200') {
          this.certainData = res.data;
          this.total = res.count;
        }
      });
    },
    //当前委托
    getAccountFn() {
      const params = {
        page: this.positionPage,
        limit: 10,
      };
      getAccount(params).then((res) => {
        if (res.code == '200') {
          this.certainData = res.data;
          this.total = res.count;
          if (this.certainData.length > 0 && this.positionTimer == null) {
            this.positionTimer = setInterval(() => {
              this.getAccountFn();
            }, 8000);
          }
        }
      });
    },
    //当前持仓
    getPositionFn() {
      getPositionRecord().then((res) => {
        if (res.code == '200') {
          this.certainData = res.data;
          this.total = res.count;
        }
      });
    },
    //历史持仓
    getPositionHistoryFn() {
      const params = {
        page: this.positionPage,
        limit: 10,
      };
      getPositionHistory(params).then((res) => {
        if (res.code == '200') {
          this.certainData = res.data;
          this.total = res.count;
        }
      });
    },
    //止盈止损列表
    getAllProfitFn() {
      const params = {
        page: this.positionPage,
        limit: 10,
      };
      getAllProfitOrder(params).then((res) => {
        if (res.code == '200') {
          this.certainData = res.data;
          this.total = res.count;
        }
      });
    },
    undoCertain(obj) {
      this.Isuddo = true;
      let data = {
        id: obj.autoid,
      };
      closeEntrust(data).then((res) => {
        if (res.code == '200') {
          this.getAccountFn();
          this.$message.success(res.msg);
        }
        this.Isuddo = false;
      });
    },
    //撤销
    undo(obj) {
      this.Isuddo = true;
      let data = {
        id: obj.autoid,
        token: localStorage.getItem('token'),
      };

      //请求
      undoFn(data).then((res) => {
        //请求成功，刷新数据
        if (res.code == '200') {
          this.$message.success(res.msg);
          this.query();
          this.Isuddo = false;
        }
      });
    },
    pageChange(page) {
      this.certainData = []
      this.start = page;
      if (this.activeIndex == '0') {
        this.query();
      } else if (this.activeIndex == '1') {
        this.hisRecord();
      } else {
        this.getAllOrder();
      }
    },
    pageChangeCer(page) {
      this.positionPage = page;
      switch (this.activeIndex) {
        case '0':
          this.getPositionFn();
          break;
        case '1':
          this.getPositionHistoryFn();
          break;
        case '2':
          this.getAccountFn();
          break;
        case '3':
          this.getHistoryFn();
          break;
        case '4':
          this.getAllProfitFn();
          break;
      }
    },
    //历史挂单记录
    hisRecord() {
      let _this = this;
      //参数
      let data = {
        page: this.start,
        limit: 10,
      };

      //请求
      getAllHistory(data).then((res) => {
        if (res.code == '200') {
          this.total = res.count;
          this.historyData = res.data;
        }
      });
    },
    //成交明细
    getAllOrder() {
      let data = {
        page: this.start,
        limit: 10,
      };
      getOrders(data).then((res) => {
        if (res.code == '200') {
          this.total = res.count;
          this.tableData = res.data;
        }
      });
    },
    //查询当前挂单
    query() {
      let _this = this;
      // //请求参数
      let data = {
        page: this.start,
        limit: 10,
      };

      //请求
      getAllQuery(data).then((res) => {
        if (res.code == '200') {
          this.total = res.count;
          this.queryData = res.data;
        }
      });
    },
    changeMenu(index) {
      this.navIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.order {
  height: 100vh;
  min-height: 800px;
  padding-bottom: 40px;

  >div {
    margin-top: 20px;
  }
}

.list-nav {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid var(--border-color);

  span {
    margin-right: 30px;
    transition: ease-in-out 0.1s;
  }
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

.close-btn {
  transition: ease-in-out 0.2s;

  &:hover {
    color: $mainColor;
  }
}

.el-menu {
  background-color: var(--index-bgColor);  
}

.el-menu-demo ::v-deep .el-menu-item {
  color: $navColor;

  &:hover {
    color: $mainColor !important;
  }

  &.is-active {
    color: $mainColor !important;
  }
}

::v-deep .el-table {
  background: $boxBg;
   .el-table__body-wrapper {
    tr {
      background-color: transparent !important;
      color: var(--title-color);      
    }
  }  
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: var(--tradingCenter-table-hoverBgColor);
}
::v-deep .el-table td.el-table__cell {
  border-bottom: 1px solid var(--border-color);
}

::v-deep .el-pagination{
  button {
    background-color: var(--index-bgColor) !important;
    color: var(--title-color);
    &:hover {
      color: var(--mian-bgColor) !important;
    }
  }
  ul {
    li {
      background-color: var(--index-bgColor) !important;
      color: var(--title-color);
      &:hover {
        color: var(--mian-bgColor) !important;
      }
    }
  }
}
</style>
