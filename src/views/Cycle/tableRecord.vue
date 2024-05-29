<template>
  <div class="table-box boxBg">
    <div class="main-entrust-radio padding listBg">
      <span
        v-for="(item, key) in navArr"
        :key="key"
        class="hand"
        :class="index == key ? 'mainColor' : 'navColor'"
        @click="tableCheck(key)"
        >{{ $t(item) }}</span
      >
    </div>

    <!-- 持仓订单 -->
    <el-table
      :data="positionData"
      style="width: 100%"
      height="350"
      v-if="+index == 0"
      :key="index"
    >
      <!-- 交易对 -->
      <el-table-column fixed :label="$t('Certain.table.trading')" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <!-- 下单方向 -->
      <el-table-column
        width="90"
        prop="number"
        :label="$t('Target.table.direction')"
      >
        <template slot-scope="scope">
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type == "buy" ? $t("Target.up") : $t("Target.down")
          }}</span>
        </template></el-table-column
      >

      <!-- 交易总额 -->
      <el-table-column
        prop="number"
        width="120"
        :label="$t('Target.table.total')"
      >
        <template slot-scope="scope">
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'"
            >{{ scope.row.number }}{{ scope.row.paycoin }}</span
          >
        </template>
      </el-table-column>

      <!-- 交易周期 -->
      <el-table-column
        prop="lever"
        width="100"
        :label="$t('Cycle.label.cycle')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.lever }}s</span>
        </template>
      </el-table-column>

      <!-- rate -->
      <el-table-column :label="$t('Target.table.rate')" prop="income">
        <template slot-scope="scope">
<!--          买涨-->
          <span
            v-show="scope.row.type == 'buy'"
            :class="
              filterPrice(scope.row) > +scope.row.price
                ? 'greenColor'
                : 'redColor'
            "
            >{{ filterPrice(scope.row) > +scope.row.price ? "+" : "-"
            }}{{
              filterPrice(scope.row) > +scope.row.price
                ? generateRandom(scope.row.number, scope.row.profitGas)
                : generateRandom(scope.row.number, scope.row.lossGas)
            }}</span
          >
