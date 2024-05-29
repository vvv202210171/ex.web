<template>
  <div class="main navBg">
    <div class="allFlex main-box">
      <!-- 右边选择币种 -->
      <div class="main-left boxBg" :class="LShow ? ` leftShow` : ``">
        <ul class="left-nav startFlex">
          <li @click="checkNav(null)" :id="index == null ? 'active' : ''" class="hand mainColor">
            <i class="iconfont start-icon Ycolor hand icon_start"></i>
            {{ $t('Home.table.optional') }}
          </li>
          <li class="startFlex">
            <div v-for="(item, key) in detailsArr" :key="key" class="hand mainColor" :id="index == key ? 'active' : ''"
              @click="checkNav(key)">
              {{ item }}
            </div>
          </li>
          <li class="navColor endFlex" style="flex: 1">
            <span>( 24H )</span>
          </li>
        </ul>
        <!-- 搜索 -->
        <div class="search-ipt">
          <input type="text" :placeholder="$t('message.currency.placeholder')" v-model="search" class="ipt" />
          <span class="el-icon-search centerAll search-pic mainColor"></span>
        </div>

        <div class="info">
          <div class="allFlex info_nav">
            <span class="navColor" style="width: 35%">{{
        $t('message.currency.rightNav.currency')
      }}</span>
            <span class="navColor f1 center">{{
          $t('message.currency.rightNav.price')
        }}</span>
            <span class="navColor endFlex" style="width: 27%">{{
          $t('message.currency.rightNav.rise')
        }}</span>
          </div>
          <vue-scroll :ops="ops" style="height: 800px">
            <ul>
              <li v-for="(item, key) in searchAry" :key="key" class="allFlex hand"
                :class="leftIndex == (item.tradcoin + '/' + item.maincoin) && 'listBg'"
                @click.stop="leftShow(key, item)">
                <div style="width: 35%">
                  <i class="iconfont mainColor hand" :class="filters(item.tradcoin, item.maincoin)
          ? 'icon-start_o'
          : 'icon-start'
        " @click.stop="handdle(item)"></i>
                  <span :class="item.zt !== 0 ? `` : 'titleColor'" class="Medium titleColor font-Five">
                    {{ item.tradcoin }}/{{ item.maincoin }}</span>
                </div>
                <span class="navColor f1 center">{{ item.price }}</span>
                <span :class="item.rise && item.rise.indexOf('-') === -1
          ? 'greenColor'
          : 'redColor'
        " style="width: 27%" class="endFlex">{{ item.rise.indexOf('-') === -1 ? '+' : ''
                  }}{{ item.rise }}%</span>
              </li>
            </ul>
          </vue-scroll>
        </div>
      </div>

      <!--中间部分 k线-->
      <div class="main-center allFlex column boxBg">
        <!--币种数据-->
        <ul class="right-header allFlex kTitle">
          <li class="allFlex">
            <div class="trading">
              <span class="font-Six Semibold mainColor">{{
        titleObj.tradcoin
      }}</span>

              <span class="font-Six proFont mainColor">/{{ titleObj.maincoin }}</span>
              <img src="@ContractImg/check.png" class="check-pic hand" alt id="check-pic"
                :class="LShow ? 'check-show-pic' : ''" @click="LShow = !LShow" />
            </div>

            <div class="allFlex column">
              <span :class="titleObj.rise && titleObj.rise <= 0
          ? 'redColor'
          : 'greenColor'
        " class="right-header-price Medium font-Six">{{ titleObj.price }}</span>
              <div>
                <span class="font-Two navColor">≈{{ Number(titleObj.price * usdRate.price).toFixed(2)
                  }}{{ usdRate.coin }}</span>
                <span class="item-value marginTen" :class="titleObj.rise && titleObj.rise <= 0
          ? 'redColor'
          : 'greenColor'
        ">{{ titleObj.rise }}%</span>
              </div>
            </div>
          </li>

          <!-- 最高 -->
          <li class="allFlex">
            <div class="allFlex column">
              <span class="navColor">{{ $t('message.k.high') }}</span>

              <span class="item-value navColor">
                {{ titleObj.height }}
                <span class="item-value-unit">{{ titleObj.maincoin }}</span>
              </span>
            </div>

            <!-- 最低 -->
            <div class="allFlex column">
              <span class="navColor">{{ $t('message.k.row') }}</span>

              <span class="item-value navColor">
                {{ titleObj.low }}
                <span class="item-value-unit">{{ titleObj.maincoin }}</span>
              </span>
            </div>

            <!-- 交易量 -->
            <div class="allFlex column">
              <span class="navColor">{{ $t('message.k.vol') }}</span>

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

        <div class="main-entrust">
          <div class="allFlex main-entrust-radio padding proFont listBg">
            <span v-for="(item, key) in priceBtn" :key="key" class="center proFont hand"
              :class="buyIndex === key ? 'navActive' : 'greyColor'" @click="buyIndex = key">{{ $t(item) }}
            </span>
          </div>
          <div class="allFlex main-entrust-buy">
            <!--买入-->
            <buy-transfer :titleObj="kObj" :index="Number(buyIndex)" :balanceObj="balanceObj"
              @updataBalance="getBalance"></buy-transfer>

            <!--卖出-->
            <sell-transfer :titleObj="kObj" :balanceObj="balanceObj" @updataBalance="getBalance"
              :index="Number(buyIndex)"></sell-transfer>
          </div>
        </div>
      </div>

      <!-- 右边登记 -->
      <div class="main-right boxBg">
        <trading-market name="currency" :titleObj="kObj"></trading-market>
      </div>
    </div>

    <ul class="main-table boxBg">
      <!--当前委托-->
      <li>
        <info-table :tableData="entrustData" index="1" titleName="message.currency.entrust.now" :titleObj="kObj"
          @undoFn="undo" :Isuddo="Isuddo" @pageChange="pageChange" :total="queryCount" :page="start"></info-table>
      </li>

      <!--历史记录-->
      <li>
        <info-table :tableData="historyData" index="2" :Isuddo="Isuddo" titleName="message.currency.entrust.history"
          :titleObj="kObj" :page="historyStart" :total="historyCount" @pageChange="pageChange"></info-table>
      </li>
    </ul>

    <div class="showDialog" v-if="dialogShow">{{ showInfo }}</div>
  </div>

  <!--</div>-->
