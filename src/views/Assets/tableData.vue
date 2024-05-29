<template>
  <div class="table">
    <el-table
      :data="tableData"
      :key="+index"
      v-if="+index == 0"
      style="width: 100%"
      ref="table"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- <el-table-column type="expand" v-if="+index == 0">
        <template slot-scope="scope">
          <div>
            <charge
              :dataObj="scope.row"
              v-if="scope.row.method == 1"
              :coinList="coinList"
              :key="scope.row.coin"
            ></charge>
            <mention
              :dataObj="scope.row"
              :coinList="coinList"
              :finish="mentionFinish"
              :addressArr="addressArr"
              v-else
              @mentionFn="mention"
              :key="scope.row.coin"
            ></mention>
          </div>
        </template>
      </el-table-column> -->

      <!-- 币种 -->
      <el-table-column
        prop="coin"
        :label="$t('Assets.table.one')"
      ></el-table-column>

      <!-- 可用 -->
      <el-table-column
        prop="usable"
        sortable
        :label="$t('Assets.table.two')"
      ></el-table-column>

      <!-- 冻结资产 -->
      <el-table-column
        prop="disable"
        sortable
        :label="$t('Assets.table.three')"
      ></el-table-column>

      <!-- 折合资产 -->
      <el-table-column :label="$t('Assets.table.four')">
        <template slot-scope="scope">
          <span
            >{{ usdRate.symbol
            }}{{
              (
                (Number(scope.row.usable) + Number(scope.row.disable)) *
                scope.row.usdt *
                usdRate.price
              ).toFixed(4)
            }}</span
          >
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column :label="$t('Assets.table.five')" align="right">
        <template slot-scope="scope">
          <div :class="locale == 'jp' && 'allFlex column'">
            <!-- <span
              class="mainColor hand"
              @click="
                toAssets(scope.row);
                scope.row.method = 1;
              "
              v-if="scope.row.isout == 'enable'"
              >{{ $t('Assets.charge') }}</span
            >
            <span
              class="mainColor marginTen hand"
              v-if="scope.row.isout == 'enable'"
              @click="
                toMention(scope.row);
                scope.row.method = 2;
              "
              >{{ $t('Assets.mention') }}</span
            > -->
            <span
              v-show="scope.row.coin !== 'USDT'"
              class="mainColor marginTen hand"
              @click="transferFn(scope.row)"
              >{{ $t('Assets.deal') }}</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="tableData"
      :key="+index"
      style="width: 100%"
      ref="table"
      v-if="+index == 1"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- 币种 -->
      <el-table-column
        prop="coin"
        :label="$t('Assets.table.one')"
      ></el-table-column>

      <!-- 持有数量 -->
      <el-table-column
        prop="usable"
        sortable
        :label="$t('Assets.nav.six')"
      ></el-table-column>

      <!-- 仓位保证金 -->
      <el-table-column
        prop="orders"
        sortable
        :label="$t('Assets.nav.seven')"
      ></el-table-column>

      <!-- 已实现盈亏 -->
      <el-table-column :label="$t('Assets.nav.eight')" prop="profit">
      </el-table-column>

      <!-- 委托保证金 -->
      <el-table-column :label="$t('Assets.nav.nine')" prop="entrust">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column :label="$t('Assets.table.five')" align="right">
        <template slot-scope="scope">
          <div :class="locale == 'jp' && 'allFlex column'">
            <!-- <span
              class="mainColor hand"
              @click="
                toAssets(scope.row);
                scope.row.method = 1;
              "
              v-if="scope.row.isin == 'enable'"
              >{{ $t('Assets.charge') }}</span
            >
            <span
              class="mainColor marginTen hand"
              v-if="scope.row.isout == 'enable'"
              @click="
                toMention(scope.row);
                scope.row.method = 2;
              "
              >{{ $t('Assets.mention') }}</span
            > -->
            <span
              class="mainColor marginTen hand"
              @click="transferFn(scope.row)"
              >{{ $t('Assets.deal') }}</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getChargeAddress, mentionFn } from '@/api/Assets';
import Mixin from '@/Mixin';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      method: 1,
      assetsObj: {},
      mentionObj: {},
      addressArr: [],
      mentionFinish: false,
      addressShow: false,
      chargeShow: false,
      lastObj: {},
      expandArr: [],
      getRowKeys(row) {
        return row.coin;
      },
    };
  },
  computed: {
    ...mapState({
      coinList: (state) => state.allCoinList,
      usdRate: (state) => state.usdRate,
    }),
    locale() {
      return this.$i18n.locale;
    },
  },
  mixins: [Mixin],
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    index: {
      type: String,
      default: '0',
    },
  },

  components: {
    // charge(resolve) {
    //   return require(['./charge'], resolve);
    // },
    // mention(resolve) {
    //   return require(['./mention'], resolve);
    // },
  },

  mounted() {},
  created() {},

  methods: {
    expandChange(row) {
      Array.prototype.remove = function (val) {
        let index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      if (this.expands.indexOf(row.coin) < 0) {
        that.expands = [];
      } else {
        this.expands.remove(row.coin);
        that.expands = [];
      }
    },

    transferFn(obj) {
      const path = this.index == 0 ? '/currency' : '/certain';
      const query =
        this.index == 1
          ? {}
          : {
              maincoin: 'USDT',
              tradcoin: obj.coin,
            };
      this.pushPath(path, query);
    },

    //提币
    toMention(obj) {
      let _this = this;
      if (this.$store.state.accountInfo.tradpasswordstate == 'false') {
        this.open();
        return;
      }
      if (this.chargeShow && obj.coin == this.lastObj.coin) {
        this.chargeShow = false;
        let $dom = this.$refs.table;
        $dom.toggleRowExpansion(obj);
        return;
      }
      this.lastObj = obj;
      this.chargeShow = true;
      this.method = 2;
      let $dom = this.$refs.table;
      $dom.toggleRowExpansion(obj);
    },

    mention(address, number, password, blockname, coin) {
      let data = {
        coin,
        blockname,
        address,
        number,
        tradpassword: password,
      };
      mentionFn(data).then((res) => {
        if (res.code == '200') {
          this.mentionFinish = true;
          this.chargeShow = false;
          let $dom = this.$refs.table;
          $dom.toggleRowExpansion(this.lastObj);
          this.$message.success(res.msg);
        }
      });
    },

    //充币
    toAssets(obj) {
      let _this = this;
      if (this.chargeShow && obj.coin == this.lastObj.coin) {
        this.chargeShow = false;
        let $dom = this.$refs.table;
        $dom.toggleRowExpansion(obj);
        return;
      }
      this.lastObj = obj;
      this.chargeShow = true;
      this.method = 1;
      let $dom = this.$refs.table;
      $dom.toggleRowExpansion(obj);
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
  // pointer-events: none;
  // transition: ease-in-out 0.1s;
}

.el-table >>> .el-table__expanded-cell[class*='cell'] {
  background: $whiteColor;
}
</style>