<!--          买跌-->
          <span
            v-show="scope.row.type == 'sell'"
            :class="
              filterPrice(scope.row) > +scope.row.price ?
                'redColor' : 'greenColor'
            "
            >{{ filterPrice(scope.row) > +scope.row.price ? "-" : "+"
            }}{{
              filterPrice(scope.row) > +scope.row.price
                ? generateRandom(scope.row.number, scope.row.lossGas)
                : generateRandom(scope.row.number, scope.row.profitGas)
            }}</span
          >
        </template>
      </el-table-column>
      <!-- 手续费 -->
      <el-table-column
        width="100"
        :label="$t('Certain.table.charge')"
        prop="gas"
      >
      </el-table-column>

      <!-- 最新价 -->
      <el-table-column :label="$t('Target.table.newPrice')">
        <template slot-scope="scope">
          <span>{{ filterPrice(scope.row) }}</span>
        </template>
      </el-table-column>

      <!-- 开仓价 -->
      <el-table-column prop="price" :label="$t('Target.table.openPrice')">
      </el-table-column>

      <!-- 开仓时间 -->
      <el-table-column :label="$t('Target.table.openTime')" prop="wdate">
        <template slot-scope="scope">
          <span>{{ getTime(scope.row.wdate) }}</span>
        </template>
      </el-table-column>

      <!-- 实时盈亏 -->
      <el-table-column :label="$t('message.tradingview.rise')">
        <template slot-scope="scope">
          <span
            v-if="scope.row.type == 'buy'"
            :class="
              filterPrice(scope.row) > +scope.row.price
                ? 'greenColor'
                : 'redColor'
            "
            >{{
              filterPrice(scope.row) > +scope.row.price
                ? $t("message.tradingview.surplus")
                : $t("message.tradingview.deficit")
            }}</span
          >
          <span
            v-if="scope.row.type == 'sell'"
            :class="
              filterPrice(scope.row) > +scope.row.price ?
                'redColor' : 'greenColor'
            "
            >{{
              filterPrice(scope.row) > Number(scope.row.price)
                ? $t("message.tradingview.deficit")
                : $t("message.tradingview.surplus")
            }}</span
          >
        </template>
      </el-table-column>

      <!-- 倒计时 -->
      <el-table-column :label="$t('message.tradingview.downtime')">
        <template slot-scope="scope">
          <down-time
            :info="scope.row"
            :key="scope.row.wdate"
            @tableCheck="tableCheck"
          ></down-time>
        </template>
      </el-table-column>
    </el-table>

    <!-- 历史持仓 -->
    <el-table
      :data="historyPositon"
      style="width: 100%"
      height="350"
      v-if="+index == 1"
      :key="index"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- 交易对 -->
      <el-table-column :label="$t('Certain.table.trading')" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <!-- 下单方向 -->
      <el-table-column
        prop="number"
        width="100"
        :label="$t('Target.table.direction')"
      >
        <template slot-scope="scope">
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type == "buy" ? $t("Target.up") : $t("Target.down")
          }}</span>
        </template></el-table-column
      >

      <!-- 交易总额 -->
      <el-table-column prop="number" :label="$t('Target.table.total')">
        <template slot-scope="scope">
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'"
            >{{ scope.row.number }}{{ scope.row.paycoin }}</span
          >
        </template>
      </el-table-column>

      <!-- 点位 -->
      <el-table-column prop="lever" :label="$t('Cycle.label.cycle')">
        <template slot-scope="scope">
          <span>{{ scope.row.lever }}s</span>
        </template>
      </el-table-column>

      <!-- rate -->
      <el-table-column :label="$t('Target.table.rate')" prop="income">
        <template slot-scope="scope">
          <span :class="+scope.row.income > 0 ? 'greenColor' : 'redColor'">{{
            scope.row.income
          }}</span>
        </template>
      </el-table-column>
      <!-- 手续费 -->
      <el-table-column
        width="120"
        :label="$t('Certain.table.charge')"
        prop="gas"
      >
      </el-table-column>

      <!-- 开仓价 -->
      <el-table-column prop="price" :label="$t('Target.table.openPrice')">
      </el-table-column>
      <!-- 平仓价 -->
      <el-table-column
        :label="$t('Certain.table.lastProfit')"
        prop="last_profit"
      >
      </el-table-column>

      <!-- 开仓时间 -->
      <el-table-column
        :label="$t('Target.table.openTime')"
        prop="wdate"
        width="150"
        align="right"
      ></el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="main-page" v-if="index == 1">
      <div class="page-box">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :prev-text="$t('Last')"
          :next-text="$t('Next')"
          :currentPage="page"
          :hide-on-single-page="hide"
          @current-change="change"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      hide: false,
      index: 0,
      checkId: "",
      navArr: ["Target.entrust.now", "Target.entrust.history"],
    };
  },
  components: {
    downTime(resolve) {
      require(["./downTime"], resolve);
    },
  },
  computed: {
    ...mapState({
      dataInfo: (state) => state.cycleSymbol,
      titleObj: (state) => state.cycle.info,
    }),
  },
  props: {
    total: {
      defailt: 0,
    },
    positionData: {
      type: Array,
      default: () => [],
    },
    entrustData: {
      type: Array,
      default: () => [],
    },
    historyEntrust: {
      type: Array,
      default: () => [],
    },
    historyPositon: {
      type: Array,
      default: () => [],
    },
    page: {
      default: 1,
    },
  },

  filters: {
    tofix(val) {
      return val.toFixed(2);
    },

    toFixed(val) {
      return val.toFixed(4);
    },
  },
  methods: {
    filterPrice(val) {
      if (!val.maincoin) return;
      const obj = this.dataInfo.find((item) => item.tradcoin == val.tradcoin);
      return Number(obj.price);
    },
    generateRandom(old, val) {
      old = Number(old) * 100;
      val = Number(val);
      let Max = val + val * 0.15;
      let Min = val - val * 0.15;
      let Range = (Max - Min) * 100;
      let Rand = Number(Math.random().toFixed(2)) * 100;
      let num = Number((Min + (Rand * Range) / 10000).toFixed(2));
      return Number(((old * num) / 100).toFixed(2));
    },

    getTime(date) {
      let dd = new Date(date); //获得当前时间
      dd.setTime(date);
      // const sq = 8;
      // const len = dd.getTime();
      // const offset = dd.getTimezoneOffset() * 60000;
      // const utcTime = len + offset;
      // const str = new Date(utcTime + 3600000 * sq);

      const H = this.ff(dd.getHours());
      const M = this.ff(dd.getMinutes());
      const S = this.ff(dd.getSeconds());
      return `${H}:${M}:${S}`;
    },
    ff(val) {
      return val < 10 ? `0${val}` : val;
    },
    filterType(type) {
      let str = "";
      switch (type) {
        case "unfilled":
          str = "Certain.status.unfilled";
          break;
        case "section":
          str = "Certain.status.section";
          break;
        case "all":
          str = "Certain.status.all";
          break;
        case "cancel":
          str = "Certain.status.cancel";
          break;
      }
      return str;
    },
    tableCheck(index, num) {
      if (num) {
        this.$emit("tableCheck", index, num);
      } else {
        this.index = index;
        this.$emit("tableCheck", index);
      }
    },
    //分页切换
    change(val) {
      this.$emit("pageChange", val, this.index);
    },
    filters(trad, main) {
      return this.$store.state.optionalArr.some((item) => {
        return item.tradcoin === trad && item.maincoin == main;
      });
    },
    handdle(row) {
      let arr = this.$store.state.optionalArr.filter((item) => {
        return item.tradcoin === row.tradcoin && item.maincoin === row.maincoin;
      });

      this.$store.commit("updataOptional", row);
    },
    toDetails(row) {
      this.$emit("check", row);
    },
  },
};
</script>

