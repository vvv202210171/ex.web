<template>
  <div
    class="box"
    :class="!Rscroll && $route.name == 'home' ? 'transparentBg' : 'mainBg'"
  >
    <div class="flex_between main">
      <!--左边-->
      <div
        class="allFlex main-left"
      >
        <!-- logo -->
        <div @click="jup('/home', null)" class="hand logo">
          <img
            :src="require(`@HomeImg/home-logo_${lightLogo}.png`)"
            class="logo_icon"
            alt
            v-show="!Rscroll && $route.name == 'home'"
          />
          <img
            :src="require(`@HomeImg/home-logo_${darkLogo}.png`)"
            class="logo_icon"
            alt
            v-show="Rscroll || $route.name !== 'home'"
          />
        </div>
        <ul class="allFlex f1" v-if="path !== '/login' && path !== '/register'">
          <li
            v-for="(item, key) in leftArr"
            :key="key"
            class="item-title"
            :class="[ path == item.link ? 'activeColor' : 'normalColor']"
            @click="jup(item.link)"
          >
            {{ $t(item.title) }}
          </li>
        </ul>
      </div>

      <!--右边-->
      <!--
          :class="path == '/login' || path == '/register' ? 'endFlex' : 'allFlex'"
        :style="{
          width:
            $i18n.locale == 'DE' || $i18n.locale == 'FR' ? '340px' : '280px',
        }"
       -->
      <ul class="header-right endFlex">
        <!-- 资产 -->
        <li
          class="item-title"
          @click="jup('/assets', 9)"
          v-if="login && login !== 'false'"
        >
          <el-dropdown size="medium" @command="toAssets">
            <span
              class="el-dropdown-link"
              :class="path == '/assets' ? 'activeColor' : 'normalColor'"
            >
              {{ $t('Header.navArr.assets') }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, key) in assetsArr"
                :command="item.command"
                :key="key"
                class="lang-item"
                >{{ $t(item.title) }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li
          class="item-title"
          @click="jup('/order', 10)"
          :class="path == '/order'  ? 'activeColor' : 'normalColor'"
          v-if="login && login !== 'false'"
        >
          {{ $t('Header.navArr.order') }}
        </li>

        <!--登录，注册-->
        <li
          class="flex_between login-btn"
          v-if="
            (!login || login === 'false') &&
            path !== '/login' &&
            path !== '/register'
          "
        >
          <span
            class="item-title normalColor login_border"
            @click="jup('/login', 6)"
            >{{ $t('Header.navArr.login') }}</span
          >
          <span class="item-title normalColor" @click="jup('/register/0', 7)">{{
            $t('Header.navArr.register')
          }}</span>
        </li>

        <!--用户-->
        <li class="item-title" v-if="login && login !== 'false'" @click="userClick">
          <el-dropdown size="medium" @command="userBack">
            <span class="el-dropdown-link">
              <!--<img src="../../assets/img/account.png" alt="" class="account-pic">-->
              <i
                class="iconfont icon-yonghu account-pic"
                :class="path == '/mine' ? 'activeColor' : 'normalColor'"
              ></i>
            </span>

            <el-dropdown-menu slot="dropdown" >
              <!-- 用户名 -->
              <el-dropdown-item class="dropdown-account">
                {{ account.member }}
              </el-dropdown-item>

              <!-- 个人中心 -->
              <el-dropdown-item command="user">{{
                $t('Header.navArr.account')
              }}</el-dropdown-item>

              <!-- 实名认证 -->
              <el-dropdown-item command="realname">{{
                $t('My.Realname')
              }}</el-dropdown-item>

              <!-- 退出 -->
              <el-dropdown-item command="back">
                <!-- <i class="iconfont icon-tuichu"></i> -->
                {{ $t('Header.navArr.back') }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </li>

        <!--语言切换-->
        <li class="item-title">
          <el-dropdown size="medium" @command="handleCommand">
            <span
              class="el-dropdown-link"
              :class="
                path !== '/login' && path !== '/register'
                  ? 'normalColor'
                  : 'lightBlue'
              "
            >
              {{ language }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, key) in langArr"
                :command="item.command"
                :key="key"
                class="lang-item"
                :class="[
                  key === langKey ? 'active' : '',
                  key === langKey ? 'activeColor' : 'normalColor',
                ]"
                >{{ item.title }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'appHeader',
  data() {
    return {
      assetsArr: [
        {
          title: 'Assets.title1',
          command: '0',
        },
        {
          title: 'Assets.title2',
          command: '1',
        },
        {
          title: 'Assets.nav.two',
          command: '2',
        },
      ],

      announcementArr: [],
      langArr: [
        {
          title: 'English',
          command: 'English',
          language: 'EN',
        },
        {
          title: '繁體中文',
          command: '繁體中文',
          language: 'CN',
        },

        {
          title: '日本語',
          command: '日本語',
          language: 'JP',
        },
        {
          title: '한국어',
          command: '한국어',
          language: 'KO',
        },
        {
          title: 'Deutsch',
          command: 'Deutsch',
          language: 'DE',
        },
        {
          title: 'Español',
          command: 'Español',
          language: 'ES',
        },
        {
          title: 'Français',
          command: 'Français',
          language: 'FR',
        },
        {
          title: 'Italiano',
          command: 'Italiano',
          language: 'IT',
        },
        {
          title: 'Portugal',
          command: 'Portugal',
          language: 'PT',
        },
        {
          title: 'Indonesia',
          command: 'Indonesia',
          language: 'ID',
        },
        {
          title: 'TiếngViệt',
          command: 'TiếngViệt',
          language: 'VI',
        },
      ],
      langKey: 1,
      language: '简体中文',
      skin: localStorage.getItem('skin') || 'white',
      timer: null,
      darkLogo: "",
      lightLogo: "",
    };
  },
  props: {
    Rscroll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    leftArr() {
      let arr = [
        {
          title: 'Header.navArr.currency',
          link: '/currency',
        },
        {
          title: 'Header.navArr.certain',
          link: '/certain',
        },
        {
          title: 'Header.navArr.cycle',
          link: '/cycle',
        },
        {
          title: 'Header.navArr.mining',
          link: '/mining',
        },
        {
          title: 'Header.navArr.help',
          link: '/about',
        },
        {
          title: 'Header.navArr.invite',
          link: '/invite',
        },
      ];
      return arr

    },
    login() {
      return this.$store.state.login;
    },
    account() {
      return this.$store.state.accountInfo || { idcardstate: '' };
    },
    path() {
      return this.$route.path;
    },
  },
  methods: {
    //点击跳转页面
    jup(url) {
      if (url == this.path) return;
      this.$router.push({
        path: url,
      });
    },

    // 切换语言

    handleCommand(val) {
      if (this.language == val) return;
      let _this = this;
      this.language = val;

      this.langArr.forEach((item, key) => {
        if (item.title === val) {
          _this.langKey = key;
          localStorage.setItem('lang', item.language);
          _this.$i18n.locale = item.language;
        }
      });
    },
    toAssets(val) {
      this.$router.push({
        path: '/assets',
        query: {
          activeIndex: val,
        },
      });
    },

    //弹框
    open() {
      let _this = this;
      this.$confirm(
        _this.$t('Header.out.title'),
        _this.$t('Header.out.prompt'),
        {
          confirmButtonText: _this.$t('Header.out.rightBtn'),
          cancelButtonText: _this.$t('Header.out.leftBtn'),
          type: 'warning',
        }
      )
        .then(() => {
          this.$store.commit('back');
          localStorage.setItem('login', false);
          this.$router.push('/home');
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: _this.$t('Header.out.message'),
          });
        });
    },
    userBack(data) {
      switch (data) {
        case 'back':
          this.open();
          break;
        case 'user':
          this.$router.push('/mine');
          break;
        case 'realname':
          if (this.path == '/mine') {
            this.$bus.$emit('realname');
          } else {
            this.$router.push('/mine');
          }
          break;
      }
    },
    userClick(){
      this.$router.push('/mine')
    }
  },
  mounted() {},
  created() {
    switch (this.$i18n.locale) {
      case 'EN':
        this.langKey = 0;
        break;
      case 'CN':
        this.langKey = 1;
        break;
      case 'JP':
        this.langKey = 2;
        break;
      case 'KO':
        this.langKey = 3;
        break;
      case 'DE':
        this.langKey = 4;
        break;
      case 'ES':
        this.langKey = 5;
        break;
      case 'FR':
        this.langKey = 6;
        break;
      case 'IT':
        this.langKey = 7;
        break;
      case 'PT':
        this.langKey = 8;
        break;
      case 'ID':
        this.langKey = 9;
        break;
      case 'VI':
        this.langKey = 10;
        break;
    }
    this.language = this.langArr[this.langKey].title;
    this.darkLogo = window._config.them
    this.lightLogo = window._config.them == 'dark' ? 'light' : 'dark'
  },
};
</script>
<style scoped="scoped" lang="scss">
/*修改element样式*/
.el-dropdown-menu {
  text-align: center;
  background: $boxBg;
  outline: none;
}
.el-dropdown-menu :deep(.el-dropdown-menu__item.normalColor) {
  color: $navColor;
}
.el-dropdown-menu :deep(.el-dropdown-menu__item.activeColor) {
  background: rgba($mainColor, 0.08);
  color: $mainColor;
}
.el-dropdown-menu :deep(.el-dropdown-menu__item):hover {
  background: rgba($mainColor, 0.08);
  color: $mainColor;
}
.el-dropdown-menu :deep(.popper__arrow)::after {
  border-bottom-color: $border !important;
}
.el-dropdown-menu {
  border: none !important;
}

