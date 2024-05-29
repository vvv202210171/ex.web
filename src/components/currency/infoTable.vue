<template>
  <div class="info-table">
    <div class="main-entrust-radio padding listBg titleColor" v-if="index < 3">
      {{ $t(titleName) }}
    </div>

    <!-- 当前委托 -->
    <el-table
      :data="tableData"
      height="280"
      v-if="+index == 1"
      :key="index"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- 交易对 -->
      <el-table-column :label="$t('message.currency.form.trading')">
        <span>{{ titleObj.tradcoin }}/{{ titleObj.maincoin }}</span>
      </el-table-column>

      <!-- 类型 -->
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

      <!-- 时间 -->
      <el-table-column
        prop="wdate"
        :label="$t('message.currency.form.sj')"
      ></el-table-column>

      <!-- 委托价 -->
      <el-table-column
        prop="price"
        :label="$t('message.currency.form.wtprice')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price }} {{ titleObj.maincoin }}</span>
        </template>
      </el-table-column>

      <!-- 委托量 -->

      <el-table-column
        prop="number"
        :label="$t('message.currency.form.wtquantity')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.number }}{{ titleObj.number }}</span>
        </template>
      </el-table-column>

      <!-- 未成交量 -->
      <el-table-column
        prop="number"
        :label="$t('message.currency.form.unfilled')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.unfilled }}{{ titleObj.number }}</span>
        </template>
      </el-table-column>

      <!-- 委托总额 -->
      <el-table-column :label="$t('message.currency.form.wtTotle')">
        <template slot-scope="scope">
          <span
            >{{ (scope.row.number * scope.row.price) | toFixed }}
            {{ titleObj.maincoin }}</span
          >
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.currency.form.operation')">
        <template slot-scope="scope">
          <el-button
            type="danger"
            class="undo-btn hand"
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
      :data="tableData"
      :key="index"
      height="280"
      v-if="+index == 2"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column :label="$t('message.currency.form.trading')">
        <span>{{ titleObj.tradcoin }}/{{ titleObj.maincoin }}</span>
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
          <span>{{ scope.row.price }}{{ titleObj.maincoin }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="number"
        :label="$t('message.currency.form.wtquantity')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.number }}{{ titleObj.number }}</span>
        </template>
      </el-table-column>

       <el-table-column
        prop="price"
        :label="$t('message.currency.form.totalamount')"
      >
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

    <!-- 行情 -->
    <el-table
      :data="tableData"
      v-if="+index == 3"
      :key="index"
      style="width: 100%"
      @cell-click="toDetails"
    >
      <el-table-column prop="date" :label="$t('message.appDetails.form.date')">
        <template slot-scope="scope">
          <i
            class="iconfont start-icon"
            :class="
              filters(scope.row.tradcoin, scope.row.maincoin)
                ? 'icon-start_o Ycolor'
                : 'icon-start'
            "
            @click="handdle(scope.row)"
          ></i>
          <span style="margin-left: 10px"
            >{{ scope.row.tradcoin }}/
            <span class="proFont font">{{ scope.row.maincoin }}</span></span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="newprice"
        :label="$t('message.appDetails.form.newprice')"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="height"
        :label="$t('message.appDetails.form.maxprice')"
      ></el-table-column>
      <el-table-column
        prop="low"
        :label="$t('message.appDetails.form.minprice')"
      ></el-table-column>
      <el-table-column
        prop="volume"
        :label="$t('message.appDetails.form.volume')"
      ></el-table-column>
      <el-table-column prop="rise" :label="$t('message.appDetails.form.rose')">
        <template slot-scope="scope">
          <span
            :class="
              scope.row.rise.indexOf('-') !== -1 ? 'redColor' : 'greenColor'
            "
            >{{
              scope.row.rise.indexOf('-') !== -1
                ? scope.row.rise
                : '+' + scope.row.rise
            }}%</span
          >
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.appDetails.form.currency')"
        width="80"
      >
        <template slot-scope="scope">
          <router-link
            :to="{ path: '/currency', query: scope.row }"
            tag="span"
            class="hand Ycolor"
            >{{ $t('Financial.transaction') }}</router-link
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="main-page" v-if="index !== 3">
      <div class="page-box">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :prev-text="$t('message.currency.lastPage')"
          :next-text="$t('message.currency.nextPage')"
          :currentPage="page"
          :hide-on-single-page="hidePage"
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
      hidePage: false,
    };
  },
  props: {
    titleObj: {
      type: Object,
      defalut: () => {},
    },
    page: {
      type: Number,
      defailt: 1,
    },
    total: {
      type: Number,
      defailt: 0,
    },
    titleName: {
      type: String,
      defailt: '',
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    index: {
      default: '',
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
  methods: {
    //分页切换
    change(val) {
      this.$emit('pageChange', val, this.index);
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
      let str =
        arr.length > 0
          ? 'message.currency.show.cancel'
          : 'message.currency.show.add';
      // this.$MessageNew.success(this.$t(str));
      this.$store.commit('updataOptional', row);
    },
    toDetails(row) {
      this.$emit('check', row);
    },
    undo(obj) {
      this.$emit('undoFn', obj);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-table{
  background-color: $boxBg;   
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell{
    background-color: var(--tradingCenter-table-hoverBgColor)
  }

.info-table ::v-deep .el-table__cell{
  border: none;
  background: $boxBg;
  color: var(--title-color);
}
.main-entrust-radio {
  height: 40px;
  line-height: 40px;
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
  width: 80px;
  height: 30px;
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
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
.el-pagination :deep(.el-pager) {
  height: 100%;
}
.el-pagination :deep(.el-pager) li {
  background: transparent;
  font-size: 16px;
  margin: 0 10px;
  &.number {
    &:hover {
      color: $mainColor;
    }
  }

  &.active {
    color: $mainColor !important;
  }
}
.el-pagination :deep(button) {
  background: transparent;
  &:hover {
    color: $mainColor;
  }
}
</style>
