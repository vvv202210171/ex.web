<template>
  <div class="about-list">
    <p class="listBg padding font-Eight about-list_title titleColor">
      {{ $t(title) }}
    </p>
    <p class="navColor about-list_pro font-Six">{{ $t(text) }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  methods: {},
  created() {},
};
</script>
<style lang="scss" scoped>
.about-list {
  width: 45%;
  border: 1px solid $navli;
  &_title {
    height: 56px;
    line-height: 56px;
  }
  &_pro {
    line-height: 40px;
    padding: 20px 15px;
  }
}
</style>
