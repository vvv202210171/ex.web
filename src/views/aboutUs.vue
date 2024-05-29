<template>
  <div class="boxBg about">
    <div class="about-bg">
      <img src="@AboutImg/aboutUs-bg.jpg" alt="" />
      <ul class="positionAll">
        <li class="Wcolor font-Th center">{{ $t('Footer.arr.two') }}</li>
        <li class="Wcolor titleFont center">Coinbase Lite</li>
      </ul>
    </div>
    <div class="cen about-main allFlex">
      <about-list title="Footer.arr.two" text="AboutUs.pro1"></about-list>
      <about-list title="AboutUs.title" text="AboutUs.pro2"></about-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    aboutList(resolve) {
      return require(['../components/aboutList'], resolve);
    },
  },
  methods: {},
  created() {},
};
</script>
<style lang="scss" scoped>
.about {
  min-height: calc(100vh - 230px);
  padding-bottom: 100px;
}
.about-bg {
  //   height: 450px;
  //   background: url('../assets/AboutImg/aboutUs-bg.jpg') no-repeat;
  //   background-size: 100% 100%;
  img {
    width: 100%;
    font-size: 0;
  }
  position: relative;
  li {
    line-height: 60px;
  }
}
.about-main {
  margin-top: 60px;
}
.titleFont {
  font-size: 44px;
}
</style>
