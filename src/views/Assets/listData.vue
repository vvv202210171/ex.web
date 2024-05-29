<template>
  <div class="listData">
    <div class="list-nav boxBg">
      <span
        v-for="(item, key) in navArr"
        :key="'nav' + key"
        class="hand"
        :class="[
          navInex == key ? 'mainColor' : 'navColor',
          key !== 0 && 'marginTen',
        ]"
        @click="navInex = key"
        >{{ $t(item) }}</span
    >
    </div>

    <!-- table -->
    <list-table
      :tableData="listArr"
      :page="page"
      :total="total"
      :index="navInex"
      @changePage="changePage"
      @orderUndo="orderUndo"
    ></list-table>
  </div>
</template>

<script>
import {getAllTableInfo, orderUndo} from '@/api/Assets';
export default {
  data() {
    return {
      navArr: ['Assets.record.one', 'Assets.record.two', 'Assets.record.five'],
      listArr: [],
      navInex: 0,
      page: 1,
      total: 0,
      allData: [],
    };
  },

  components: {
    listTable(resolve) {
      return require(['./listTable'], resolve);
    },
  },
  props: {
    searchVal: {
      type: String,
      default: '',
    },
  },
  watch: {
    navInex() {
      this.init();
    },
    searchVal(val) {
      if (val) {
        let str = val.toLowerCase();
        this.listArr = this.allData.filter(
          (item) => item.coin.toLowerCase().indexOf(str) >= 0
        );
      } else {
        this.listArr = this.allData;
      }
    },
  },

  mounted() {},

  created() {
    this.init();
  },

  methods: {
    filterType(index) {
      let str = '';
      switch (index) {
        case 0:
          str = 'in';
          break;
        case 1:
          str = 'out';
          break;
        case 2:
          str = 'system';
          break;
      }
      return str;
    },
    changePage(page) {
      this.page = page;
      this.init();
    },
    orderUndo(order){
      orderUndo({ autoid : order.autoid }).then((res) => {
        this.init();
      });
    },
    init() {
      let type = this.filterType(this.navInex);
      let data = {
        type: type,
        page: this.page,
        limit: 10,
      };
      getAllTableInfo(data).then((res) => {
        if (res.code == '200') {
          this.allData = res.data;
          this.listArr = res.data;
          this.total = res.count;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.listData {
  margin-top: 10px;
}
.list-nav {
  height: 40px;
  line-height: 40px;
  span {
    padding: 0 20px;
  }
}
</style>