<style scoped lang="scss">
.table-box {
  width: 100%;
  overflow: hidden;  
}
::v-deep .el-table {
  background-color: var(--index-bgColor) !important;
  tr {
    background-color: var(--index-bgColor) !important;        
    th {
      background-color: transparent !important;
      border-bottom: 1px solid var(--border-color) !important;
    }
    td {
      border-bottom: 1px solid var(--border-color) !important;
      color: var(--title-color); 
    }
  }  
  .el-table__fixed{
    &::before {
      background-color: transparent !important;
    }
  }
}
::v-deep .el-table__body tr.hover-row > td.el-table__cell {
  background-color: var(--tradingCenter-table-hoverBgColor) !important;
  }
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
    background-color: var(--tradingCenter-table-hoverBgColor) !important;
  }

.main-entrust-radio {
  width: 100%;
  height: 40px;
  line-height: 40px;
  span {
    margin-right: 20px;
    transition: ease-in-out 0.1s;
  }
}
.entrust-table {
  height: 230px;
}
.el-radio-group .el-radio {
  line-height: 40px;
}
/*撤销*/
.undo-btn {
  border-radius: 2px;
  padding: 0 10px;
  /*border-radius:5px;*/
  background: $greenColor;
  color: $whiteColor;
  border: none;
}
.undo-btn:hover {
  background: $greenColor;
}
.main-page {
  height: 60px;
  position: relative;
  border-top: 1px solid $border;
}
.main-page span {
  display: inline-block;
  width: 100px;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
  border-radius: 10px;
}
::v-deep .el-pagination {
  display: inline-block;
  margin: auto;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  button {
    background-color: var(--index-bgColor) !important;
  }
  ul {
    li {
      background-color: var(--index-bgColor) !important;
      color: var(--mian-bgColor);
    }
  }
}
</style>