<template>
  <div class="changePass">
    <!-- 填写 -->
    <ul class="bindPhone-main">
      <li v-if="accountInfo.tradpasswordstate == 'true' || index == 3">
        <el-input
          type="password"
          show-password
          v-model="oldPass"
          :placeholder="$t('My.placeholder.oldPass')"
        />
      </li>
      <li>
        <el-input
          type="password"
          show-password
          v-model="password"
          :placeholder="$t('My.placeholder.newPass')"
        />
      </li>
      <li>
        <el-input
          type="password"
          show-password
          v-model="passAgain"
          :placeholder="$t('My.placeholder.passAgin')"
        />
      </li>
      <!-- <li>
        <el-input
          type="number"
          :placeholder="$t('My.placeholder.code')"
          v-model="code"
        >
          <div v-if="!disabled" slot="suffix">
            <span
              class="mainColor hand"
              v-if="accountInfo.tel !== ''"
              @click="sendCode(1)"
              >{{ $t('My.phoneSave') }}</span
            >
            <span
              class="mainColor hand marginTen"
              v-if="accountInfo.email !== ''"
              @click="sendCode(2)"
              >{{ $t('My.emailSave') }}</span
            >
          </div>

          <span class="mainColor" v-else slot="suffix">{{ count }}</span>
        </el-input>
      </li> -->
    </ul>
    <div slot="footer" class="dialog-footer endFlex">
      <el-button @click="hide">{{ $t('My.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{
        $t('My.comfirm')
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { getCode } from '@/api/Account';
import { mapState } from 'vuex';
import { isPassword } from '@/utils/index.js';
export default {
  data() {
    return {
      password: '',
      oldPass: '',
      passAgain: '',
      disabled: false,
      count: 60,
      code: '',
      timer: null,
      type: 'tel',
    };
  },

  props: {
    index: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: true,
    },
    phoneShow: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    show(val) {
      if (!val) {
        this.password = '';
        this.oldPass = '';
        this.passAgain = '';
        this.code = '';
        this.disabled = false;
      }
    },
  },

  components: {},

  computed: {
    ...mapState({
      accountInfo: (state) => state.accountInfo,
    }),
  },

  mounted() {
    console.log(this.index);
  },
  destroyed() {
    const _this = this;
    if (this.timer) {
      clearInterval(_this.timer);
    }
  },

  methods: {
    sendCode(index) {
      let _this = this;
      this.type = index == 1 ? 'TEL' : 'EMAIL';
      let data = {
        type: index == 1 ? 'toCodeByTel' : 'toCodeByEmail',
        areaCode: this.accountInfo.areacode,
        account: index == 1 ? this.accountInfo.tel : this.accountInfo.email,
      };
      getCode(data).then((res) => {
        if (res.code == '200') {
          this.calcTime();
          this.$message.success(res.msg);
        }
      });
    },
    calcTime() {
      let _this = this;
      if (this.timer) {
        clearInterval(_this.timer);
      }
      this.timer = null;
      this.count = 60;
      this.timer = setInterval(() => {
        if (this.count > 0) {
          this.count--;
          this.msg = this.count + 'S';
          this.disabled = true;
        } else {
          clearInterval(_this.timer);
          this.timer = null;
          this.msg = this.$t('My.save');
          this.count = 60;
          this.disabled = false;
        }
      }, 1000);
    },
    hide() {
      this.$emit('hide');
    },
    submit() {
      if (
        !(this.accountInfo.tradpasswordstate == 'false' && this.index == 4) &&
        this.oldPass == ''
      ) {
        this.$message.warning(this.$t('My.placeholder.oldPass'));
        return;
      }
      if (this.password === '') {
        this.$message.warning(this.$t('alert.password3'));
        return;
      }
      if (this.password !== this.passAgain) {
        this.$message.warning(this.$t('alert.password'));
        return;
      }
      if (this.index == 3 && !isPassword(this.password)) {
        this.$message.warning(this.$t('Login.show.password'));
        return;
      }
      // if (this.code == '') {
      //   this.$message.warning(this.$t('alert.code'));
      //   return;
      // }
      this.$emit('submitPass', this.password, this.oldPass);
    },
  },
};
</script>
<style lang="scss" scoped>

.bindPhone-main {
  padding: 0 20px;
  li {
    height: 55px;
    line-height: 55px;
    border-radius: 0;
    border-bottom: 1px solid $border;
  }
}
.el-input :deep(.el-input__inner)  {
  border: none;
  height: 52px;
}
</style>
