<template>
  <div class="box allFlex boxBg">
    <login-left></login-left>
    <div class="main-box f1">
      <div class="main-login">
        <!--标题-->
        <div class="main-headerTitle titleColor font-Th">
          {{ $t('Login.registerTitle') }}
        </div>

        <login-nav
          :navIndex="method - 1"
          name="register"
          @navChange="navChange"
        ></login-nav>

        <ul class="main-ul allFlex f1">
          <!-- 邮箱,手机号 -->
          <li class="main-ul-li">
            <label for="userName" class="lab titleColor">{{
              $t('Login.label.username')
            }}</label>
            <el-input
              type="text"
              id="username"
              :placeholder="$t(placeholder)"
              class="ipt"
              v-model="usercount"
            >
              <el-select
                v-model="form.areaCode"
                slot="prepend"
                filterable
                v-if="method == 1"
              >
                <el-option
                  :label="`+${item.mobilePrefix}`"
                  :value="item.mobilePrefix"
                  v-for="(item, index) in areaArr"
                  :key="'area' + index"
                ></el-option> </el-select
            ></el-input>
          </li>

          <li class="allFlex">
            <!-- 输入密码 -->
            <div class="main-ul-li li-password">
              <label for="password" class="lab titleColor">{{
                $t('Login.label.password')
              }}</label>
              <el-input
                type="password"
                id="password"
                show-password
                :placeholder="$t('Login.placeholder.password')"
                class="ipt"
                v-model="form.loginPassword"
              />
            </div>

            <!-- 输入密码 -->
            <div class="main-ul-li li-password">
              <label for="passAgain" class="lab titleColor">{{
                $t('Login.label.tradpassword')
              }}</label>
              <el-input
                type="password"
                id="passAgain"
                :placeholder="$t('Login.placeholder.tradpassword')"
                class="ipt"
                show-password
                v-model="password"
                @keyup.enter="submit"
              >
              </el-input>
            </div>
          </li>

          <!-- 获取验证码 -->
          <li class="main-ul-li" v-show="showVerCode">
            <div>
              <label for="code" class="lab titleColor">{{
                $t('Login.label.code')
              }}</label>
              <el-input
                type="number"
                :placeholder="$t('Login.placeholder.code')"
                class="ipt"
                v-model="form.code"
                onKeypress="return (/[\d|.]/.test(String.fromCharCode(event.keyCode)))"
                @keyup.enter="submit"
              >
                <template slot="suffix">
                  <el-button
                    type="text"
                    @click="saveCode"
                    v-if="!disabled"
                    :disabled="usercount.length == 0"
                    class="mainColor time font-Four hand"
                    >{{ $t('Login.saveCode') }}</el-button
                  >
                  <el-button type="text" v-else class="mainColor time">{{
                    countTime
                  }}</el-button>
                </template>
              </el-input>
            </div>
          </li>

          <!-- 交易密码 -->
          <!-- <li class="main-ul-li">
            <label for="tradpassword" class="lab Block">{{
              $t('Login.label.tradpassword')
            }}</label>
            <el-input
              id="tradpassword"
              :placeholder="$t('Login.placeholder.tradpassword')"
              class="ipt"
              v-model="form.tradpassword"
              show-password
            >
              ></el-input
            >
          </li> -->

          <!--推荐码  -->
          <li class="main-ul-li">
            <label for="tgm" class="lab titleColor">{{
              $t('Login.label.tgm')
            }}</label>
            <el-input
              type="text"
              id="tgm"
              :placeholder="$t('Login.placeholder.tgm')"
              class="ipt"
              v-model="form.parent"
              @keyup.native.enter="submit"
            />
          </li>

          <!-- 用户协议 -->
          <li class="main-ul-li">
            <el-checkbox v-model="checked">
              <span class="mainColor">{{
                $t('Login.register.agreement')
              }}</span>
            </el-checkbox>
          </li>
        </ul>

        <!-- 按钮 -->
        <el-button
          type="primary"
          :disabled="!finish"
          class="register-btn"
          @click="submit"
          block
        >
          {{ $t('Login.titleArr.register') }}
        </el-button>

        <!-- 返回登录 -->
        <div class="prompt endFlex">
          <router-link to="/login" tag="span" class="mainColor hand">{{
            $t('Login.register.toRegistered')
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCode,
  registerFn,
  phoneRegister,
  getCodeList,
  getConfig,
} from '../api/Account';
import { isPassword, isEmail } from '@/utils/index.js';
import { mapState } from 'vuex';
import Mixin from '@/utils/mixin.js';
export default {
  name: 'register',
  data() {
    return {
      index: 0,
      agreement: 'Login.login.agreement',
      password: '',
      checked: true,
      form: {
        loginPassword: '',
        parent: '',
        code: '',
        areaCode: '1',
      },
      usercount: '',
      method: 1,
      showVerCode:false,
    };
  },
  mixins: [Mixin],
  computed: {
    ...mapState({
      areaArr: (state) => state.areaArr,      
    }),
    placeholder() {
      return this.method == 2
        ? 'Login.placeholder.mail'
        : 'Login.placeholder.phone';
    },

    finish() {
      return (
        this.form.loginPassword.length >= 6 &&
        this.form.loginPassword.length <= 16 &&
        this.password.length >= 6 &&
        this.usercount.length > 1 &&
        this.checked
      );
    },
  },
  components: {
    LoginNav(resolve) {
      return require(['./Account/loginNav'], resolve);
    },
    LoginLeft(resolve) {
      return require(['./Account/loginLeft.vue'], resolve);
    },
  },

  methods: {
    navChange(index) {
      this.method = Number(index) + 1;
    },
    toLogin() {
      this.$router.push('/login');
    },

    //邮箱
    register() {
      this.form.email = this.usercount;
      //请求
      registerFn(this.form).then((res) => {
        const _this = this;
        //验证成功时，请求注册
        if (res.code == '200') {
          this.disabled = false;
          this.countTime = 60;
          this.timer && clearInterval(_this.timer);
          let params = { user:this.form.email, password:this.form.loginPassword, mode: 1 }
          this.$router.push({name:'login', params });
        }
      });
    },

    //手机
    registerPhone() {
      this.form.tel = this.usercount;
      phoneRegister(this.form).then((res) => {
        const _this = this;
        if (res.code == '200') {
          this.disabled = false;
          this.countTime = 60;
          this.timer && clearInterval(_this.timer);
          let params = { areaCode: this.form.areaCode, user:this.form.tel, password:this.form.loginPassword, mode: 0 }
          this.$router.push({name:'login', params });
        }
      });
    },

    /**
     * comShow  提示组件
     * @param str  提示内容
     */
    comShow(str, type) {
      let _this = this;
      this.$message({
        showClose: true,
        duration: 3000,
        message: _this.$t(str),
        type: type || 'info',
      });
    },

    /**
     * saveCode  发送验证码
     */
    saveCode() {
      const _this = this;
      if (this.method == 2 && !isEmail(_this.usercount)) {
        this.comShow(_this.$t('Login.show.mail'), 'warning');
        return;
      }

      const type = this.method == 2 ? 'registerByEmail' : 'registerByTel';

      this.sendCode(this.usercount, type, this.form.areaCode);
    },

    /**
     * submit  提交
     */
    submit() {
      let _this = this;

      //邮箱验证
      if (this.method == 2 && !isEmail(_this.usercount)) {
        this.comShow(_this.$t('Login.show.mail'), 'warning');
        return;
      }

      //判断填写内容长度（密码）
      if (!isPassword(this.form.loginPassword)) {
        this.comShow(_this.$t('Login.show.password'), 'warning');
        return;
      }

      //验证码不能为空
      if (this.form.code == '' && this.showVerCode) {
        this.comShow(_this.$t('Login.show.code'), 'warning');
        return;
      }

      //密码是否一致
      if (this.password !== this.form.loginPassword) {
        this.comShow(_this.$t('Login.show.different'), 'warning');
        return;
      }

      //邀请码
      // if (this.form.parent == '') {
      //   this.comShow(_this.$t('Login.show.tgm'), 'warning');
      //   return;
      // }

      this.method == 2 ? this.register() : this.registerPhone();
    },
    getArea() {
      getCodeList().then((res) => {
        if (res.code == '200') {
          this.$store.commit('getArea', res.data);
        }
      });
    },
    getConfig(){
      getConfig().then((res) => {
        if (res.code == "200") {
          this.$store.commit("GET_CONFIG", res.data);
          this.showVerCode = res.data.regCode != 'disable';
        }
      });
    },    
  },
  created() {    
    if (this.$store.state.areaArr.length == 0) {
      this.getArea();
    }
    if (this.$route.params?.account) {
      this.method = isEmail(this.$route.params.account) ? 2 : 1;
      this.$nextTick(() =>{
        this.usercount = this.$route.params.account;
      })
    }
    if (this.$route.params.code != 0) {
      this.form.parent = this.$route.params.code;
    }    
    this.getConfig();
  },
  watch: {
    method() {
      this.usercount = '';
    },
  },
};
</script>
<style lang="scss" scoped="scoped">
.el-select :deep(.el-input){
  width: 100px;
  background: $boxBg;
}

::v-deep .el-select >>> .el-input__inner {
  padding: 0 5px;
  border-color: $border;
}
.el-input :deep(input) {
  padding: 0 5px;
  height: 100%;
}
.el-input__suffix-inner >>> i {
  width: 15px !important;
}

.box {
  > img {
    height: 100%;
  }
  height: 100vh;
  min-height: 800px;
  > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.main-box {
  position: relative;
}
.main-login {
  width: 400px;
  box-sizing: border-box;
  margin: 10px auto;
  flex-direction: column;

  border-radius: 10px;
}
.main-headerTitle {
  height: 80px;
  line-height: 80px;
}
.main-ul {
  margin: auto;
  flex-direction: column;
  justify-content: space-around;
  &-li {
    margin: 10px 0;
    .lab {
      display: block;
      margin-bottom: 10px;
    }
  }
  .li-password {
    width: 45%;
  }
}

::v-deep .el-input__inner{
  background-color: var(--index-color);
  color: var(--title-color) !important;
  &:focus {   
    border-color: var(--mian-bgColor);
  }
}

.ipt {
  @include height(45px);
  font-size: 13px;
}
.ipt::placeholder {
  font-size: 12px;
  color: $proText;
  height: 35px;
  vertical-align: middle;
}

// .el-button {
//   padding: 10px 12px;
// }

// .time {
//   line-height: 24px;
// }
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: var(--mian-bgColor) !important;
  border-color: var(--mian-bgColor) !important;
}

::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: var(--mian-bgColor);
}

::v-deep .el-checkbox__inner:hover {
  border-color: var(--mian-bgColor);
}

.register-btn {
  width: 100%;
  margin: 17px auto;
  text-align: center;
  border-radius: 6px;
  background-color: var(--mian-bgColor);
  border-color: var(--mian-bgColor);
  color: var(--index-bgColor);
  &:hover {
    background-color: var(--button-hoverColor);
  }
}
</style>
