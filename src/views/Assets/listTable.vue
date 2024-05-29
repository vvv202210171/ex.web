<template>
  <div class="table">
    <el-table
      :data="tableData"
      :key="+index"
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="headerStyle"
      ref="table"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 充值 -->
          <div class="allFlex charge-extend" v-if="+index == 0">
            <div>
              <span class="navColor">{{ $t('Assets.chargeBox.id') }}</span>
              <span class="titleColor">{{ props.row.id }}</span>
            </div>
            <div>
              <span class="navColor">{{ $t('Assets.chargeBox.time') }}</span>
              <span class="titleColor">
                {{ props.row.wdate | ts_local }}
              </span>
            </div>
          </div>

          <!-- 提现 -->
          <ul class="mention-extend" v-else>
            <li class="allFlex">
              <div class="f2">
                <span class="navColor">{{ $t('Assets.table.seven') }}: </span>
                <span class="titleColor">{{ props.row.address }}</span>
              </div>
              <div class="f1">
                <span class="navColor"
                  >{{ $t('Assets.table.thirteen') }}:
                </span>
                <span class="titleColor"
                  >{{ props.row.gas }} {{ props.row.coin }}</span
                >
              </div>
            </li>

            <li class="allFlex">
              <div class="f2">
                <span class="navColor">{{ $t('Assets.chargeBox.id') }}</span>
                <span class="titleColor">{{ props.row.hash }}</span>
              </div>
              <div class="f1">
                <span class="navColor">{{ $t('Assets.chargeBox.time') }}</span>
                <span class="titleColor">{{ props.row.wdate | ts_local}}</span>
              </div>
            </li>
          </ul>
        </template>
      </el-table-column>

      <!-- 币种 -->
      <el-table-column
        prop="coin"
        :label="$t('Assets.table.one')"
      ></el-table-column>

      <!-- 数量 -->
      <el-table-column
        prop="number"
        sortable
        :label="$t('Assets.recordTable.one')"
      ></el-table-column>

      <!-- 类型 -->
      <el-table-column
        prop="title"
        sortable
        :label="$t('Assets.table.eleven')"
      ></el-table-column>

      <!-- 状态 -->
      <el-table-column prop="title" :label="$t('Assets.recordTable.two')">
        <template slot-scope="scope">
          <span>{{ $t(filterType(scope.row.state)) }}</span>
        </template>
      </el-table-column>

      <!-- 时间 -->
      <el-table-column :label="$t('Assets.table.fourteen')">
        <template slot-scope="scope">
          <span>{{ scope.row.wdate | ts_local }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column :label="$t('Assets.table.five')" align="right">
        <template slot-scope="scope">
          <span class="mainColor hand" @click="toDetails(scope.row)">{{
            $t('Assets.chargeBox.details')
          }}</span>
          <span v-if="scope.row.type === 'out' && scope.row.state === 'sending'">
            <span> | </span>
                <span class="mainColor hand" @click="orderUndo(scope.row)">{{
                    $t('message.currency.form.undo')
                  }}</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="main-page">
      <div class="page-box">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :prev-text="$t('Last')"
          :next-text="$t('Next')"
          :currentPage="page"
          :hide-on-single-page="hide"
          :page-size="10"
          @current-change="change"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import de from "@/i18n/lang/de";

export default {
  data() {
    return {
      hide: true,
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    filterType(str) {
      return str == 'revoke' ? 'Certain.status.cancel' :  `Assets.state.${str}`;
    },
    change(val) {
      this.$emit('changePage', val);
    },
    toDetails(obj) {
      let $dom = this.$refs.table;
      $dom.toggleRowExpansion(obj);
    },
    orderUndo(obj){
      this.$emit('orderUndo',obj)
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
.el-table {
  background: $boxBg;
  ::v-deep .el-table__body-wrapper {
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


.el-table ::v-deep .el-table__expand-column .cell {
  display: none;
}

.el-table :deep(.el-table__expanded-cell) {
  background: $boxBg;
  pointer-events: none;
  transition: ease-in-out 0.1s;
}
// .charge-extend {
//   height: 60px;
//   line-height: 60px;
// }
.mention-extend li {
  line-height: 40px;
}
</style>
