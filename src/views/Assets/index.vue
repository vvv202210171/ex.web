<template>
  <div class="assets navBg">
    <!-- header -->
    <div class="boxBg">
      <div class="cen allFlex itCenter assets-header">
        <!--        总资产折合-->
        <el-card class="box-card" v-loading="balanceObj.usdt == undefined">
          <div slot="header" class="clearfix">
            <span>{{ $t('Assets.assets') }}</span>
          </div>
          <div class="text item">
            <span class="titleColor font-Th Bold assets-header_number">{{ balanceObj.usdt }}USDT
            </span>
            <p class="navColor font-Six">≈ {{ usdRate.symbol }}{{ Number(balanceObj.usdt * usdRate.price).toFixed(4) }}
            </p>
          </div>
        </el-card>


        <!--        今日收益-->
        <el-card class="box-card" v-loading="earnings.todayEarnings == undefined">
          <div slot="header" class="clearfix">
            <span>{{ $t('Assets.todayEarnings') }}</span>
          </div>
          <div class="text item">
            <span class="titleColor font-Th Bold assets-header_number">{{ earnings.todayEarnings }}USDT
            </span>
          </div>
        </el-card>

        <!--        总收益-->
        <el-card class="box-card" v-loading="earnings.accountEarnings == undefined">
          <div slot="header" class="clearfix">
            <span>{{ $t('Assets.accountEarnings') }}</span>
          </div>
          <div class="text item">
            <span class="titleColor font-Th Bold assets-header_number">{{ earnings.accountEarnings }}USDT
            </span>
          </div>
        </el-card>

        <!-- 划转 -->
        <div class="btnWarp">
          <el-button type="primary" @click="toChargeBefo" plain>{{
          $t('Assets.charge')
        }}</el-button>
          <el-button type="primary" @click="pushPath('/mention')" plain>{{
          $t('Assets.mention')
        }}</el-button>
          <el-button type="primary" @click="toTransfer" plain>{{
          $t('Assets.transfer')
        }}</el-button>
        </div>
      </div>
    </div>

    <!-- list data -->
    <div class="boxBg assets-main">
      <div class="cen">
        <!-- 导航，币币， 合约， 明细 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="changeMenu">
          <el-menu-item v-for="(item, key) in navArr" :key="'nav' + key" :index="key + ''">{{ $t(item) }}</el-menu-item>
          <div class="centerAll startFlex search-box itCenter" v-if="activeIndex !== '2'">
            <el-checkbox v-model="checked">{{ $t('Assets.text') }}</el-checkbox>
            <el-input v-model="searchCoin" class="marginTen" :placeholder="$t('Assets.search')">
              <img slot="suffix" v-if="searchCoin == ''" src="@HomeImg/search-grey.png" class="search_icon" />
              <img v-else slot="suffix" src="@HomeImg/search-green.png" class="search_icon" />
            </el-input>
          </div>
        </el-menu>

        <!-- 资产 -->
        <ul class="assets-main_header centerFlex column" v-if="activeIndex < 2">
          <li class="navColor">
            {{
          activeIndex == 0 ? $t('Assets.nav.ten') : $t('Assets.nav.eleven')
        }}
          </li>
          <li>
            <span class="titleColor font-Tf Bold">{{ activeIndex == 0 ? currencyObj.usdt : contractObj.usdt }}USDT
            </span>
            <span class="navColor font-Six">
              ≈ {{ usdRate.symbol
              }}{{
          activeIndex == 0
            ? Number(currencyObj.usdt * usdRate.price).toFixed(4)
            : Number(contractObj.usdt * usdRate.price).toFixed(4)
        }}</span>
          </li>
        </ul>

        <!-- 数据 -->
        <div v-if="activeIndex < 2">
          <table-data :tableData="dataArr" :index="activeIndex"></table-data>
        </div>

        <!--  明细 -->
        <div v-else>
          <list-data :searchVal="searchCoin"> </list-data>
        </div>
      </div>
    </div>

    <!-- 弹出框 -->
    <el-dialog :title="$t('Assets.transferDialog.title')" :visible.sync="dialog" width="400px" custom-class="dialogBox">
      <transfer-alert :currCoin="currCoin" :conCoin="conCoin" :dialog="dialog"
        @transferSubmit="transferFn"></transfer-alert>
    </el-dialog>

    <!-- 提币地址 -->
    <el-dialog :title="$t('Assets.mentionAddress.title')" :visible.sync="$store.state.addressShow" width="400px"
      custom-class="dialogBox">
      <change-address v-if="!toAdd"></change-address>
      <add-address v-else :show="$store.state.addressShow" @hide="hide" @AddAddress="AddAddress"></add-address>
    </el-dialog>
  </div>
