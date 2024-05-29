<template>
  <div class="home-swiper">
    <div class="swiper-container" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="index" v-for="(img, index) of images">
          <img :src="img" alt class="positionAll swiper-pic" />
        </div>
      </div>
    </div>
<!--    <div class="swiper-pagination middleAll swiper-pagination">-->
<!--      <span v-for="(key,index) in images" :key="index" class="swiper-buttons"></span>-->
<!--    </div>-->
  </div>
</template>

<script>
import Swiper from '../../../node_modules/swiper/js/swiper.min.js';
import '../../../node_modules/swiper/css/swiper.min.css';
export default {
  data() {
    return {
      mySwiper: null,
    };
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    images() {
      this.mySwiper && this.mySwiper.destroy(true);
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },

  components: {},

  computed: {},

  mounted() {
    this.$nextTick(() => {
      this.images.length > 0 && this.initSwiper();
    });
  },

  methods: {
    initSwiper() {
      let _this = this;
      this.mySwiper = new Swiper('.home-swiper .swiper-container', {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        onSlideChangeEnd: function (swiper) {
          swiper.update();
        },
      });
    },
  },

};
</script>
<style lang="scss" scoped>
.home-swiper {
  height: 200px;
  margin: 20px 0;
  position: relative;
  z-index: 500;
}
.swiper-container {
  min-width: 800px;
  overflow: hidden;
  height: 222px;
  margin: auto;
}
.swiper {
  height: 250px;
  padding: 20px 0;
  bottom: 10px;
  min-width: 1400px;
}
.swiper-wrapper {
  position: relative;
}
.swiper-slide {
  height: 222px;
  position: relative;
}
// .swiper-container {
//   min-width: 1400px;
//   overflow: hidden;
//   height: 222px;
//   margin: auto;
// }
.swiper-pic {
  width: 400px;
  height: 200px;
}
.swiper-pagination {
  width: 500px;
  height: 30px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
