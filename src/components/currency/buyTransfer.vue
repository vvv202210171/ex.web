<template>
  <ul class="buy allFlex">
    <!-- 价格 -->
    <li class="set_ipt allFlex">
      <span class="proText">{{ $t('message.currency.form.price') }}</span>
      <el-input
        type="number"
        v-model="price"
        :placeholder="$t('message.currency.buyPrice')"
        class="proText f1"
        v-if="+index == 1"
      />
      <span class="proText set-newprice f1" v-else>{{
        $t('message.currency.newpriceText')
      }}</span>
      <span class="proText">{{ titleObj.maincoin }}</span>
    </li>

    <!-- 数量 -->
    <li class="set_ipt allFlex">
      <span class="proText">{{ $t('message.currency.form.quantity') }}</span>
      <el-input
        type="number"
        v-model="number"
        :placeholder="$t('message.currency.buyNum')"
        class="proText f1"
        @focus="numberFocus = !numberFocus"
        @blur="numberFocus = !numberFocus"
      />
      <span class="proText">{{ titleObj.tradcoin }}</span>
    </li>

    <!-- 比例 -->
    <li class="right-slider padding">
      <el-slider
        v-model="slider1"
        :marks="marks"
      ></el-slider>
    </li>

    <!-- 成交额 -->
    <li class="balance">
      <div>
        <span class="proText">{{ $t('message.currency.turnover') }}</span>

        <span class="proColor scale Medium">
          {{ Bturnover }}
          <span class="item-value-unit">{{ titleObj.maincoin }}</span>
        </span>
      </div>

      <div>
        <span class="proText">{{ $t('Certain.open') }}</span>
        <span class="proColor"
          >{{ balanceObj.mainusable }} {{ titleObj.maincoin }}</span
        >
      </div>
      <!-- <span class="proText scale">≈{{Bturnover}}CNY</span> -->
    </li>

    <!-- 按钮 -->
    <li v-if="login" class="buy-btn Wcolor">
      <el-button type="primary" @click="trading('1')">{{
        $t('message.currency.buyNow')
      }}</el-button>
    </li>

    <!-- 未登录 -->
    <li class="buy-btn_noLogin buy-btn mainColor btnBg" v-else>
      <router-link to="/login" tag="span" class="hand">{{
        $t('Login.titleArr.login')
      }}</router-link>
      <span class="proColor" style="margin: 0 10px">/</span>
      <router-link to="/register/0" tag="span" class="hand">{{
        $t('Login.titleArr.register')
      }}</router-link>
    </li>
  </ul>
</template>

<script>
import { buyLimitFn, buyMarketFn } from '@/api/Currency';
export default {
  data() {
    return {
      number: '',
      focusIndex: 0,
      Bturnover: 0,
      rightTradtype: 0,
      leftTradtype: 0,
      slider2: '',
      step: 20,
      price: '',
      password: '',
      slider1: 0,
      numberFocus: false,
      marks: {
        0: {
          style: {
            fontSize: '10px',
          },
          label: '0%',
        },
        20: {
          style: {
            fontSize: '10px',
          },
          label: '20%',
        },
        40: {
          style: {
            fontSize: '10px',
          },
          label: '40%',
        },
        60: {
          style: {
            fontSize: '10px',
          },
          label: '60%',
        },
        80: {
          style: {
            fontSize: '10px',
          },
          label: '80%',
        },
        100: {
          style: {
            fontSize: '10px',
          },
          label: '100%',
        },
      },
    };
  },
  props: {
    titleObj: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
    balanceObj: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    login() {
      return localStorage.getItem('token');
    },
    setPassword() {
      return this.$store.state.accountInfo.tradpassword !== 0;
    },
  },
  watch: {
    price(val) {
      this.Bturnover = (val * this.number).toFixed(2);
    },
    number(val) {
      if (this.numberFocus) {
        let price = this.index == 0 ? this.titleObj.price : this.price;
        this.Bturnover = (val * price).toFixed(2);
      }
    },
    slider1(val) {
      let price = this.index == 0 ? this.titleObj.price : this.price;
      if (val !== 0) {
        if (val == 100) {
          this.number = (this.balanceObj.mainusable / price).toFixed(4);
          this.Bturnover = this.balanceObj.mainusable;
        } else {
          let num = val / 100;
          this.Bturnover = (this.balanceObj.mainusable * num).toFixed(4);
          let num2 =
            this.Bturnover / price === ''
              ? ''
              : (this.Bturnover / price).toFixed(5);
          this.number = num2 === '' ? '' : num2;
        }
      } else {
        this.number = '';
        this.Bturnover = 0;
      }
    },
  },
  methods: {
    tradingFn() {
      // let password = bool ? this.password : '';

      let _this = this;

      //请求参数
      let obj = {
        maincoin: this.titleObj.maincoin,
        tradcoin: this.titleObj.tradcoin,
        number: this.number,
      };

      if (this.index == 0) {
        buyMarketFn(obj).then((res) => {
          if (res.code == '200') {
            this.number = '';
            this.$message.success(res.msg);
            this.price = '';
            this.Bturnover = 0;
            this.$emit('updataBalance');
          }
        });
      } else {
        obj.price = this.price;
        buyLimitFn(obj).then((res) => {
          if (res.code == '200') {
            this.$message.success(res.msg);
            this.$emit('updataBalance');
            this.number = '';
            this.price = '';
            this.Bturnover = 0;
          }
        });
      }
    },
    trading(val) {
      let _this = this;
      this.type = val;
      let login = this.$store.state.login;
      let price = this.index == 0 ? this.titleObj.price : this.price;
      if (!login || login === 'false') {
        this.$router.push('/login');
        return;
      }

      if (price === '' || price <= 0) {
        this.show(_this.$t('message.currency.show.price'));
        return;
      }

      if (this.number === '' || +this.number <= 0) {
        this.show(_this.$t('message.currency.show.number'));
        return;
      }

      if (+this.number < +this.titleObj.minnumber) {
        this.show(_this.$t('alert.min', { num: this.titleObj.minnumber }));
        return;
      }
      if (+this.balanceObj.mainusable < +this.Bturnover) {
        this.$message.warning(this.$t('Assets.transferDialog.alert2'));
        return;
      }
      this.tradingFn();
      //显示密码框
      // this.setPassword ? this.tradingFn(false) : this.open();
    },
    //提示
    show(str, type) {
      this.$message({
        showClose: true,
        message: str,
        type: type || 'info',
      });
    },
    open() {
      let _this = this;

      this.$confirm(
        _this.$t('message.currency.open.title'),
        _this.$t('message.currency.open.prompt'),
        {
          confirmButtonText: _this.$t('message.currency.open.rightBtn'),
          cancelButtonText: _this.$t('message.currency.open.leftBtn'),
        }
      ).then(() => {
        let data = JSON.parse(localStorage.getItem('accountinfo'));
        let obj = {
          name: data.name,
          area: data.area,
          type: data.tradpassword,
        };

        this.$router.replace({
          path: '/TransactionPassword',
          query: obj,
        });
      });
    },
  },
  created() {
    this.$bus.$on('currencyBuy', (val) => {
      this.password = val;
      this.tradingFn(true);
    });
    this.$bus.$on('toBuy', (val) => {
      this.price = val.price;
      this.number = val.quantity;
    });
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/css/transfer.scss';
</style>
