<template>
  <div class="table-box boxBg">
    <div class="main-entrust-radio allFlex padding listBg">
      <div>
        <span
          v-for="(item, key) in navArr"
          :key="key"
          class="hand"
          :class="index == key ? 'mainColor' : 'navColor'"
          @click="tableCheck(key)"
          >{{ $t(item) }}</span
        >
      </div>
      <!-- <span class="marginTy hand close-btn" @click="toClose">{{
        $t('Certain.status.oneClose')
      }}</span> -->
      <el-select
        size="mini"
        v-if="positionData.length > 0"
        v-model="closeType"
        class="close-btn"
      >
        <el-option
          v-for="item in closeOption"
          :key="item.type"
          :label="$t(item.title)"
          :value="item.type"
        >
        </el-option>
      </el-select>
    </div>

    <!-- 持仓订单 -->
    <el-table
      :data="positionData"
      style="width: 100%"
      height="350"
      v-if="+index == 0"
      :key="index"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- 类型 -->
      <el-table-column :label="$t('Certain.table.type')" width="80">
        <template slot-scope="scope">
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.style == 'limit'
              ? $t('Certain.table.limit')
              : $t('Certain.table.market')
          }}</span>
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type == 'buy'
              ? $t('Certain.table.buy')
              : $t('Certain.table.sell')
          }}</span>
        </template>
      </el-table-column>

      <!-- 交易对 -->
      <el-table-column :label="$t('Certain.table.trading')" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <!-- 建仓时间 -->
      <el-table-column
        :label="$t('Certain.table.sj')"
        prop="wdate"
        width="140"
      ></el-table-column>

      <!-- 下单方向 -->
      <!-- <el-table-column
        width="100"
        prop="number"
        :label="$t('Certain.table.direction')"
      >
        <template slot-scope="scope">
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type == 'buy'
              ? $t('Certain.table.buy')
              : $t('Certain.table.sell')
          }}</span>
        </template></el-table-column
      > -->

      <!-- 倍数 -->
      <el-table-column
        prop="lever"
        width="100"
        :label="$t('Certain.table.times')"
      >
        <template slot-scope="scope">
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.tdMode == 'lsolate'
              ? $t('Certain.label.twelve')
              : $t('Certain.label.thirteen')
          }}</span>
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'"
            >{{ scope.row.lever }}X</span
          >
        </template>
      </el-table-column>

      <!-- 仓位 -->
      <el-table-column
        prop="number"
        width="140"
        :label="$t('Certain.table.seat')"
      ></el-table-column>

      <!-- 可平 -->
      <el-table-column
        prop="unfilled"
        width="140"
        :label="$t('Certain.table.has')"
      ></el-table-column>

      <!-- 开仓均价 -->
      <el-table-column
        prop="price"
        width="140"
        :label="$t('Certain.table.average')"
      >
      </el-table-column>

      <!-- 仓位保证金 -->
      <el-table-column
        prop="profit"
        width="100"
        :label="$t('Certain.table.cwbond')"
      >
      </el-table-column>

      <!-- 预估强平价，删 -->
      <el-table-column
        prop="point"
        width="160"
        :label="$t('Certain.table.endPrice')"
      >
        <template slot-scope="scope">
          <span>{{ +scope.row.point > 0 ? scope.row.point : '--' }}</span>
        </template>
      </el-table-column>

      <!-- 盈亏 -->
      <el-table-column
        :label="$t('Certain.table.rise')"
        prop="income"
        width="120"
      >
        <template slot-scope="scope">
          <span
            v-show="scope.row.type == 'buy'"
            :class="
              filterPrice(scope.row) > +scope.row.price
                ? 'greenColor'
                : 'redColor'
            "
            >{{ filterPrice(scope.row) > +scope.row.price ? '+' : ''
            }}{{
              ((filterPrice(scope.row) - +scope.row.price) *
                titleObj.unit *
                scope.row.number)
                | mathFloor(4)
            }}</span
          >
          <span
            v-show="scope.row.type == 'sell'"
            :class="
              filterPrice(scope.row) < +scope.row.price
                ? 'greenColor'
                : 'redColor'
            "
            >{{ filterPrice(scope.row) > +scope.row.price ? '' : '+'
            }}{{
              ((+scope.row.price - filterPrice(scope.row)) *
                titleObj.unit *
                scope.row.number)
                | mathFloor(4)
            }}</span
          >
        </template>
      </el-table-column>

      <!-- 止盈价 -->
      <el-table-column
        width="120"
        :label="$t('Certain.table.profit')"
        prop="take_profit_price"
      >
      </el-table-column>

      <!-- 止损价 -->
      <el-table-column
        width="120"
        :label="$t('Certain.table.loss')"
        prop="stop_loss_price"
      >
      </el-table-column>

      <!-- 仓息 -->