.el-button {
  border-radius: 3px;
  margin: auto 5px;
  padding: 10px 12px;
}

/*头部组件样式*/
.box {
  width: 100vw;
  z-index: 3000;
  position: fixed;
  top: 0;
  width: 100%;
  transition: background ease-in-out 0.2s;
}
.main {
  width: 95%;
  min-width: 1000px;
  margin: 0 auto;
  min-height: 60px;
  //line-height: 60px;
}

.logo_icon {
  width: 120px;
  vertical-align: middle;
}
ul li {
  /*font-size: 16px;*/
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  .el-dropdown-link {
    display: inline-block;
    height: 100%;
    font-size: 16px;
  }
}
.main-left {
  .logo {
    width: 150px;
  }
}
.header-right {
  position: relative;
  li {
    margin-left: 28px;
  }
}

.item-title {
  text-align: center;
  position: relative;
  font-size: 16px;
  transition: all ease-in 0.2s;
  margin-right: 20px;
}

/*个人中心*/
.account-pic {
  vertical-align: middle;
}

/*语言*/
.lang-item {
  position: relative;
  padding: 0 30px;
}
.active:after {
  content: '';
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
  background: rgba($mainColor, 0.5);
  border-radius: 50%;
}

.dropdown-account {
  height: 40px;
  line-height: 40px;
  background: rgba($mainColor, 0.3);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: -15px;
    right: 0;
    height: 20px;
    width: 150%;
    background: $boxBg;
    transform: rotate(5deg);
  }
}
.el-dropdown-menu__item{
  color: var(--title-color);
}

.transparentBg {
  .login_border::after {
    background: $whiteColor;
  }

  background: transparent;
  .activeColor {
    color: $mainColor;
  }
  .normalColor {
    color: $whiteColor;
  }
  .item-title:hover {
    color: $mainColor;
    .el-dropdown-link {
      color: $mainColor;
    }
  }
}

.mainBg {
  .login_border::after {
    background: rgba($navli, 0.8);
  }
  .activeColor {
    position: relative;
    color: var(--header-textActive-color);
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      height: 4px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background: var(--header-borderActive-color);
    }
  }
  .normalColor {
    color: var(--header-normalColor);
    opacity: 0.8;
  }
  .item-title:hover {
    color: $lightBlue;
    opacity: 1;
    .el-dropdown-link {
      color: $lightBlue;
      opacity: 1;
    }
  }
}

.login-btn span {
  display: inline-block;
  line-height: 22px;
  padding: 0 12px;
}

.login_border {
  position: relative;
  &::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 60%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>
