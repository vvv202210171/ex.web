<template>
  <div class="box">
    <div class="cen">
      <div class="table-title">
        <el-button
          v-for="(item, key) in titleArr"
          :key="'title' + key"
          :type="activeIndex == key ? 'primary' : ''"
          :class="[key !== 0 && 'marginTen']"
          @click="checkNav(key)"
          >{{ $t(item) }}</el-button
        >
      </div>
      <el-menu
        :default-active="index"
        class="el-menu-demo"
        mode="horizontal"

        @select="change"
      >
        <el-menu-item
          :index="key + ''"
          :key="key"
          v-for="(item, key) in navArr"
          >{{ item }}</el-menu-item
        >
        <div class="search-btn centerAll">
          <el-input
            type="text"
            :placeholder="$t('Home.table.search')"
            class="search_ipt"
            v-model="seachVal"
          >
            <img
              slot="suffix"
              v-if="seachVal == ''"
              src="@HomeImg/search-grey.png"
              class="search_icon"
            />
            <img
              v-else
              slot="suffix"
              src="@HomeImg/search-green.png"
              class="search_icon"
            />
          </el-input>
        </div>
      </el-menu>

      <el-table :data="searchArr" style="width: 100%" @row-click="toDetails">
        <el-table-column
          prop="maincoin"
          :label="$t('Home.table.maincoin')"
          width="180"
        >
          <template slot-scope="scope">
            <div class="left-coin">
              <img
                src="@HomeImg/star-green.png"
                class="start-icon hand"
                alt=""
                v-if="filters(scope.row.tradcoin, scope.row.maincoin)"
                @click.stop="handdle(scope.row)"
              />
              <img
                src="@HomeImg/star-grey.png"
                class="start-icon hand"
                v-else
                @click.stop="handdle(scope.row)"
              />

              <span class="marginTen"
                >{{ scope.row.tradcoin }}/{{ scope.row.maincoin }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          :label="$t('Home.table.price')"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="rise" :label="$t('Home.table.rise')">
          <template slot-scope="scope">
            <span :class="+scope.row.rise > 0 ? 'greenColor' : 'redColor'"
              >{{ scope.row.rise }}%</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="height" :label="$t('Home.table.height')">
        </el-table-column>
        <el-table-column prop="low" :label="$t('Home.table.low')">
        </el-table-column>
        <el-table-column prop="volume" :label="$t('Home.table.volume')">
        </el-table-column>
        <!-- <el-table-column prop="address" label="趋势图"> </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seachVal: '',
      index: '0',
      navIndex: 0,
      activeIndex: 0,
      titleArr: [
        'Home.titleNav.one',
        'Home.titleNav.two',
        'Home.table.optional',
      ],
      searchArr: [],
    };
  },
  watch: {
    seachVal(val) {
      if (val) {
        const str = val.toLowerCase();
        this.searchArr = this.tableData.filter(
          (item) => item.tradcoin.toLowerCase().indexOf(str) >= 0
        );
      } else {
        this.searchArr =
          this.navIndex !== 'null' ? this.tableData : this.optionalArr;
      }
    },
    tableData(val) {
      if (this.navIndex !== 'null') {
        if (this.seachVal) {
          this.searchArr = val.filter(
            (item) =>
              item.maincoin == this.navArr[this.index] &&
              item.tradcoin.toLowerCase().indexOf(this.seachVal) >= 0
          );
        } else {
          this.searchArr = val.filter(
            (item) => item.maincoin == this.navArr[this.index]
          );
        }
      }
    },
  },
  computed: {
    optionalArr() {
      return this.$store.state.optionalArr;
    },
    tableData() {
      return this.navIndex == 0
        ? this.$store.state.tradSymbol
        : this.$store.state.conSymbol;
    },
    navArr() {
      let arr = [];
      this.tableData.forEach((item) => {
        if (!arr.includes(item.maincoin)) {
          arr.push(item.maincoin);
        }
      });
      return arr;
    },
  },
  methods: {
    toDetails(row) {
      if (this.navIndex == 'null') return;
      const name = this.navIndex == 0 ? 'currency' : 'certain';
      const params = { maincoin: row.maincoin, tradcoin: row.tradcoin };
      this.$router.push({name, params});
    },
    checkNav(index) {
      localStorage.setItem('navIndex', index + '');
      if (index == this.titleArr.length - 1) {
        this.navIndex = 'null';
        this.operator();
      } else {
        this.navIndex = index;
      }
      this.activeIndex = index;
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      return 'fontWeight:400;color:#192544;fontSize:20px;fontFamily:Regular';
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
      this.$store.commit('updataOptional', row);
      if (this.navIndex === 'null') this.operator();
    },
    change(index) {
      this.index = index;
      this.searchArr = this.tableData.filter(
        (item) =>
          item.maincoin.toLowerCase() == this.navArr[+this.index].toLowerCase()
      );
    },
    //自选
    operator() {
      this.searchArr = this.$store.state.optionalArr;
    },
  },
  created() {
    if (this.tableData.length > 0) {
      this.searchArr = this.tableData.filter(
        (item) => item.maincoin == this.navArr[this.index]
      );
    }
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.el-menu-demo{
  min-height: 60px;
  background-color: var(--index-bgColor) !important;
  border-bottom:1px solid var(--border-color) !important;
  ::v-deep .el-input{
    .el-input__inner {
      background-color: var(--index-bgColor) !important;
      border: 1px solid var(--border-color);
    }
  }
}
.el-menu-demo ::v-deep .el-menu-item.is-active{
  color: $navColor;  
  border-bottom: 2px solid var(--mian-bgColor);
  &:hover{
    color: var(--common-color) !important;
  }
  &.is-active {
    color: var(--common-color) !important;
  }
}

.box {
  padding: 20px 0;
  > div {
    padding: 0 20px;
    box-sizing: border-box;
  }
  .table-title {
    height: 46px;
    .el-button{
      width: 150px;
      background-color: var(--tradingCenter-marginTen-bgColor);
      color: var(--tradingCenter-marginTen-color);;
      border: none;
    }
    .el-button--primary {
      background-color: var(--mian-bgColor);
      color: var(--tradingCenter-primary-color);
      border: none;
    }
    .active {
      background: $mainColor;
      color: $whiteColor;
    }
  }
}
.table-title span {
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  transition: ease-in-out 0.2s;
}

.search_ipt {
  width: 85%;
  height: 45px;
  background: transparent;
  font-weight: 400;
  color: $proColor;
  padding-left: 10px;
  font-size: 14px;
}
.el-menu {
  position: relative;
}
.search-btn {
  width: 280px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 0;
}
.search_ipt {
  height: 40px;
  line-height: 40px;
}

.search_icon {
  width: 15px;
  height: 15px;
  right: 10%;
}
.left-coin {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;
}
.start-icon {
  width: 18px;
  height: 18px;
}

::v-deep .el-table {
  th {
    background-color: var(--index-bgColor) !important;
    color: var(--tradingCenter-table-thColor) !important;
    border-bottom:1px solid var(--border-color) !important;
  }
  tr {
    background-color: var(--index-bgColor) !important;
    color: var(--title-color) !important;
    font-weight: 500;
    &:hover{
    background-color: var(--tradingCenter-table-hoverBgColor) !important;
  }
    td {
      background-color: transparent !important;
      border-bottom:1px solid var(--border-color) !important;
    }
  }
}
</style>
