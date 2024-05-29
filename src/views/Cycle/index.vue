<template>
  <!--<div class="container currencyBox">-->
  <!--<app-header></app-header>-->
  <div class="main navBg">
    <div class="allFlex main-box">
      <div class="main-box_left">
        <div class="allFlex">
          <!-- 侧边栏 -->
          <div class="main-left boxBg" :class="LShow ? `leftShow` : `leftHide`">
            <div class="left-nav font-Six navColor listBg allFlex">
              {{ $t('Target.detailsTitle') }}
              <li class="navColor endFlex" style="flex: 1">
                <span>( 24H )</span>
              </li>
            </div>

            <div class="info">
              <div class="allFlex">
                <span
                  v-for="(item, key) in rightNav"
                  :key="key"
                  class="navColor font-Four"
                  >{{ $t(item) }}</span
                >
              </div>
              <vue-scroll :ops="ops" style="height: 500px">
                <ul>
                  <li
                    v-for="(item, key) in dataInfo"
                    :key="key"
                    class="allFlex hand"
                    :class="key == leftIndex && 'navli'"
                    @click.stop="leftShow(key)"
                  >
                    <div style="width: 33.5%">
                      <span
                        :class="item.disable !== 'disable' ? `` : 'navColor'"
                        class="Medium titleColor font-Four"
                      >
                        {{ item.tradcoin }}</span
                      >
                      <span class="navColor font-Two center f1">/USDT</span>
                    </div>
                    <span
                      class="navColor font-Two"
                      style="textalign: right; width: 23%"
                      >{{ item.price }}</span
                    >
                    <span
                      :class="
                        item.rise && item.rise.indexOf('-') === -1
                          ? 'greenColor'
                          : 'redColor'
                      "
                      class="font-Two right f1"
                      >{{ item.rise.indexOf('-') === -1 ? '+' : ''
                      }}{{ item.rise }}%</span
                    >
                  </li>
                </ul>
              </vue-scroll>
            </div>
            <img
              src="@ContractImg/left-icon.png"
              alt=""
              v-if="LShow"
              @click="LShow = !LShow"
              class="centerAll left-icon hand"
            />
            <img
              src="@ContractImg/right-icon.png"
              alt=""
              v-else
              @click="LShow = !LShow"
              class="centerAll right-icon hand"
            />
          </div>

          <!--中间部分 k线-->
          <div class="main-center allFlex column boxBg">
            <!-- 币种详情 -->
            <ul class="right-header allFlex kTitle">
              <li class="allFlex">
                <el-dropdown szie="mini" @command="leftShow">
                  <div class="trading el-dropdown-link hand">
                    <span class="font-Six Semibold mainColor">{{
                      titleObj.tradcoin
                    }}</span>

                    <span class="font-Six proFont mainColor"
                      >/{{ titleObj.maincoin }}</span
                    >
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      :command="key"
                      v-for="(item, key) in dataInfo"
                      :key="'nav' + key"
                      >{{ item.tradcoin }}/{{ item.maincoin }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>

                <div class="allFlex column">
                  <span
                    :class="
                      titleObj.rise && titleObj.rise.indexOf('-') >= 0
                        ? 'redColor'
                        : 'greenColor'
                    "
                    class="right-header-price Medium font-Six"
                    >{{ titleObj.price }} USD</span
                  >

                  <span
                    class="item-value"
                    :class="
                      titleObj.rise && titleObj.rise.indexOf('-') >= 0
                        ? 'redColor'
                        : 'greenColor'
                    "
                    >{{ titleObj.rise }}%</span
                  >
                </div>
              </li>

              <!-- 最高 -->
              <li class="allFlex">
                <div class="allFlex column">
                  <span class="coinNav">{{ $t('message.k.high') }}</span>

                  <span class="item-value navColor">
                    {{ titleObj.height }}
                    <span class="item-value-unit">{{ titleObj.maincoin }}</span>
                  </span>
                </div>

                <!-- 最低 -->
                <div class="allFlex column">
                  <span class="coinNav">{{ $t('message.k.row') }}</span>

                  <span class="item-value navColor">
                    {{ titleObj.low }}
                    <span class="item-value-unit">{{ titleObj.maincoin }}</span>
                  </span>
                </div>

                <!-- 交易量 -->
                <div class="allFlex column">
                  <span class="coinNav">{{ $t('message.k.vol') }}</span>

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
          </div>
        </div>

        <!-- 记录 -->
        <div class="main-table">
          <table-record
            :positionData="entrustData"
            :historyPositon="historyData"
            :page="page"
            @tableCheck="tableCheck"
            @pageChange="pageChange"
            @check="check"
            :total="queryCount"
          ></table-record>
        </div>
      </div>
      <!-- 右边登记 -->
      <div class="main-right DarkBg">
        <buy-form :kObj="kObj" @updata="query"></buy-form>
        <right-info :titleObj="kObj"></right-info>
      </div>
    </div>

    <!-- <contract-alert
      :obj="alertObj"
      @hide="dialogShow = false"
      :dialogShow="dialogShow"
    ></contract-alert> -->
  </div>
</template>

<script>
import {
  queryFn,
  getHistory,
  closePosition,
  profitLoss,
  getOrder,
  getCycle,
  getInfo,
} from '@/api/Cycle';
import Mixin from '@/Mixin';
import { mapState } from 'vuex';
export default {
  name: '',
  data() {
    return {
      rightNav: ['Target.nav.one', 'Target.nav.two', 'Target.nav.three'],
      detailsArr: ['USDT', 'BTC', 'ETH'],
      leftIndex: localStorage.getItem('leftIndexCycle') || 0,
      historyData: [],
      entrustData: [],
      timer: null,
      timer2: null,
      timer3: null,
      type: 0,
      queryCount: 0,
      page: 1,
      LShow: true,
      alertObj: {
        title: 'Header.navArr.cycle',
        maincoin: '',
        tradcoin: '',
        lever: '',
        price: '',
        type: 2,
        number: '',
      },
      dialogShow: false,
      hasDown: false,
      autoid: false,
      loadingShow: false,
      loadingOption: {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
      },
      count: 0,
      kObj: {},
    };
  },
  mixins: [Mixin],
  components: {
    tableRecord(resolve) {
      require(['./tableRecord'], resolve);
    },
    buyForm(resolve) {
      require(['./buyForm.vue'], resolve);
    },
    rightInfo(resolve) {
      require(['@/components/contract/rightInfo.vue'], resolve);
    },
  },
  computed: {
    ...mapState({
      dataInfo: (state) => state.cycleSymbol,
      titleObj: (state) => state.cycle.info,
    }),
  },
  created() {
    this.dataInfo.length > 0 && this.detailsInfo();
    // localStorage.setItem('tradingview.resolution', 15);
    sessionStorage.setItem('index', 2);
    //拉去挂单数据
    this.$bus.$on('wsReload',()=>{
      this.leftShow(this.leftIndex)
    })
  },
  mounted() {},

  methods: {
    //历史记录点击
    check(row) {
      this.alertObj.maincoin = row.maincoin;
      this.alertObj.tradcoin = row.tradcoin;
      this.alertObj.lever = row.lever;
      this.alertObj.price = row.price;
      this.alertObj.number = row.income;
      this.dialogShow = true;
    },
    getInfo() {
      const data = {
        maincoin: this.kObj.maincoin,
        tradcoin: this.kObj.tradcoin,
      };
      getCycle(data)
        .then((res) => {
          if (res.code == '200') {
            const data = {
              cycleinfo: res.data.info,
              updata: true,
            };
            this.loadingShow && this.loadingShow.close();
            this.$store.commit('updataCycle', data);
          }
        })
        .catch(() => {
          this.loadingShow && this.loadingShow.close();
        });
    },
    getOrders() {
      let data = {
        tradcoin: this.kObj.tradcoin,
        maincoin: this.kObj.maincoin,
      };
      getOrder(data)
        .then((res) => {
          if (res.code == '200') {
            const data = {
              cycletop: res.data,
              updata: true,
            };
            this.loadingShow && this.loadingShow.close();
            this.$store.commit('updataCycle', data);
          }
        })
        .catch(() => {
          this.loadingShow && this.loadingShow.close();
        });
    },
    tableCheck(index, num) {
      if (num) {
        this.autoid = num;
        this.hasDown = this.entrustData.some((item) => {
          return item.autoid == num;
        });
        this.entrustData = this.entrustData.filter((item) => {
          return item.autoid !== num;
        });
        this.query();
        this.timer2 = setTimeout(()=>{
          this.$bus.$emit('cycleRefreshBalance');
        },5000)
      } else {
        index == 0 ? this.query() : this.hisRecord();
      }
    },
    //记录分页
    pageChange(page, index) {
      this.page = page;
      this.hisRecord();
    },
    sendWsParams(coinData) {
      if (this.$ws && this.$ws.readyState == 1) {
        let selectedParams = localStorage.getItem('selectedParams');
        let minutes = selectedParams ? selectedParams.slice(selectedParams.lastIndexOf('_') + 1) : 1;
        localStorage.setItem('selectedParams', `${coinData.maincoin}_${coinData.tradcoin}_cycle_${minutes}`);
        //通知 ws 更新币种数据
        this.$ws.send(`${coinData.maincoin}_${coinData.tradcoin}_cycle_${minutes}`);
      } else {
        //如果ws没准备好  0.5s后再试
       this.timer3 = setTimeout(() => {
          //通知 ws 更新币种数据
          this.sendWsParams(coinData);
          clearTimeout(this.timer3)
        }, 500);
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

    //历史挂单记录
    hisRecord() {
      let _this = this;

      //参数
      let data = {
        page: this.page,
        limit: 10,
      };

      //请求
      getHistory(data).then((res) => {
        if (res.code == '200') {
          this.queryCount = res.count;
          this.historyData = res.data;
        }
      });
    },

    //查询当前挂单
    query() {
      //请求
      queryFn().then((res) => {
        if (res.code == '200') {
          if (this.hasDown) {
            this.hasDown = res.data.some((item) => {
              return item.autoid == this.autoid;
            });
            this.entrustData = res.data.filter((item) => {
              return item.autoid !== this.autoid;
            });
          } else {
            this.entrustData = res.data;
          }
        }
      });
    },

    //行情数据点击事件
    leftShow(index) {
      if (this.count == 3) return;
      this.count = 3;
      let _this = this;
      this.timer = setTimeout(() => {
        let value = this.dataInfo[index];
        if (value.state == 'disable') return;
        this.leftIndex = index;
        localStorage.setItem('leftIndexCycle', this.leftIndex);
        this.kObj = value;
        this.loadingShow = this.$loading(_this.loadingOption);
        this.getInfo();
        this.sendWsParams(value);
        this.getOrders();
        this.$bus.$emit('tradingviewCy');
        this.count = 0;
        clearTimeout(this.timer);
      }, 1000);
    },

    //行情数据
    detailsInfo() {
      //带参过来
      // if (this.$route.query.maincoin) {
      //   this.leftIndex = this.dataInfo.findIndex((item) => {
      //     return item.tradcoin == this.$route.query.tradcoin;
      //   });
      // localStorage.setItem('leftIndexCycle', this.leftIndex);
      // }

      const data = this.dataInfo[this.leftIndex];
      if(!data) return;
      this.kObj = data;
      this.sendWsParams(data);
      this.getInfo();
      this.getOrders();
      if (localStorage.getItem('token')) {
        //当前委托记录
        this.query();
        this.hisRecord();
      }
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
  watch: {
    hasDown(val) {
      if (!val) {
        this.autoid = val;
      }
    },
    dataInfo(val) {
      if (val.length > 0 && !this.kObj.maincoin) {
        this.detailsInfo();
      }
    }
  },
  destroyed() {
    let _this = this;
    clearInterval(_this.timer);
    clearInterval(_this.timer2);
    clearInterval(_this.timer3);
    this.$bus.$off('currency');
    this.$bus.$off('tradingviewCy');
    this.$bus.$off('wsReload');
  },

  filters: {
    tofix(val) {
      return val.toFixed(2);
    },

    toFixed(val) {
      return val.toFixed(4);
    },
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
    width: 400px;
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
.main-box_left {
  flex: 1 1 auto;
  //  margin: 5px 5px 0 0;
}

.main-center {
  flex: 1 1 auto;
  min-width: 600px;
  margin: 5px 5px 0 0;
  z-index: 99;
}
.main-left {
  /* height: 100%; */
  flex: 0 0 auto;
  position: relative;

  .left-icon,
  .right-icon {
    transition: opacity 0.5s;
    z-index: 990;
  }
  .left-icon {
    right: 0;
    opacity: 0;
  }
  .right-icon {
    right: -19px;
  }
}
.leftShow {
  width: 300px;
  &:hover {
    .left-icon {
      opacity: 1;
    }
  }
}
.leftHide {
  width: 0;
  &:hover {
    .right-icon {
      opacity: 1;
    }
  }
}
.main-left {
  // width: 300px;
  div {
    overflow: hidden;
  }
  margin: 5px 5px 0 0;
  transition: width 0.2s;
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
  border: thin solid $lightBlue;
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
  @include height(50px);
  padding: 0 10px;
}
#active {
  background: $blueColor;
  color: $whiteColor;
  border-radius: 5px;
}
.active {
  color: $blueColor;
}
#rightNav-title {
  font-size: 13px;
}
/* 币种 */
.info {
  width: 100%;
}
.info > div {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
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

/*无记录*/
.no-record {
  text-align: center;
}

.collection_pic {
  width: 15px;
  height: 15px;
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

/* 委托 */
.main-table {
  margin: 5px 5px 0 0;
}

// 右边挂单数据
.main-right {
  flex: 0 0 auto;
  position: relative;
  margin: 5px 0 0;
  height: 892px;
}

/* 头部信息显示 */
.right-header {
  width: 100%;
  //height: 50px;
  padding: 6px 0;
  justify-content: flex-start;
}
.right-header li > div {
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

.modify,
.horizontal,
.bond {
  width: 90%;
  margin: 20px auto;
}
.modify li {
  width: 45%;
  height: 80px;
}
.modify-ipt {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: $whiteColor;
  border-radius: 5px;
  margin-top: 10px;
}
.horizontal {
  height: 80px;
}
</style>
