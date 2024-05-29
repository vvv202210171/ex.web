<template>
  <div class="data-box">
    <!-- 当前委托 -->
    <el-table
      :data="queryData"
      v-if="+index == 0"
      :key="+index"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column :label="$t('message.currency.form.trading')">
        <template slot-scope="scope">
          <span>{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.category')">
        <template slot-scope="scope">
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.style == 'limit'
              ? $t('Certain.table.limit')
              : $t('Certain.table.market')
          }}</span>
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type === 'buy'
              ? $t('message.currency.form.buy')
              : $t('message.currency.form.sell')
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="wdate"
        :label="$t('message.currency.form.sj')"
      ></el-table-column>

      <el-table-column
        prop="price"
        :label="$t('message.currency.form.wtprice')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price }} {{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="number"
        :label="$t('message.currency.form.wtquantity')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.number }} {{ scope.row.tradcoin }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.wtTotle')">
        <template slot-scope="scope">
          <span>{{ (scope.row.number * scope.row.price) | toFixed }}</span>
        </template>
      </el-table-column>

      <!-- 未成交量 -->
      <el-table-column
        prop="number"
        :label="$t('message.currency.form.unfilled')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.unfilled }} {{ scope.row.tradcoin }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.operation')">
        <template slot-scope="scope">
          <el-button
            type="danger"
            class="undo-btn hand Ycolor"
            :disabled="Isuddo"
            @click="undo(scope.row)"
          >
            {{ $t('message.currency.form.undo') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 历史记录 -->
    <el-table
      :data="historyData"
      :key="+index"
      v-if="+index == 1"
      style="width: 100%"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column :label="$t('message.currency.form.trading')">
        <template slot-scope="scope">
          <span>{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.category')">
        <template slot-scope="scope">
          <div :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'">
            <span>{{
              scope.row.style == 'limit'
                ? $t('Certain.table.limit')
                : $t('Certain.table.market')
            }}</span>
            <span>{{
              scope.row.type === 'buy'
                ? $t('message.currency.form.buy')
                : $t('message.currency.form.sell')
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="wdate"
        :label="$t('message.currency.form.sj')"
      ></el-table-column>

      <el-table-column
        prop="price"
        :label="$t('message.currency.form.wtprice')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price }} {{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="number"
        :label="$t('message.currency.form.wtquantity')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.number }} {{ scope.row.tradcoin }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.totalamount')">
        <template slot-scope="scope">
          <span>{{
            (Number(scope.row.price) * Number(scope.row.number)).toFixed(4)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.state')">
        <template slot-scope="scope">
          <span class="Ycolor">{{
            scope.row.state === 'all'
              ? $t('message.currency.form.deal')
              : $t('message.currency.form.hasUndo')
          }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 成交明细 -->
    <el-table
      :data="tableData"
      :key="+index"
      v-if="+index == 2"
      style="width: 100%"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column :label="$t('message.currency.form.trading')">
        <template slot-scope="scope">
          <span>{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.category')">
        <template slot-scope="scope">
          <span :class="scope.row.type === 'buy' ? 'greenColor' : 'redColor'">{{
            scope.row.type === 'buy'
              ? $t('message.currency.form.buy')
              : $t('message.currency.form.sell')
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="price" :label="$t('Order.table.nine')">
        <template slot-scope="scope">
          <span>{{ scope.row.price }} {{ scope.row.maincoin }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="number" :label="$t('Order.table.four')">
        <template slot-scope="scope">
          <span>{{ scope.row.number }} {{ scope.row.tradcoin }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.totalamount')">
        <template slot-scope="scope">
          <span>{{
            (Number(scope.row.price) * Number(scope.row.number)).toFixed(4)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="wdate"
        :label="$t('message.currency.form.sj')"
      ></el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="main-page">
      <div class="page-box">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :prev-text="$t('message.currency.lastPage')"
          :next-text="$t('message.currency.nextPage')"
          :currentPage="page"
          @current-change="change"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleObj: {
        tradcoin: '',
        miancoin: '',
      },
    };
  },
  props: {
    index: {
      type: String,
      default: '0',
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    queryData: {
      type: Array,
      default: () => [],
    },
    historyData: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    Isuddo: {
      type: Boolean,
      defalut: false,
    },
  },
  filters: {
    tofix(val) {
      return val.toFixed(4);
    },

    toFixed(val) {
      return val.toFixed(6);
    },
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    undo(obj) {
      this.$emit('undoFn', obj);
    },
    change(val) {
      this.$emit('pageChange', val);
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      return 'background:var(--border-color);color:var(--tradingView-text-color)';
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'height:60px;';
    },
  },
};
</script>
<style lang="scss" scoped>
.data-box {
  height: 100%;
  min-height: 600px;
  .el-table {
    min-height: 560px;
  }
}
.main-page {
  height: 40px;
  position: relative;
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
.el-pagination :deep(.el-pager) {
  height: 100%;
}
.el-pagination ::v-deep .el-pager li {
  background: transparent;
  font-size: 16px;
  margin: 0 10px;
  &.number {
    color: $whiteColor;
    &:hover {
      color: $mainColor;
    }
  }

  &.active {
    color: $mainColor !important;
  }
}
.undo-btn {
  border-radius: 2px;
  padding: 0 10px;
  height: 30px;
}
</style>