</template>

<script>
import Mixin from '@/Mixin';
import {
  getList,
  getContractList,
  transfer,
  getAllAssets,
  mentionList,
  addMention, getEarnings,
} from '@/api/Assets';
import { getChargeType } from "@/api/Account";
import { mapState } from 'vuex';
import de from "@/i18n/lang/de";


export default {
  data() {
    return {
      activeIndex: '0',
      navArr: ['Assets.title1', 'Assets.title2', 'Assets.nav.two'],
      balanceObj: {},
      earnings: {},
      dataArr: [],
      checked: false,
      searchCoin: '',
      currCoin: [],
      conCoin: [],
      currencyObj: {},
      contractObj: {},
      dialog: false,
      addressArr: [],
      mentionAddress: '',
      toAdd: false,
    };
  },
  mixins: [Mixin],
  created() {
    if (this.$route.query.activeIndex) {
      this.activeIndex = this.$route.query.activeIndex;
    }
    this.init();
    this.$store.dispatch('getAllCoins');
    this.$bus.$on('addAddress', () => {
      this.toAdd = true;
      // this.$store.commit('showAddress', false);
    });
  },
  watch: {
    queryIndex(val) {
      this.activeIndex = val;
    },
    activeIndex(val) {
      this.dataArr = val == '0' ? this.currCoin : this.conCoin;
    },
    checked(val) {
      if (val) {
        this.dataArr = this.dataArr.filter((item) => item.usable > 0);
      } else {
        this.dataArr = val == '0' ? this.currCoin : this.conCoin;
      }
    },
    searchCoin(val) {
      if (val !== '') {
        let coinArr = this.activeIndex == '0' ? this.currCoin : this.conCoin;
        let str = val.toLowerCase();
        this.dataArr = coinArr.filter(
          (item) => item.coin.toLowerCase().indexOf(str) >= 0
        );
      } else {
        this.dataArr = this.activeIndex == '0' ? this.currCoin : this.conCoin;
      }
    },
  },

  components: {
    tableData(resolve) {
      return require(['./tableData'], resolve);
    },
    listData(resolve) {
      return require(['./listData'], resolve);
    },
    transferAlert(resolve) {
      return require(['./transferAlert'], resolve);
    },
    changeAddress(resolve) {
      return require(['./changeAddress'], resolve);
    },
    addAddress(resolve) {
      return require(['@/components/My/addAddress'], resolve);
    },
  },

  computed: {
    ...mapState({
      usdRate: (state) => state.usdRate,
    }),
    queryIndex() {
      return this.$route.query.activeIndex;
    },
  },

  mounted() {
    this.$store.state.mentionAddress.length == 0 && this.getAllAddress(false);
  },
  methods: {
    toChargeBefo() {
      getChargeType().then((res) => {
        if (res.code == '200') {
          if (res.data === 'SM') {
            this.pushPath('/charge')
          } else {
            this.$alert(this.$t('Assets.CustomerService'), this.$t('Assets.mentionBox.tips.one'), {
              confirmButtonText: this.$t('Assets.comfirm'),
              callback: () => {
                window.LC_API?.open_chat_window?.()
              }
            });
          }
        }
      });
    },
    toTransfer() {
      if (this.$store.state.accountInfo.tradpasswordstate == 'false') {
        this.open();
        return;
      }
      this.dialog = true;
    },
    AddAddress(data) {
      addMention(data).then((res) => {
        if (res.code == '200') {
          this.getAllAddress(true);
          this.$message.success(res.msg);
        } else {
          this.$message(res.msg);
        }
      });
    },
    hide() {
      this.$store.commit('showAddress', false);
    },
    changeAddress(address) {
      this.mentionAddress = address;
    },
    getAllAddress(bool) {
      mentionList().then((res) => {
        if (res.code == '200') {
          this.$store.commit('updataMentionList', res.data);
          if (bool) {
            this.toAdd = false;
          }
        }
      });
    },
    transferFn(number, coin, type, password) {
      let data = {
        type: type,
        coin: coin,
        number: number,
        tradpassword: password,
      };
      transfer(data).then((res) => {
        if (res.code == '200') {
          let timer = setTimeout(() => {
            this.init();
            clearTimeout(timer);
          }, 1500);
          this.dialog = false;
          this.$message.success(res.msg);
        } else {
          this.$message(res.msg);
        }
      });
    },

    init() {
      getList().then((res) => {
        let data = { ...res.data }
        if (data.assets_amount) {
          data.assets_amount.usdt = Math.max(data.assets_amount.usdt, 0)
          data.assets_amount.cny = Math.max(data.assets_amount.cny, 0)
        }
        data.assets.map((item) => {
          item.usable = Math.max(item.usable, 0)
        })
        this.currencyObj = data.assets_amount || {};

        this.currCoin = data.assets;
        this.dataArr = this.currCoin;
      });
      getContractList().then((res) => {
        let data = { ...res.data }
        if (data.contract_assets_amount) {
          data.contract_assets_amount.cny = Math.max(data.contract_assets_amount.cny, 0)
          data.contract_assets_amount.usdt = Math.max(data.contract_assets_amount.usdt, 0)
        }
        if (data.contract_assets?.length) {
          data.contract_assets.map((item) => {
            item.usable = Math.max(item.usable, 0)
          })
        }
        this.contractObj = data.contract_assets_amount;
        this.conCoin = data.contract_assets;
      });

      getAllAssets().then((res) => {
        if (res.code == '200') {
          let data = { ...res.data }
          data.cny = Math.max(data.cny, 0)
          data.usdt = Math.max(data.usdt, 0)
          this.balanceObj = data;
        }
      });
      getEarnings().then((res) => {
        if (res.code == '200') {
          let data = { ...res.data }
          this.earnings = data;
        }
      });
    },
    changeMenu(index) {
      this.activeIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.assets {
  min-height: 1000px;
  height: 100%;
}

.assets-header {
  min-height: 130px;

  &_number {
    line-height: 60px;
  }

  .el-card {
    background-color: var(--index-bgColor);
    color: var(--title-color);
    border: 1px solid var(--border-color);

    ::v-deep .el-card__header {
      border-bottom: 1px solid var(--border-color) !important;
    }
  }

  .btnWarp {
    button {
      background-color: var(--button-bgColor);
      color: var(--mian-bgColor);
      border: 1px solid var(--mian-bgColor);

      &:hover {
        background-color: var(--mian-bgColor);
        color: var(--index-bgColor);
      }
    }
  }
}

.assets-main {
  margin-top: 10px;
  min-height: 870px;
  padding: 20px 0;

  &_header {
    height: 90px;
  }

  .el-menu {
    background-color: var(--index-bgColor);

    .el-menu-item {
      color: var(--title-color);
    }

    ::v-deep .el-checkbox {
      color: var(--title-color);

      .el-checkbox__inner:hover {
        border-color: var(--mian-bgColor);
      }

      .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: var(--mian-bgColor);
        border-color: var(--mian-bgColor);
      }

      .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: var(--mian-bgColor);
      }

      .el-checkbox__input.is-checked+.el-checkbox__label {
        color: var(--mian-bgColor);
      }
    }

    ::v-deep .el-input__inner {
      border-color: var(--border-color);
      &:focus {
        border-color: var(--mian-bgColor);
      }
    }
  }

  .el-menu.el-menu--horizontal>.el-menu-item:hover {
    background-color: var(--border-color);
  }

  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom-color: var(--mian-bgColor);
  }

  .el-menu.el-menu--horizontal>.el-menu-item:focus {
    background-color: var(--border-color);
  }
}

.search_icon {
  width: 15px;
  height: 15px;
}

.search-box {
  right: 0;
  outline: none;

  .el-input {
    height: 30px;
    line-height: 30px;
  }
}

.el-menu-demo ::v-deep .el-menu-item {
  color: $navColor;

  &:hover {
    color: $mainColor !important;
  }

  &.is-active {
    color: $mainColor !important;
  }
}

.box-card {
  margin: 20px 0;
  min-width: 320px;
  min-height: 180px;
}

.btnWarp {
  //display: flex;
  margin-left: 10px;

  ::v-deep(.el-button) {
    margin-bottom: 10px;

    &:first-child {
      margin-left: 10px;
    }
  }
}

::v-deep .el-button:hover {
  color: var(--title-color);
  background-color: var(--button-hoverColor);
  border-color: var(--mian-bgColor);
}

::v-deep .el-input__inner {
  color: var(--title-color);
}
</style>