</template>

<script>
import {
  getQuery,
  getHistory,
  getTradsInfo,
  undoFn,
  getAccount,
  getCoinInfo,
} from '@/api/Currency';
import { mapState } from 'vuex';
import mixin from '@/Mixin';
export default {
  name: '',
  data() {
    return {
      index: 0,
      buyIndex: 0,
      search: '',
      entrustData: [],
      step: 20,
      LShow: false,
      priceType: null,
      loginShow: false,
      num: 0,
      buyBut: 1,
      saleBut: 1,
      isdisabledFn: false,
      isdisabledFn1: false,
      Isuddo: false,
      rightNav: [
        'message.currency.rightNav.currency',
        'message.currency.rightNav.price',
        'message.currency.rightNav.rise',
      ],
      priceBtn: [
        'message.currency.priceBtn.fixPrice',
        'message.currency.priceBtn.marketPrice',
      ],
      detailsArr: [],
      leftIndex: localStorage.getItem('leftIndexCurrency') || '',
      leftObj: {},
      currye: '',
      tradye: '',
      password: '',
      pawShow: false,
      start: 1,
      dialogShow: false,
      showInfo: '',
      searchArr: [],
      historyData: [],
      timer: null,
      timer2: null,
      timer3: null,
      timer4: null,
      type: 0,
      length: 0,
      minutes: '15',
      tradtype: 0,
      balanceObj: {},
      historyStart: 1,
      historyCount: 0,
      queryCount: 0,
      leftCilck: null,
      count: 0,
      kObj: {},
    };
  },
  mixins: [mixin],
  components: {
    buyTransfer(resolve) {
      require(['../components/currency/buyTransfer.vue'], resolve);
    },
    sellTransfer(resolve) {
      require(['../components/currency/sellTransfer.vue'], resolve);
    },
    infoTable(resolve) {
      require(['../components/currency/infoTable.vue'], resolve);
    },
    tradingMarket(resolve) {
      require(['@/components/contract/tradingMarket.vue'], resolve);
    },
  },
  computed: {
    ...mapState({
      titleObj: (state) => state.currency.info,
      usdRate: (state) => state.usdRate,
    }),
    titleCoin() {
      return this.detailsArr[this.index];
    },
    tableData() {
      return this.$store.state.tradSymbol;
    },
    login() {
      return localStorage.getItem('token');
    },
    searchAry() {
      let str = this.search.toLowerCase();
      if (str === '') {
        if (this.index !== null) {
          return this.tableData.filter((item) => {
            return item.maincoin.toUpperCase() == this.detailsArr[this.index];
          });
        } else {
          return this.$store.getters.optionalAry
        }
      } else {
        return this.tableData.filter((item) => {
          return item.tradcoin.toLowerCase().indexOf(str) !== -1;
        });
      }
    },
  },
  created() {
    // localStorage.setItem('tradingview.resolution', 15);
    sessionStorage.setItem('index', 2);

    this.tableData.length > 0 && this.getMaincoinNav();
    //拉去挂单数据
    this.$bus.$on('wsReload', () => {
      this.leftShow(this.leftIndex, this.kObj)
    })
  },
  mounted() { },

  methods: {
    getMaincoinNav() {
      this.detailsArr = [];
      this.tableData.forEach((item) => {
        if (!this.detailsArr.includes(item.maincoin)) {
          this.detailsArr.push(item.maincoin);
        }
      });
      this.detailsInfo();
    },
    //记录分页
    pageChange(page, index) {
      console.log(page);
      if (index == 1) {
        this.start = page;
        this.query();
      } else {
        this.historyStart = page;
        this.hisRecord();
      }
    },
    //获取可用余额
    getBalance() {
      let data = {
        maincoin: this.kObj.maincoin,
        tradcoin: this.kObj.tradcoin,
      };
      getAccount(data).then((res) => {
        if (res.code == '200') {
          let data = { ...res.data }
          if (data.balance) {
            data.balance.mainusable = Math.max(data.balance.mainusable, 0)
            data.balance.tradusable = Math.max(data.balance.tradusable, 0)
          }
          this.balanceObj = data.balance;
          this.query();
        }
      });
    },
    sendWsParams(coinData) {
      if (this.$ws && this.$ws.readyState == 1) {
        let selectedParams = localStorage.getItem('selectedParams');
        let minutes = selectedParams ? selectedParams.slice(selectedParams.lastIndexOf('_') + 1) : 1;
        localStorage.setItem('selectedParams', `${coinData.maincoin}_${coinData.tradcoin}_trad_${minutes}`);
        //通知 ws 更新币种数据
        this.$ws.send(`${coinData.maincoin}_${coinData.tradcoin}_trad_${minutes}`); //用于合约交易
      } else {
        //如果ws没准备好  0.5s后再试
        this.timer3 = setTimeout(() => {
          //通知 ws 更新币种数据
          this.sendWsParams(coinData);
          clearTimeout(this.timer3)
        }, 500);
      }
    },
    getCoinInfo(obj) {
      let data = {
        maincoin: obj.maincoin,
        tradcoin: obj.tradcoin,
      };
      getCoinInfo(data).then((res) => {
        if (res.code == '200') {
          if (localStorage.getItem('token')) {
            //当前委托记录
            // this.query();
            this.hisRecord();
            this.getBalance();
          }
          let data = {
            buy: res.data.buy,
            sell: res.data.sell,
            info: res.data.info,
            top: res.data.top,
            updata: true,
          };
          this.loadingShow && this.loadingShow.close();
          this.$store.commit('updataTrad', data);
        }
      });
    },

    //数量累加
    quantityFn(arr, type) {
      let num = 0;
      let _this = this;
      if (type === 0) {
        let ary = arr;
        let ary1 = [];
        ary.forEach((item, key) => {
          num += Number(item.amount);
          ary1.push(num.toFixed(4));
        });
        arr.forEach((item, key) => {
          item.quantityAll = ary1[key];
        });
        arr.reverse();
      } else {
        arr.forEach((item, key) => {
          num += Number(item.amount);
          item.quantityAll = num;
        });
      }
      return arr;
    },

    //加载更多
    lastPage() {
      if (this.start > 1) {
        this.start--;
        this.query();
      }
    },

    nextPage() {
      if (this.length === 10) {
        this.start++;
        this.query();
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

      //请求
      undoFn(data).then((res) => {
        //请求成功，刷新数据
        if (res.code == '200') {
          this.$message.success(res.msg);
          this.query();
          this.hisRecord();
          this.timer4 = setTimeout(() => {
            _this.Isuddo = false;
            clearTimeout(this.timer4);
          }, 1500);
        }
      });
    },

    //历史挂单记录
    hisRecord() {
      let _this = this;

      //参数
      let data = {
        maincoin: this.kObj.maincoin,
        tradcoin: this.kObj.tradcoin,
        page: this.historyStart,
        limit: '10',
      };

      //请求
      getHistory(data).then((res) => {
        if (res.code == '200') {
          this.historyCount = res.count;
          this.historyData = res.data;
        }
      });
    },

    //查询当前挂单
    query() {
      let _this = this;
      // //请求参数
      let data = {
        maincoin: this.kObj.maincoin,
        tradcoin: this.kObj.tradcoin,
        page: this.start,
        limit: '10',
      };

      //请求
      getQuery(data).then((res) => {
        if (res.code == '200') {
          this.queryCount = res.count;
          this.entrustData = res.data;
          if (this.queryCount > 0 && this.timer == null) {
            this.timer = setTimeout(() => {
              this.timer = null;
              this.query();
              this.hisRecord();
            }, 8000);
          }
        }
      });
    },

    //行情数据点击事件
    leftShow(index, value) {
      let _this = this;
      if (value.zt === 0) {
        this.show(_this.$t('message.noOpen'));
        return;
      }
      if (this.count == 3) return;
      this.count = 3;
      this.timer2 = setTimeout(() => {
        this.leftIndex = value.tradcoin + '/' + value.maincoin;
        localStorage.setItem('leftIndexCurrency', this.leftIndex);
        this.kObj = value;
        this.getCoinInfo(value);
        this.sendWsParams(value);
        this.$bus.$emit('tradingviewCur');
        this.count = 0;
        clearTimeout(this.timer2);
      }, 1000);
    },

    //行情导航栏点击事件
    checkNav(index) {
      localStorage.setItem('navIndex', index + '');
      if (index == null) {
        this.searchArr = [...this.$store.state.optionalArr];
      }
      this.index = index;
    },
    handdle(row) {
      let arr = this.$store.state.optionalArr.filter((item) => {
        return item.tradcoin === row.tradcoin && item.maincoin === row.maincoin;
      });
      let str =
        arr.length > 0
          ? 'message.currency.show.cancel'
          : 'message.currency.show.add';
      this.$store.commit('updataOptional', row);
      if (this.index === 'null') this.operator();
    },
    //自选
    operator() {
      this.searchArr = this.$store.state.optionalArr;
    },

    //过滤
    filters(trad, main) {
      return this.$store.state.optionalArr.some((item) => {
        return item.tradcoin === trad && item.maincoin == main;
      });
    },

    //行情数据
    detailsInfo() {
      if (this.$route.params.maincoin) {
        this.index = this.detailsArr.findIndex((item) => {
          return item == this.$route.params.maincoin;
        });
        this.searchArr = this.tableData.filter((item) => {
          return item.maincoin.toUpperCase() == this.detailsArr[this.index];
        });
        this.leftIndex = this.$route.params.tradcoin + '/' + this.$route.params.maincoin
        localStorage.setItem('leftIndexCurrency', this.leftIndex);
      } else {
        this.searchArr = this.tableData.filter((item) => {
          return item.maincoin.toUpperCase() == this.detailsArr[this.index];
        });
      }
      let data = this.searchArr.filter((item) => {
        return (item.tradcoin + '/' + item.maincoin) == this.leftIndex;
      });
      if (!data.length) {
        if (this.searchArr.length) {
          data = [this.searchArr[0]]
          this.leftIndex = this.searchArr[0].tradcoin + '/' + this.searchArr[0].maincoin
        }
      }
      if (!data.length) return;
      this.kObj = data[0];

      this.sendWsParams(data[0]);
      // //盘口数据
      this.getCoinInfo(data[0]);
    },

    /**
     * tofix  汇率计算
     * @param val  最新价格
     * @returns {*}  当前国家汇率后的价格
     */
    tofix(val) {
      if (!val) {
        return 0;
      }
      let lang = this.$store.state.lang;
      return (val * this.$store.state[lang]).toFixed(2);
    },
  },
  destroyed() {
    let _this = this;
    clearInterval(_this.timer);
    clearInterval(_this.timer2);
    clearInterval(_this.timer3);
    clearInterval(_this.timer4);
    // this.$bus.$off("passShow");
    // this.$bus.$off('currency');
    this.$bus.$off('tradingviewCur');
    this.$bus.$off('wsReload');
    // this.$bus.$off('passSuccess')
  },

  filters: {
    tofix(val) {
      return val.toFixed(2);
    },

    toFixed(val) {
      return val.toFixed(4);
    },
  },

  watch: {
    tableData(val) {
      if (val.length > 0 && this.detailsArr.length == 0) this.getMaincoinNav();
    },
    //搜索
    search(val) {
      let str = val.toLowerCase();
      this.searchArr = this.tableData.filter((item) => {
        return item.tradcoin.toLowerCase().indexOf(str) !== -1;
      });
    },
    queryCount(val, pre) {
      if (val < pre) {
        //委托单变少的时候更新余额
        let data = {
          maincoin: this.kObj.maincoin,
          tradcoin: this.kObj.tradcoin,
        };
        getAccount(data).then((res) => {
          if (res.code == '200') {
            this.balanceObj = res.data.balance;
          }
        });
      }
    }
  },
};
</script>
<style scoped lang="scss">
@media screen and (max-width: 1600px) {
  .main-right {
    width: 330px;
  }
}

@media screen and (min-width: 1600px) {
  .main-right {
    width: 665px;
  }
}

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

.main-box {
  width: 100%;
}

.main-center {
  flex: 1 1 auto;
  min-width: 600px;
  margin: 5px 5px 0 0;
}

.main-left {
  /* height: 100%; */
  flex: 0 0 auto;
}

.main-left {
  width: 300px;
  margin: 5px 5px 0 0;
}

.main-left-assets {
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}

.circle-icon {
  right: 20px;
  font-size: 20px;
  display: none;
}

/* 搜索 */
.search-ipt {
  height: 30px;
  width: 95%;
  margin: 0 auto;
  position: relative;
  border: thin solid $border;
  border-radius: 4px;
}

.ipt {
  width: 100%;
  padding-left: 5px;
  height: 100%;
  line-height: 25px;
  font-size: 12px;
  color: $whiteColor;
}

.el-icon-search {
  right: 10px;
  font-size: 14px;
}

/* 左边导航栏 */
.left-nav {
  width: 100%;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
}

.left-nav li,
.left-nav li div {
  padding: 0 5px;
}

.left-nav li:first-child,
.left-nav li:last-child div {
  display: inline-block;
  @include height(30px);
  text-align: center;
  margin-right: 5px;
}

// .left-nav li:last-child {
//   flex: 1;
// }
// .left-nav li:last-child div {
//   flex: 1;
// }
#active {
  background: $mainColor;
  color: #fff;
  border-radius: 5px;
}

