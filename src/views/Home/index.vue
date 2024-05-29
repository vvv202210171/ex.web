<template>
  <div class="container boxBg" id="box">
    <!--banner-->
    <div class="header allFlex column">
      <!-- <el-carousel :interval="5000" height="560px">
        <el-carousel-item v-for="(item, index) in bannerImg" :key="index">
          <img class="banner-image" :src="item.banner" />
        </el-carousel-item>
      </el-carousel> -->
      <div class="canvasBox"></div>
<!--      <img-->
<!--        src="@HomeImg/home-banner1.png"-->
<!--        alt=""-->
<!--        :class="active == 0 && 'activeBanner'"-->
<!--        class="header_banner"-->
<!--      />-->
<!--      <img-->
<!--        src="@HomeImg/home-banner2.png"-->
<!--        alt=""-->
<!--        :class="active == 1 && 'activeBanner'"-->
<!--        class="header_banner"-->
<!--      />-->

      <header-register ></header-register>

      <swiper :images="bannerImg"></swiper>

      <div class="main-help Wcolor font-Four noticeBg">
        <div class="cen">
          <notice-box :noticeArr="noticeArr"></notice-box>
        </div>
      </div>
      <!-- currency -->
      <currency-nav></currency-nav>
    </div>

    <!-- 事例 -->
    <trading-center></trading-center>

    <!-- 文案 -->
    <div class="btn-trading allFlex column">
      <!-- title -->
      <div class="titleColor center btn-trading_title">
        {{ $t('Home.title') }}
      </div>

      <!-- proTitle -->
      <div class="navColor font-Four center btn-trading_proTitle">
        {{ $t('Home.proTitle') }}
      </div>

      <!-- 文字 -->
      <ul class="trading center allFlex">
        <li v-for="(item, key) in arr" :key="key" class="trading-item f1">
          <ul class="allFlex hand column">
            <img :src="require(`../../assets/HomeImg/home-${themIcon}-icon${key}.png`)" alt class="item_pic" />

            <li class="item-title titleColor font-Eight centerFlex itCenter">
              {{ $t(item.title) }}
            </li>

            <li class="item-proTitle f1 navColor font-Four">
              {{ $t(item.proTitle) }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!--  下载 -->
    <div class="main-down">
      <div class="down-way allFlex lightBlue cen">
        <img src="@HomeImg/down-app.png" alt class="down-right" />

        <div class="down-left allFlex column f1">
          <div class="down-left_title font-Th">{{ $t('Home.down.title') }}</div>
          <ul class="down-left_proTitle">
            <li class="font-Six opacity6">{{ $t('Home.down.proTitle1') }}</li>
            <li class="font-Six opacity6">{{ $t('Home.down.proTitle2') }}</li>
            <li class="font-Six opacity6">{{ $t('Home.down.proTitle3') }}</li>
          </ul>

          <ul class="down-left_btn allFlex">
            <li class="marginTen">
              <el-button class="down-btn" type="info">{{
                $t('Home.down.and')
              }}</el-button>
              <div id="qrcode" class="icon-box">
                <canvas id="canvas2"></canvas>
              </div>
            </li>
            <li class="marginTen">
              <el-button type="info" class="down-btn">{{
                $t('Home.down.android')
              }}</el-button>

              <div id="qrcode" class="icon-box">
                <canvas id="canvas1"></canvas>
              </div>
            </li>
            <li class="marginTen">
              <el-button type="info" class="down-btn">{{
                $t('Home.down.ios')
              }}</el-button>

              <div id="qrcode" class="icon-box">
                <canvas id="canvas3"></canvas>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 交易量数据 -->
    <!-- <data-all></data-all> -->

    <!-- <div class="showDialog" v-if="promptShow">{{ $t(showInfo) }}</div> -->
  </div>
</template>

<script>
import QRCode from 'qrcode';
import { getNotice, getBanner } from '@/api/Account';

export default {
  name: 'home',
  data() {
    return {
      themIcon: window._config.them,
      arr: [
        {
          title: 'Home.arr.oneTitle',
          proTitle: 'Home.arr.oneProTitle',
          //url: require('../../assets/HomeImg/home-dark-icon1.png'),
        },
        {
          title: 'Home.arr.twoTitle',
          proTitle: 'Home.arr.twoProTitle',
          //url: require('../../assets/HomeImg/home-dark-icon2.png'),
        },
        {
          title: 'Home.arr.threeTitle',
          proTitle: 'Home.arr.threeProTitle',
         // url: require('../../assets/HomeImg/home-dark-icon3.png'),
        },
        {
          title: 'Home.arr.fourTitle',
          proTitle: 'Home.arr.fourProTitle',
          //url: require('../../assets/HomeImg/home-'+this.themIcon+'-icon4.png'),
        },
      ],
      mySwiper: null,
      noticeArr: [],
      bannerImg: [
        // require('@HomeImg/banner1.png'),
        // require('@HomeImg/banner2.png'),
        // require('@HomeImg/banner1.png'),
        // require('@HomeImg/banner2.png'),
      ],

      active: 0,
      timer: null,
    };
  },
  components: {
    currencyNav(resolve) {
      return require(['./currencyNav'], resolve);
    },
    tradingCenter(resolve) {
      return require(['./tradingCenter'], resolve);
    },
    headerRegister(resolve) {
      return require(['./headerRegister'], resolve);
    },
    swiper(resolve) {
      return require(['./swiper'], resolve);
    },
    noticeBox(resolve) {
      return require(['./noticeBox'], resolve);
    },
  },
  methods: {
    getBanners() {
      let data = {
        type: 'wap',
      };
      getBanner(data).then((res) => {
        if (res.code == '200') {
          let arr = []
          res.data.map((item)=>{
            arr.push(`/api/res/preview/${item.banner}`)
          })
          this.bannerImg = arr;
        }
      });
    },
    getNotices() {
      getNotice({ type: 'notice' }).then((res) => {
        if (res.code == '200') {
          this.noticeArr = res.data;
        }
      });
    },

    /**
     * qrcode  生成二维码
     */
    qrcode() {
      const canvas2 = document.getElementById('canvas2');

      const canvas1 = document.getElementById('canvas1');
      const canvas3 = document.getElementById('canvas3');
      QRCode.toCanvas(
        canvas1,
        `${window.location.origin}/wap/index.html#/downloadApp`,
        function (error) {
          if (error) window.console.error(error);
        }
      );
      QRCode.toCanvas(
        canvas3,
        `${window.location.origin}/wap/index.html#/downloadApp`,
        function (error) {
          if (error) window.console.error(error);
        }
      );
      QRCode.toCanvas(
          canvas2,
          `${window.location.origin}/wap/index.html`,
          function (error) {
        if (error) window.console.error(error);
      });
    },
  },
  watch: {
    locale() {
      this.getBanners();
      this.getNotices();
    },
  },

  computed: {
    locale() {
      return this.$i18n.locale;
    }
  },
  beforeDestroy() {
    window.endCanvas()
    let _this = this;
    clearInterval(_this.timer);
  },
  created() {
    this.getBanners();
    this.getNotices();
    this.timer = setInterval(() => {
      this.active = this.active == 0 ? 1 : 0;
    }, 6000);
  },
  mounted() {
    this.$nextTick(() => {
      this.qrcode();
    });
    window.startCanvas()
  },
};
</script>
<style scoped="scoped" type="text/css" lang="scss">
.container {
  min-width: 1200px;
}

/* 头部 */
.header {
  height: 890px;
  padding-top: 150px;
  min-width: 1400px;
  background-size: 100% 890px;
  position: relative;
  overflow: hidden;

  &_banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 890px;
    transition: all 4s linear;
    transform: scale(1);
    opacity: 0;
    z-index: 10;
    -webkit-user-drag: none;
  }
  .activeBanner {
    transform: scale(1.2, 1.2);
    opacity: 1;
    -webkit-user-drag: none;
  }
}

