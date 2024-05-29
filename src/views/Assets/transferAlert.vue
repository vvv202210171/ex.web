<template>
  <div class="transferAlert">
    <ul class="transferAlert-ul">
      <!-- 账户 -->
      <li class="allFlex itCenter account">
        <el-button type="primary">{{
          index == 0 ? $t('Assets.title1') : $t('Assets.title2')
        }}</el-button>
        <img
          src="@ContractImg/exchange-icon.png"
          alt=""
          class="exchange-icon hand"
          @click="index = index == 0 ? 1 : 0"
        />
        <el-button type="">{{
          index == 1 ? $t('Assets.title1') : $t('Assets.title2')
        }}</el-button>
      </li>

      <!-- 币种 -->
      <li class="li allFlex itCenter">
        <span class="label">{{ $t('Assets.table.six') }}</span>
        <el-select v-model="coin" class="f1">
          <el-option
            v-for="(item, key) in dataArr"
            :key="key"
            :label="item.coin"
            :value="item.coin"
          ></el-option>
        </el-select>
      </li>

      <!-- 余额 -->
      <li class="balance">
        {{ $t('Assets.transferDialog.hasChange') }}
        <span>{{ coinObj.usable || '--' }}</span>
        <span class="marginTen">{{ coin }}</span>
      </li>

      <!-- 数量 -->
      <li class="li allFlex itCenter">
        <el-input
            v-model="number"
            type="number"
            class="f1 titleColor"
            :placeholder="$t('Assets.transferDialog.alert1')"
        >
          <div slot="suffix">
            <span
                class="mainColor marginTen hand"
                @click="number = coinObj.usable"
            >{{ $t('Assets.transferDialog.all') }}</span
            >
          </div>
        </el-input>
      </li>
      <!-- 密码 -->
      <li class="li allFlex itCenter">
        <el-input
          v-model="password"
          class="f1"
          type="password"
          show-password
          autocomplete="new-password"
          :placeholder="$t('Assets.placeholder3')"
        />
      </li>
      <li class="btn">
        <el-button
          type="primary"
          :disabled="number <= 0 || password.length == 0"
          @click="submit"
          >{{ $t('Assets.transferDialog.btn') }}</el-button
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { getBalance } from '@/api/Cycle';
import { getCoinBalance } from '@/api/Assets';
export default {
  data() {
    return {
      index: 0,
      coin: '',
      usableObj: {
        contract: 0,
        currency: 0,
      },
      password: '',
      number: '',
      coinObj: {
        usable: 0,
      },
    };
  },
  props: {
    currCoin: {
      type: Array,
      default: () => [],
    },
    conCoin: {
      type: Array,
      default: () => [],
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  components: {},

  computed: {
    dataArr() {
      return this.currCoin.length > this.conCoin.length
        ? this.conCoin
        : this.currCoin;
    },
    assetsArr() {
      return this.index === 0 ? this.currCoin : this.conCoin;
    },
    // coinObj() {
    //   let arr = this.dataArr.filter((item) => {
    //     item.coin == this.coin;
    //   });
    //   return arr[0] || {};
    // },
  },
  watch: {
    coin(val) {
      let arr = this.assetsArr.filter((item) => {
        return item.coin == val;
      });
      this.coinObj = arr[0];
    },
    index() {
      let arr = this.assetsArr.filter((item) => {
        return item.coin == this.coin;
      });
      this.coinObj = arr[0];
    },
    dialog(val) {
      if (!val) {
        this.number = '';
        this.password = '';
      } else {
        let arr = this.assetsArr.filter((item) => {
          return item.coin == this.coin;
        });
        this.coinObj = arr[0];
      }
    },
  },

  mounted() {
    this.coin = this.dataArr.length > 0 ? this.dataArr[0].coin : '';
  },

  methods: {
    submit() {
      if (+this.number <= 0) {
        this.$message.warning(this.$t('Assets.transferDialog.alert1'));
        return;
      }
      if (+this.number > +this.coinObj.usable) {
        this.$message.warning(this.$t('Assets.transferDialog.alert2'));
        return;
      }
      let type = this.index == 0 ? 'in' : 'out';
      this.$emit('transferSubmit', this.number, this.coin, type, this.password);
    },
    getCoinBal(coin) {
      let data = {
        coin: coin,
      };
      getBalance(data).then((res) => {
        if (res.code == '200') {
          this.usableObj.contract =
            res.data.length > 0 ? res.data[0].usable : 0;
        }
      });

      getCoinBalance(data).then((res) => {
        if (res.code == '200') {
          this.usableObj.currency =
            res.data.length > 0 ? res.data[0].usable : 0;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-select :deep(.el-input__inner),
.el-input :deep(.el-input__inner) {
  border: none;
}
.el-input {
  height: 100%;
}
.transferAlert-ul {
  padding: 30px 20px;
  .label {
    width: 80px;
  }
  .li {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid $border;
  }
}
.exchange-icon {
  width: 20px;
  height: 20px;
}
.btn {
  button {
    width: 100%;
  }
  margin-top: 40px;
}
.account button {
  width: 40%;
}
.balance {
  line-height: 35px;
}
</style>