.active {
  color: $mainColor;
}

#rightNav-title {
  font-size: 13px;
}

/* 币种 */
.info {
  width: 100%;

  &_nav {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
  }
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

.info ul li span {
  font-size: 12px;
}

/*无记录*/
.no-record {
  text-align: center;
}

.collection_pic {
  width: 15px;
  height: 15px;
}

/* 头部信息显示 */
.right-header {
  width: 100%;
  //height: 50px;
  padding: 6px 0;
  justify-content: flex-start;
}

.right-header li>div {
  padding: 0 5px;
  margin: 0 10px;
}

.trading {
  line-height: 38px;
}

.check-pic {
  width: 12px;
  height: 6px;
  margin-left: 5px;
  vertical-align: middle;
  display: none;
  transition: all 0.2s;
}

.check-show-pic {
  transform: rotate(180deg);
  transition: all 0.2s;
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

/*分页*/
.page {
  width: 200px;
  height: 80px;
}

.page span {
  display: block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  margin: auto 0;
  text-align: center;
  border-radius: 2px;
}

/*中间部分*/
/*tradingview*/
#tradingview {
  height: 530px;
  margin: 5px 0 0;
}

.main-entrust {
  margin: 5px 0 0;
  flex: 1;

  &-radio {
    height: 40px;
    line-height: 40px;
    justify-content: flex-start;

    span {
      position: relative;
      transition: ease-in 0.2s;
    }

    span:last-child {
      margin-left: 20px;
    }
  }

  &-buy {
    height: calc(100% - 40px);
  }
}

::v-deep .el-input__inner {
  color: var(--title-color) !important;
  &:focus{
    border-color:var(--mian-bgColor) !important;
  }
}

/* 委托 */
.main-table li {
  margin-top: 5px;
}

// 右边挂单数据
.main-right {
  flex: 0 0 auto;
  position: relative;
  margin: 5px 0 0;
}
</style>