/*轮播*/
// 广告帮助
.main-help {
  height: 40px;
  line-height: 40px;
  z-index: 500;
}

.btn-trading {
  height: 670px;
  padding: 50px 0 70px 0;
  background-color: var(--trading-bgColor);
  &_title {
    font-size: 36px;
  }
  &_proTitle {
    width: 50%;
    max-width: 1200px;
    margin: 0 auto;
  }
  > ul {
    margin: 0 auto;
  }
  .trading-item {
    max-width: 270px;
    margin: 0 10px;
    height: 340px;
    border-radius: 8px;
    padding: 30px 15px;
    ul {
      height: 100%;
      align-items: center;
      .item-title {
        height: 80px;
      }
    }
  }
  .item_pic {
    width: 140px;
    height: 140px;
    -webkit-user-drag: none;
  }
}

.main-down {
  height: 720px;
  //background: url('../../assets/HomeImg/down-bg.png') no-repeat;
  //background-size: 100% 100%;
  padding: 50px 0 0;
  background-color: var(--index-mainDown-bgColor);

  .down {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .down-right {
    width: 480px;
    -webkit-user-drag: none;
  }
  .down-left {
    margin-left: 80px;
    padding-bottom: 80px;
    justify-content: center;
    &_title {
      height: 80px;
      // line-height: 80px;
    }
    &_proTitle {
      margin: 60px 0 100px 0;
      line-height: 40px;
    }
    &_btn {
      margin-bottom: 100px;
      justify-content: flex-start;
      position: relative;
      button {
        width: 150px;
      }
      li:hover {
        .icon-box {
          opacity: 1;
          bottom: -160px;
        }
      }
      .icon-box {
        position: absolute;
        width: 150px;
        height: 150px;
        background: $whiteColor;
        bottom: -120px;
        border-radius: 10px;
        opacity: 0;
        transition: all 0.2s;
        overflow: hidden;
      }
      canvas {
        width: 150px !important;
        height: 150px !important;
      }
    }
  }
  .down-left_proTitle {
    color: #000000 !important;
  }
}

.down-btn.el-button.el-button--info {
  background-color: var(--index-mainDown-button-bgColor) !important;
  border-color: var(--index-mainDown-button-bgColor) !important;
  color: $titleColor;
}
.canvasBox{
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
