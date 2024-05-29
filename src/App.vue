<template>
  <div id="app" class="boxBg">
    <vue-scroll
      :ops="ops"
      style="height: 100vh"
      @handle-scroll="handleScroll"
      ref="vs"
    >
      <div
        class="app_box"
        :style="{ marginTop: $route.name == 'home' ? '0' : '60px' }"
      >
        <app-header :Rscroll="Rscroll"></app-header>
        <router-view class="views"></router-view>
        <app-footer></app-footer>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import { getDetailsInfo } from '@/api/Currency';
import { getSymbols, getTrads } from '@/api/Certain';
import { getCycleSymbols } from '@/api/Cycle';
export default {
  name: 'app',
  data() {
    return {
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true,
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right',
        },
        rail: {
          background: 'transparent',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: 'transparent',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        },
      },
      Rscroll: false,
    };
  },
  watch: {
    path(val) {
      this.$refs['vs'].scrollTo({
        x: 0,
        y: 0,
      });
    },
  },
  computed: {
    skin() {
      return this.$store.state.skin;
    },
    path() {
      return this.$route.path;
    },
    skinShow() {
      return (
        this.$route.path === '/login' ||
        this.$route.path === '/register' ||
        this.$route.path === '/home'
      );
    },
  },
  methods: {
    initPlay() {
      let _this = this;
      getTrads().then((res) => {
        if (res.code == '200') {
          this.$store.commit('updataCenterCoin', res.data);
        }
      });
    },
    handleScroll(vertical, horizontal, nativeEvent) {
      this.Rscroll = vertical.scrollTop > 200;
    },
    init() {
      getSymbols().then((res) => {
        if (res.code == '200') {
          this.$store.commit('updataCurrency', res.data);
        }
      });
      getDetailsInfo().then((res) => {
        if (res.code == '200') {
          this.$store.commit('tradSymbol', res.data);
        }
      });
      getCycleSymbols().then((res) => {
        if (res.code == '200') {
          this.$store.commit('cycleSymbol', res.data);
        }
      });
    },
  },

  created() {
    this.initPlay();
    this.init();
    this.$store.dispatch('getAboutInfo');
    this.$store.dispatch('getUSDRate');
    this.$store.dispatch('getConfig');

    if (localStorage.getItem('token')) {
      this.$store.dispatch('getUser');
    }else{
      this.$store.commit('back')
    }
    // let arr = JSON.parse(localStorage.getItem('optionalArr'));
    // if (arr !== null) {
    //   let ary = JSON.stringify([]);
    //   localStorage.setItem('optionalArr', ary);
    // }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem(
        'conSymbol',
        JSON.stringify(this.$store.state.conSymbol)
      );
    });
  },
};
</script>

<style lang="scss">
.views {
  width: 100%;
  min-width: 1200px;
  overflow-x: hidden;
}
</style>
