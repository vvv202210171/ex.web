<template>
  <div class="cen about-article boxBg">
    <div class="allFlex about-article_box">
      <!-- 列表 -->
      <div
        class="article-left"
        :style="{ width: $i18n.locale == 'AR' ? '200px' : '300px' }"
      >
        <el-button @click="toBack">{{ $t('About.back') }}</el-button>
        <div class="article-left_title startFlex itCenter">
          <span class="mainColor">|</span>
          <span class="marginTen titleColor">{{ $t('About.title') }}</span>
        </div>
        <ul class="">
          <li
            v-for="(item, key) in leftArr"
            :key="key"
            @click="check(key)"
            class="font-Six hand startFlex itCenter text_hide_two"
            :class="index == key ? 'mainColor' : 'navColor'"
          >
            {{ $t(item.title) }}
          </li>
        </ul>
      </div>

      <!-- 内容 -->
      <div class="article-right f1">
        <div class="titleColor font-Tf Bold article-right_title">
          {{ detailsObj.title }}
        </div>

        <div class="navColor article-right_time">{{ detailsObj.wdate | ts_local}}</div>
        <p v-html="detailsObj.reply" class="titleColor"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // index: 0,
    };
  },

  components: {},
  props: {
    index: {
      default: 0,
    },
    leftArr: {
      type: Array,
      default: () => [],
    },
    detailsObj: {
      type: Object,
      default: () => {},
    },
  },

  computed: {},

  mounted() {},

  methods: {
    toBack() {
      this.$emit('back');
    },
    check(index) {
      // this.index = index;
      this.$emit('check', index);
    },
  },
};
</script>
<style lang="scss" scoped>
.about-article {
  min-height: 935px;
  padding: 30px 10px;
  margin-top: -30px;
}

.article-left {
  button {
    padding: 8px 12px;
    margin-bottom: 15px;
  }
  &_title {
    height: 40px;
    line-height: 40px;
  }
  height: 100%;
  li {
    transition: ease-in-out 0.1s;
    // height: 50px;
    line-height: 26px;
    border-radius: 4px;
    margin: 20px 0;
    &:hover {
      color: $mainColor;
    }
  }
}
.article-right {
  height: 100%;
  padding: 0 20px;
  margin-left: 20px;
  box-sizing: border-box;
  &_title {
    margin-bottom: 30px;
  }
  &_time {
    padding-bottom: 40px;
    border-bottom: 1px solid $border;
    margin-bottom: 40px;
  }
}

.article-left {
  button {
    color: var(--title-color) !important;
    &:hover {
      background-color: var(--mian-bgColor);
    }
  }
}
</style>
