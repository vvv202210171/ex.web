<template>
  <div class="box boxBg allFlex">
    <login-left></login-left>
    <div class="main-box f1">
      <div class="main-login">
        <!--标题-->
        <div class="main-headerTitle titleColor font-Th">
          {{ index == 0 ? $t('Login.loginTitle') : $t('Login.forgerTitle') }}
        </div>

        <!-- 切换 -->
        <login-nav
          :navIndex="navIndex"
          :name="navName"
          @navChange="navChange"
        ></login-nav>

        <ul class="main-ul allFlex">
          <li class="main-ul-li">
            <div class="allFlex main-ul-check">
              <label for="username" class="lab titleColor hand">{{
                $t('Login.label.username')
              }}</label>
            </div>

            <el-input
              v-if="tableName == 'username'"
              type="text"
              id="username"
              :placeholder="$t(placeholder)"
              class="ipt mainColor"
              v-model="username"
            >
              <el-select v-model="areaCode" filterable slot="prepend" v-if="navIndex == 0">
                <el-option
                  :label="`+${item.mobilePrefix}`"
                  :value="item.mobilePrefix"
                  v-for="(item, index) in areaArr"
                  :key="'areaCode' + index"
                ></el-option>
              </el-select>
            </el-input>
          </li>

          <!-- 获取验证码 -->
          <li v-if="index === 1">
            <div class="main-ul-li">
              <label for="code" class="lab titleColor">{{
                $t('Login.label.code')
              }}</label>
              <el-input
                type="number"
                :placeholder="$t('Login.placeholder.code')"
                class="ipt mainColor"
                v-model="code"
                onkeypress="return (/[\d|.]/.test(String.fromCharCode(event.keyCode)))"
              >
                <span
                  class="saveCode hand mainColor"
                  @click="saveCode"
                  v-if="!disabled"
                  slot="suffix"
                  >{{ $t('Login.saveCode') }}</span
                >
                <span v-else slot="suffix" class="timeBtn mainColor">{{
                  countTime
                }}</span>
              </el-input>
            </div>
          </li>

          <!-- 输入密码 -->
          <li class="main-ul-li">
            <label for="password" class="lab titleColor">{{
              $t('Login.label.password')
            }}</label>
            <el-input
              type="password"
              id="password"
              :placeholder="$t('Login.placeholder.password')"
              class="ipt"
              show-password
              v-model="password"
              @keyup.native.enter="submit"
            />
          </li>

          <!-- 输入密码 -->
          <li class="main-ul-li" v-if="index == 1">
            <label for="passAgain" class="lab titleColor">{{
              $t('Login.label.tradpassword')
            }}</label>
            <el-input
              type="password"
              id="passAgain"
              :placeholder="$t('Login.placeholder.passAgain')"
              class="ipt mainColor"
              v-model="passAgain"
              show-password
              @keyup.native.enter="submit"
            >
            </el-input>
          </li>
        </ul>

        <el-button block type="primary" class="login hand" @click="submit">
          {{ $t(submitBtn()) }}
        </el-button>

        <!--忘记密码，注册-->
        <div class="login-forget" v-if="index === 0">
          <span class="hand mainColor" @click="index = 1">{{
            $t('Login.forgetPas')
          }}</span>
          <router-link to="/register/0" class="hand mainColor marginTen">{{
            $t('Login.toRegistered')
          }}</router-link>
        </div>
        <!-- 返回登录 -->
        <div class="login-forget" v-if="index === 1">
          <span class="hand mainColor" @click="index = 0">{{
            $t('Login.register.toRegistered')
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCode,
  forgetFn,
  loginFn,
  getAccountInfo,
  forgetPhone,
  getCodeList,
} from '../api/Account';
import QRCode from 'qrcode';
import { mapState } from 'vuex';
import { isPassword, isEmail } from '@/utils/index.js';
import Mixin from '@/utils/mixin.js';
export default {
  name: 'login',
  data() {
    return {
      verification: '',
      focusIndex: null,
      checkShow: true,
      navArr: ['Login.login.navArr.mail', 'Login.login.navArr.phone'],
      index: 0,
      titleArr: ['Login.titleArr.login', 'Login.titleArr.register'],
      agreement: 'Login.login.agreement',
      headerTitle: 'Login.login.headerTitle',
      password: '',
      passAgain: '',
      username: '',
      code: '', //验证码
      url: '',
      tableName: 'username',
      navIndex: 0,
      areaCode: '1',
    };
  },
  components: {
    LoginNav(resolve) {
      return require(['./Account/loginNav'], resolve);
    },
    LoginLeft(resolve) {
      return require(['./Account/loginLeft.vue'], resolve);
    },
  },
  mixins: [Mixin],
  computed: {
    ...mapState({
      areaArr: (state) => state.areaArr,
    }),
    navName() {
      return this.index == 0 ? 'login' : 'forget';
    },
    nextShow() {
      return this.index === 1;
    },
    placeholder() {
      return this.navIndex == 0
        ? 'Login.placeholder.phone'
        : 'Login.placeholder.mail';
    },
  },
  mounted() {
    //如果路由有参数，走自动登陆逻辑
    let params = this.$route.params
    if(Object.keys(params).length > 0) {
      this.password = params.password;
      this.username = params.user;
      if(params.mode == 1){
        this.navIndex = 1
      }else{
        this.navIndex = 0
        this.areaCode = params.areaCode
      }
      this.$nextTick(()=>{
        this.login()
      })
    }
  },
  methods: {
    getArea() {
      getCodeList().then((res) => {
        if (res.code == '200') {
          this.$store.commit('getArea', res.data);
        }
      });
    },
    navChange(index) {
      this.navIndex = index;
      this.username = '';
      this.password = '';
    },
    submitBtn() {
      let str = '';
      switch (this.index) {
        case 0:
          str = 'Login.titleArr.login';
          break;
        case 1:
          str = 'Login.titleArr.confirm';
          break;
        case 2:
          str = 'Login.titleArr.confirm';
          break;
      }
      return str;
    },
    keyupEnter() {
      document.onkeydown = (e) => {
        let body = document.getElementsByTagName('body')[0];
        if (
          e.keyCode === 13 &&
          e.target.baseURI.match(/inputbook/) &&
          e.target === body
        ) {
          window.console.log('enter');
          this.handleAddBook();
        }
      };
    },

    /**
     * login  登录
     */
    login() {
      let data = {
        loginPassword: this.password,
        device: 'web',
        account: this.username,
        type: this.navIndex == 1 ? 'EMAIL' : 'TEL',
        areaCode: this.areaCode,
      };
      loginFn(data).then((res) => {
        if (res.code == '200') {
          let loginInfo = res.data;
          this.$message.success(res.msg);
          localStorage.setItem('token', loginInfo.token);
          localStorage.setItem('login', true);
          this.getAccount();
          this.$router.push('/home');
        }
      });
    },
    getAccount() {
      getAccountInfo().then((res) => {
        if (res.code == '200') {
          this.data = res.data;
          localStorage.setItem('accountinfo', JSON.stringify(this.data));
          this.$store.commit('login', this.data);
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
      let _this = this;

      //用户名不能为空
      if (this.username === '') {
        this.comShow(_this.$t('Login.placeholder.username'), 'warning');
        return;
      }
      if (this.navIndex == 1 && !isEmail(_this.username)) {
        this.comShow(_this.$t('Login.show.mail'), 'warning');
        return;
      }
      let type = this.navIndex == 1 ? 'toCodeByEmail' : 'toCodeByTel';

      this.sendCode(this.username, type, this.areaCode);
    },

    /**
     * submit  提交
     */
    submit() {
      let _this = this;
      //用户名不能为空
      if (this.username === '') {
        this.comShow(_this.$t('Login.show.username'), 'warning');
        return;
      }

      switch (_this.index) {
        case 0:
          this.login();
          break;
        case 1:
          this.forgetFn();
          break;
      }
    },

    hide() {
      this.passAgain = '';
      this.password = '';
      this.code = '';
      this.username = '';
    },

    /**
     * forgetFn  忘记密码
     */
    forgetFn() {
      let _this = this;

      //验证码不能为空
      if (this.code == '') {
        this.comShow(_this.$t('Login.placeholder.code'), 'warning');
        return;
      }
      //判断填写内容长度（密码）
      if (!isPassword(_this.password)) {
        this.comShow(_this.$t('Login.show.password'), 'warning');
        return;
      }
      if (this.password !== this.passAgain) {
        this.comShow(_this.$t('Login.show.different'), 'warning');
        return;
      }
      if (this.navIndex == 1 && !isEmail(_this.username)) {
        this.comShow(_this.$t('Login.show.mail'), 'warning');
        return;
      }
      this.navIndex == 1 ? this.emailForget() : this.phoneForget();
    },
    phoneForget() {
      let data = {
        tel: this.username,
        loginPassword: this.password,
        code: this.code,
      };
      forgetPhone(data).then((res) => {
        const _this = this;
        if (res.code == '200') {
          this.hide();
          this.index = 0;
          this.disabled = false;
          this.countTime = 60;
          this.timer && clearInterval(_this.timer);
          this.$message.success(res.msg);
        }
      });
    },

    emailForget() {
      let data = {
        email: this.username,
        loginPassword: this.password,
        code: this.code,
      };

      //请求
      forgetFn(data).then((res) => {
        const _this = this;
        //请求成功时
        if (res.code == '200') {
          this.hide();
          this.index = 0;
          this.disabled = false;
          this.countTime = 60;
          this.timer && clearInterval(_this.timer);
          this.$message.success(res.msg);
        }
      });
    },
  },
  created() {
    if (this.$store.state.areaArr.length == 0) {
      this.getArea();
    }

    this.keyupEnter();
  },
  watch: {
    index(val) {
      this.headerTitle =
        val == 0 ? 'Login.login.headerTitle' : 'Login.forgerTitle';
      //清除记录
      this.code = '';
      this.password = '';
      this.username = '';
    },
  },
};
</script>
<style lang="scss" scoped="scoped">
.el-select :deep(.el-input) {
  width: 100px;
  background: $boxBg;
}

::v-deep .el-select >>> .el-input__inner {
  padding: 0 5px;
  border-color: $border;
}
.el-input :deep(input)  {
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
  &-check {
    justify-content: flex-start;
  }
  &-li {
    position: relative;
    margin: 10px 0;
    .lab {
      display: block;
      margin-bottom: 10px;
    }    
  }  
}
::v-deep .el-input__inner{
  background-color: var(--index-color);
  color: var(--title-color);
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

/* 登录 */
.login {
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
