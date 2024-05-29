<template>
  <div class="charge navBg">
    <div class="cen">
      <div class="nav_header listBg allFlex">
        <span class="font-Eight titleColor Bold">{{
          $t('Assets.mention')
        }}</span>
        <span @click="goBack" class="navColor font-Four hand btnColorHover">{{
          $t('About.back')
        }}</span>
      </div>

      <div class="mention-box boxBg allFlex">
        <ul class="charge-left f1">
          <li>
            <p class="titleColor">{{ $t('Assets.coin') }}</p>
            <el-select v-model="coin">
              <el-option
                v-for="(item, key) in coinArr"
                :key="key"
                :value="item.name"
                >{{ item.name }}</el-option
              >
            </el-select>
          </li>
          <li v-if="chainArr.length > 1">
            <p class="titleColor">{{ $t('Assets.chain') }}</p>
            <div>
              <el-button
                size="mini"
                @click="chainIndex = key"
                :type="chainIndex == key ? 'primary' : ''"
                v-for="(item, key) in chainArr"
                :key="key"
                >{{ item.symbol }}</el-button
              >
            </div>
          </li>
          <li class="titleColor allFlex">
            <span>{{ $t('Assets.mentionDialog.balance') }}</span>
            <span class="mainColor">{{ balance }}{{ coin }}</span>
          </li>
          <li class="titleColor">
            <p>{{ $t('Assets.mentionBox.tips.one') }}</p>
            <!-- <p>
              {{ $t('Assets.mentionBox.tips.two', { coin: mentionObj.coin }) }}
            </p>
            <p>{{ $t('Assets.mentionBox.tips.three') }}</p> -->
            <p>
              {{
                $t('Assets.mentionBox.tips.four', {
                  min: mentionObj.oneoutlow,
                  coin: mentionObj.coin,
                })
              }}
            </p>
            <p>{{ $t('Assets.mentionBox.tips.five') }}</p>
            <p>{{ $t('Assets.mentionBox.tips.six') }}</p>
          </li>
        </ul>

        <!-- right -->
        <ul class="f1 mention-right">
          <!-- 提币地址 -->
          <li>
            <p class="titleColor">{{ $t('Assets.table.seven') }}</p>
            <el-input :placeholder="$t('Assets.placeholder')" v-model="address">
              <img
                src="@ContractImg/address-grey.png"
                alt=""
                slot="suffix"
                class="hand"
                v-if="addressArr.length == 0"
                @click="addressShow = true"
              />
              <img
                src="@ContractImg/address-green.png"
                alt=""
                class="hand"
                slot="suffix"
                @click="addressShow = true"
                v-else
              />
            </el-input>
          </li>

          <!-- 提现数量 -->
          <li>
            <p class="titleColor">{{ $t('Assets.mentionDialog.number') }}</p>
            <el-input
              type="number"
              :placeholder="$t('Assets.placeholder4')"
              v-model="number"
            >
              <div slot="suffix">
                <span class="navColor">{{ coin }}</span>
                <span class="marginTen">|</span>
                <span
                  class="mainColor marginTen hand"
                  @click="number = balance"
                  >{{ $t('Assets.transferDialog.all') }}</span
                >
              </div>
            </el-input>
          </li>

          <!-- 交易密码 -->
          <li>
            <p class="titleColor">{{ $t('Assets.mentionDialog.password') }}</p>
            <el-input
              :placeholder="$t('Assets.placeholder3')"
              type="password"
              show-password
              v-model="password"
              autocomplete="new-password"
            >
            </el-input>
          </li>

          <!-- 验证码 -->
          <!-- <li>
            <p class="startFlex">
              <span
                v-if="userInfo.tel !== ''"
                @click="codeType = 'toCodeByTel'"
                class="hand"
                style="marginright: 20px"
                :class="codeType == 'toCodeByTel' ? 'mainColor' : 'fontColor2'"
                >{{ $t('My.phoneSave') }}</span
              >
              <span
                class="hand marginTen"
                v-if="userInfo.email !== ''"
                @click="codeType = 'toCodeByEmail'"
                :class="
                  codeType == 'toCodeByEmail' ? 'mainColor' : 'fontColor2'
                "
                >{{ $t('My.emailSave') }}</span
              >
            </p>
            <el-input
              :placeholder="$t('Login.placeholder.code')"
              v-model="code"
              type="number"
            >
              <span
                slot="suffix"
                @click="sendCode(true, codeType)"
                v-if="!disabled"
                class="mainColor hand"
                >{{ $t('Login.saveCode') }}</span
              >
              <span slot="suffix" class="mainColor" v-else>{{
                countTime
              }}</span>
            </el-input>
          </li> -->

          <!-- 谷歌验证 -->
          <!-- <li>
            <p class="fontColor2">{{ $t('My.navArr.ten') }}</p>
            <el-input
              :placeholder="$t('Google.code.placehoder')"
              v-model="googleCode"
              type="number"
            >
            </el-input>
          </li> -->

          <!-- 手续费 -->
          <li class="allFlex titleColor">
            <span class="">{{ $t('Assets.mentionDialog.fee') }}: </span>
            <span class="mainColor">{{ mentionObj.outgas || '0' }}</span>
          </li>

          <!-- 实际到账 -->
          <li class="allFlex titleColor">
            <span>{{ $t('Assets.mentionBox.number') }} </span>
            <span class="mainColor"
              >{{
                number - Number(mentionObj.outgas) > 0
                  ? number - mentionObj.outgas
                  : '0'
              }}
              {{ coin }}</span
            >
          </li>

          <li class="mention-right_btn">
            <el-button type="primary" :disabled="finish" @click="mention">{{
              $t('Assets.mentionBox.submit')
            }}</el-button>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      :visible.sync="addressShow"
      width="300"
      :title="$t('Assets.table.seven')"
    >
      <change-address
        @addAddress="addAddress"
        @changeAddress="changeAddress"
        v-if="!addShow"
      ></change-address>
      <add-address
        :show="addShow"
        v-else
        @hide="addressShow = false"
        @AddAddress="toAddress"
      >
      </add-address>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { withdrawalTips, mentionFn, addMention } from '@/api/Assets';
