<template>
  <div class="login-left">
    <img src="@LoginImg/left-bg.png" alt="" />

    <ul class="positionAll login-text">
      <li>
        <span class="Wcolor">{{ $t('Login.title1') }}</span>
        <span class="mainColor">{{ $t('Login.title2') }}</span>
      </li>
      <li class="font-Eight Wcolor opacity6">{{ $t('Login.proTitle') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.login-left {
  height: 100%;
  min-width: 400px;
  position: relative;
  img {
    height: 100%;
    min-height: 700px;
  }
}
.login-text {
  width: 75%;
  max-width: 600px;
  min-width: 300px;
  span {
    font-size: 36px;
  }
  li:first-child {
    line-height: 50px;
    margin-bottom: 40px;
    position: relative;
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 80px;
      height: 2px;
      background: $mainColor;
    }
  }
}
</style>