<!--      <el-table-column-->
<!--        width="100"-->
<!--        :label="$t('Certain.table.interest')"-->
<!--        prop="fess"-->
<!--      >-->
<!--      </el-table-column>-->

      <!-- 手续费 -->
      <el-table-column
        width="140"
        :label="$t('Certain.table.charge')"
        prop="gas"
      >
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        width="380"
        :label="$t('Certain.table.operation')"
        align="right"
        header-align="right"
      >
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="danger"
            :disabled="Isuddo"
            @click="toDo(scope.row, 3)"
            >{{ $t('Certain.status.bond') }}</el-button
          > -->
          <el-button
            size="mini"
            type="danger"
            :disabled="Isuddo"
            @click="toDo(scope.row, 1)"
            >{{ $t('Certain.status.profit') }}</el-button
          >

          <el-button
            size="mini"
            type="danger"
            :disabled="Isuddo"
            @click="toDo(scope.row, 2)"
            >{{ $t('Certain.status.close') }}</el-button
          >
          <el-button
            size="mini"
            type="danger"
            :disabled="Isuddo"
            @click="toDo(scope.row, 4)"
            >{{ $t('Certain.status.oneClose') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 当前委托 -->
    <el-table
      :data="entrustData"
      height="230"
      v-if="+index == 1"
      :key="index"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- 交易对 -->
      <el-table-column :label="$t('Certain.table.trading')" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <!-- 类型 -->
      <el-table-column :label="$t('Certain.table.type')" width="80">
        <template slot-scope="scope">
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.style == 'limit'
              ? $t('Certain.table.limit')
              : $t('Certain.table.market')
          }}</span>
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type == 'buy'
              ? $t('Certain.table.buy')
              : $t('Certain.table.sell')
          }}</span>
        </template>
      </el-table-column>

      <!-- 建仓时间 -->
      <el-table-column
        :label="$t('Certain.table.sj')"
        prop="wdate"
        width="130"
      ></el-table-column>

      <!-- 下单方向 -->
      <!-- <el-table-column
        width="100"
        prop="number"
        :label="$t('Certain.table.direction')"
      >
        <template slot-scope="scope">
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type == 'buy'
              ? $t('Certain.table.buy')
              : $t('Certain.table.sell')
          }}</span>
        </template></el-table-column
      > -->

      <!-- 倍数 -->
      <el-table-column
        prop="lever"
        width="100"
        :label="$t('Certain.table.times')"
      >
        <template slot-scope="scope">
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.tdMode == 'lsolate'
              ? $t('Certain.label.twelve')
              : $t('Certain.label.thirteen')
          }}</span>
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'"
            >{{ scope.row.lever }}X</span
          >
        </template>
      </el-table-column>

      <!-- 委托价 -->
      <el-table-column
        prop="price"
        width="160"
        :label="$t('Certain.table.price')"
      >
      </el-table-column>

      <!-- 仓位 -->
      <el-table-column
        prop="number"
        width="140"
        :label="$t('Certain.table.seat')"
      ></el-table-column>

      <!-- 未成交 -->
      <el-table-column
        prop="unfilled"
        width="140"
        :label="$t('Certain.table.unfilled')"
      ></el-table-column>

      <!-- 保证金 -->
      <el-table-column
        width="120"
        :label="$t('Certain.table.bond')"
        prop="point"
      ></el-table-column>

      <!-- 状态 -->
      <el-table-column :label="$t('Certain.table.times')" width="120">
        <template slot-scope="scope">
          <span>{{ $t(filterType(scope.row.state)) }}</span>
        </template>
      </el-table-column>

      <!-- 手续费 -->
      <el-table-column
        width="140"
        :label="$t('Certain.table.charge')"
        prop="gas"
      >
      </el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('Certain.table.operation')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :disabled="Isuddo && checkId == scope.row.autoid"
            @click="undo(scope.row)"
            >{{ $t('Certain.table.back') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 止盈止损 -->
    <el-table
      :data="profitData"
      height="230"
      v-if="+index == 2"
      :key="index"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- 交易对 -->
      <el-table-column :label="$t('Certain.table.trading')" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <!-- 类型 -->
      <el-table-column :label="$t('Certain.table.type')" width="80">
        <template slot-scope="scope">
          <span :class="scope.row.type == 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type == 'buy'
              ? $t('Certain.table.buy')
              : $t('Certain.table.sell')
          }}</span>
        </template>
      </el-table-column>

      <!-- 数量 -->
      <el-table-column
        width="150"
        :label="$t('Certain.profitLoss.label3')"
        prop="number"
      >
      </el-table-column>

      <!-- 委托价 -->
      <el-table-column
        prop="price"
        width="160"
        :label="$t('Certain.table.price')"
      >
      </el-table-column>

      <!-- 止盈价 -->
      <el-table-column
        width="150"
        :label="$t('Certain.table.profit')"
        prop="take_profit_price"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.take_profit == 'enable'
              ? scope.row.take_profit_price
              : '--'
          }}</span>
        </template>
      </el-table-column>

      <!-- 止损价 -->
      <el-table-column
        width="150"
        :label="$t('Certain.table.loss')"
        prop="stop_loss_price"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.stop_loss == 'enable' ? scope.row.stop_loss_price : '--'
          }}</span>
        </template>
      </el-table-column>

      <!-- 建仓时间 -->
      <el-table-column
        :label="$t('Certain.table.wtsj')"
        prop="wdate"
      ></el-table-column>

      <!-- 操作 -->
      <el-table-column
        :label="$t('Certain.table.operation')"
        align="right"
        header-align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :disabled="Isuddo"
            @click="toDo(scope.row, 5)"
            >{{ $t('Certain.profitLoss.label4') }}</el-button
          >
          <el-button
            size="mini"
            type="danger"
            :disabled="Isuddo"
            @click="profitLoss(scope.row)"
            >{{ $t('Certain.profitLoss.label5') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="main-page centerFlex" v-if="index !== 0">
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
import { mapState } from 'vuex';
export default {
  data() {
    return {
      hide: false,
      closeType: 'all',
      closeOption: [
        {
          title: 'Certain.profitLoss.label10',
          type: 'all',
        },
        {
          title: 'Certain.profitLoss.label11',
          type: 'buy',
        },
        {
          title: 'Certain.profitLoss.label12',
          type: 'sell',
        },
      ],
      index: 0,
      checkId: '',
      navArr: [
        'Certain.entrust.one',
        // 'Certain.entrust.two',
        'Certain.entrust.three',
        'Certain.entrust.five',
      ],
      timer: null,
    };
  },
  computed: {
    ...mapState({
      dataInfo: (state) => state.conSymbol,
      titleObj: (state) => state.certain.info,
    }),
  },
  watch: {
    closeType(val) {
      if (this.positionData.length > 0) {
        this.$emit('closeAll', val);
      }
    },
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
    profitData: {
      type: Array,
      defailt: () => [],
    },
    page: {
      default: 1,
    },
    Isuddo: {
      type: Boolean,
      defalut: false,
    },
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
    filterType(type) {
      let str = '';
      switch (type) {
        case 'unfilled':
          str = 'Certain.status.unfilled';
          break;
        case 'section':
          str = 'Certain.status.section';
          break;
        case 'all':
          str = 'Certain.status.all';
          break;
        case 'cancel':
          str = 'Certain.status.cancel';
          break;
      }
      return str;
    },
    tableCheck(index) {
      this.$emit('tableCheck', index);
      this.index = index;
    },
    //分页切换
    change(val) {
      this.$emit('pageChange', val, this.index);
    },
    filters(trad, main) {
      return this.$store.state.optionalArr.some((item) => {
        return item.tradcoin === trad && item.maincoin == main;
      });
    },
    profitLoss(obj) {
      this.$emit('cancelLoss', obj);
    },
    //撤回
    undo(obj) {
      this.checkId = obj.autoid;
      this.$emit('undoFn', obj);
    },
    //止盈，止损，平仓
    toDo(obj, num) {
      this.$emit('toDo', obj, num);
    },
  },
};
</script>

<style scoped lang="scss">
.table-box {
  width: 100%;
  overflow: hidden;
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
  height: 40px;
  position: relative;
  border-top: 1px solid $border;
}
.main-page span {
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
  border-radius: 10px;
}
.el-pagination {
  display: inline-block;
  margin: auto;
  background: transparent;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
.close-btn {
  width: 100px;
}

::v-deep .el-input__inner {
  color: var(--title-color);  
  border-color: var(--border-color);
}

::v-deep .el-select .el-input.is-focus .el-input__inner {
  border-color: var(--mian-bgColor);  
}

::v-deep .el-table{
  background-color: $boxBg;   
  tr {
    background-color: transparent !important;
    color:  var(--title-color);
    th {
      background-color: transparent !important;
    }
  }
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell{
    background-color: var(--tradingCenter-table-hoverBgColor)
  }

.info-table ::v-deep .el-table__cell{
  border: none;
  background: $boxBg;
  color: var(--title-color);
}
</style>