import mixin from '@/utils/mixin.js';
export default {
  data() {
    return {
      chainIndex: 0,
      size: 96,
      address: '',
      number: '',
      password: '',
      addressShow: false,
      mentionAddress: '',
      chainArr: [],
      data: {
        oneoutlow: 10,
        coin: 'BTC',
      },
      code: '',
      coin: 'USDT',
      addressArr: [],
      balance: '',
      addShow: false,
      codeType: '',
      googleCode: '',
      mentionObj: {},
    };
  },
  props: {},
  mixins: [mixin],
  watch: {
    coin(val) {
      this.chainIndex = 0;
      this.addShow = false;
      if (this.coinArr) {
        const arr = this.coinArr.filter((item) => item.name == val);
        this.mentionObj = arr[0].coinArr[0];
        this.chainArr = arr[0].coinArr;
      }
    },
    coinArr(val) {
      this.chainArr = val[0].coinArr;
      this.coin = val[0].coinArr[0].coin;
      this.mentionObj = val[0].coinArr[0];
    },
    mentionObj(val) {
      if (val.coin) {
        this.getBalance();
        this.$store.dispatch('getMentionAddress', val.coin);
      }
    },
    chainIndex(val){
      if (this.chainArr) {
        if(this.chainArr.length>val){
          this.mentionObj = this.chainArr[val]
        }

      }
    }
  },

  components: {
    changeAddress(resolve) {
      return require(['./changeAddress.vue'], resolve);
    },
    addAddress(resolve) {
      return require(['@/components/My/addAddress.vue'], resolve);
    },
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.accountInfo,
    }),
    ...mapGetters({
      coinArr: 'mentionList',
    }),
    finish() {
      return (
        this.number <= 0 || this.password.length == 0 || this.address == ''
      );
    },
  },

  mounted() {
    if (
      this.userInfo.idcardstate == 'no' ||
      this.userInfo.idcardstate == 'reject'
    ) {
      this.open('realNameOpen.title');
      return;
    }

    if (this.userInfo.tradpasswordstate == 'false') {
      this.open('message.currency.open.title');
      return;
    }
  },
  created() {
    // if (this.userInfo.tel !== '') {
    //   this.codeType = 'toCodeByTel';
    // } else {
    //   this.codeType = 'toCodeByEmail';
    // }

    this.$store.dispatch('getAllCoins');
  },

  methods: {
    addAddress() {
      this.addShow = true;
    },
    toAddress(data) {
      addMention(data).then((res) => {
        if (res.code == '200') {
          this.$message.success(res.msg);
          this.$store.dispatch('getMentionAddress', this.coin);
          this.addShow = false;
        }
      });
    },
    changeAddress(val) {
      this.address = val;
      this.addressShow = false;
    },
    getBalance() {
      let data = {
        coin: this.coin,
      };
      withdrawalTips(data).then((res) => {
        if (res.code == '200') {
          this.balance = Math.max(res.data.assets.usable, 0) ;
        }
      });
    },
    mention() {
      if (
        this.userInfo.idcardstate == 'no' ||
        this.userInfo.idcardstate == 'reject'
      ) {
        this.open('realNameOpen.title');
        return;
      }
      if (this.userInfo.tradpasswordstate == 'false') {
        this.open('message.currency.open.title');
        return;
      }

      if (this.address == '') {
        this.$message.warning(this.$t('Assets.transferDialog.alert4'));
        return;
      }
      if (+this.balance < +this.number) {
        this.$message.warning(this.$t('Assets.transferDialog.alert2'));
        return;
      }
      if (+this.number < +this.mentionObj.oneoutlow) {
        this.$message.warning(
          `${this.$t('Assets.transferDialog.min')}${this.mentionObj.oneoutlow}`
        );
        return;
      }
      if (+this.number > +this.mentionObj.oneoutheight) {
        this.$message.warning(
          `${this.$t('Assets.transferDialog.max')}${
            this.mentionObj.oneoutheight
          }`
        );
        return;
      }
      //密码
      if (this.password == '') {
        this.$message.warning(this.$t('Assets.placeholder3'));
        return;
      }
      const data = {
        coin: this.mentionObj.coin,
        blockName: this.mentionObj.blockname,
        address: this.address,
        number: this.number,
        tradPassword: this.password,
      };
      mentionFn(data).then((res) => {
        if (res.code == '200') {
          this.number = '';
          this.password = '';
          this.address = '';
          this.getBalance();
          this.$message.success(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.charge {
  min-height: 100vh;
  height: 100%;
  padding-bottom: 20px;
  > div {
    height: 100%;
    min-height: 600px;
  }
}
.charge-left {
  max-width: 400px;
  li {
    .el-select {
      width: 100%;
    }
    margin-bottom: 15px;
  }
  p {
    line-height: 30px;
  }
  &_title {
    line-height: 50px;
  }
  .el-button {
    width: 80px;
    height: 30px;
  }
}
.mention-right {
  max-width: 500px;
  &_btn {
    margin-top: 40px;
  }
  li {
    margin-bottom: 15px;
  }

  p {
    line-height: 40px;
  }
  .el-input {
    height: 40px;
    line-height: 40px;
  }
  .el-button {
    width: 100%;
  }
}

.mention-box {
  margin-top: 18px;
  padding: 30px;
  height: calc(100% - 120px);
  min-height: 470px;
}
::v-deep .el-select {
  .el-input.is-focus .el-input__inner, .el-input__inner:focus{
    border-color: var(--mian-bgColor);      
  }
}   
::v-deep .el-input__inner {
  color: var(--title-color);
}

::v-deep .el-button:hover, .el-button:focus {
  color: var(--title-color);
  background-color: var(--button-hoverColor);
  border-color: var(--mian-bgColor);
}

::v-deep .el-button--primary {
    background-color: var(--mian-bgColor);
    border-color: var(--mian-bgColor);
    &:hover{
      background-color: var(--button-hoverColor);
    }
}

::v-deep .el-input__inner:focus {
  border-color: var(--mian-bgColor);
}
</style>
