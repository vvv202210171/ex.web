<template>
  <div class="main-nav">
    <div class="listBg nav_header_title titleColor font-Four">
      {{ $t(dataObj.title) }}
    </div>
    <div
      class="nav-data"
      v-for="(item, index) in dataObj.arr"
      :key="'data' + index"
    >
      <ul
        class="allFlex"
        :class="index !== dataObj.arr.length - 1 && 'ul-border'"
      >
        <li class="startFlex li-left">
          <img :src="item.icon" alt="" class="left-icon" />
          <div class="centerFlex column marginTen">
            <span class="titleColor font-Four">{{ $t(item.title) }}</span>
            <span class="navColor font-Two">{{ $t(item.proTitle) }}</span>
          </div>
        </li>
        <li class="endFlex">
          <span v-if="item.rightShow" class="navColor left-text">{{
            item.rightText
          }}</span>
          <span class="mainColor hand" @click="toEnter(item)">{{
            $t(item.btn)
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dataObj: {
      type: Object,
      default: () => {},
    },
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    toEnter(item) {
      this.$emit('change', item.index);
    },
  },
};
</script>
<style lang="scss" scoped>
.main-nav {
  border: 1px solid $border;
  margin-bottom: 40px;
}
.nav_header_title {
  height: 50px;
  line-height: 50px;
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
}
.nav-data {
  padding: 0 30px;
  .ul-border {
    border-bottom: 1px solid $border;
  }
}
.nav-data li {
  height: 84px;
  align-items: center;
}
.left-icon {
  width: 48px;
  height: 48px;
}
.left-text {
  margin-right: 10px;
}
.li-left {
  max-width: 80%;
}
</style>
