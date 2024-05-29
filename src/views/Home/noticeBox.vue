<template>
  <div class="swiper-container notice-swiper">
    <ul class="swiper-wrapper" ref="swiper">
      <router-link
        :to="{ path: '/about', query: { info: item, index: key } }"
        tag="li"
        v-for="(item, key) in noticeArr"
        :key="key"
        class="swiper-slide center font-Four Wcolor hand"
      >
        {{ item.title }}
      </router-link>
    </ul>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  data() {
    return {
      mySwiper: null,
    };
  },
  props: {
    noticeArr: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    noticeArr() {
      this.mySwiper && this.mySwiper.destroy(true);
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      let _this = this;
      this.mySwiper = new Swiper('.swiper-container.notice-swiper', {
        autoplay: true,
        direction: 'vertical',
        loop: true,
        observer: true,
        observeParents: true,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.noticeArr.length > 0 && this.initSwiper();
    });
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.swiper-container {
  height: 40px;
  overflow: hidden;
}
</style>
