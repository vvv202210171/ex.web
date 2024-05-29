<template>
  <div class="login-nav">
    <span
      v-for="(item, key) in navArr"
      :key="'nav' + key"
      class="hand"
      @click="navChange(key)"
      :class="[
        navIndex == key ? 'active mainColor' : 'navColor',
        key !== 0 && 'marginTy',
      ]"
      >{{ $t(item) }}</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      // navArr: ['Login.navArr.phone', 'Login.navArr.mail'],
    };
  },
  props: {
    navIndex: {
      type: Number || String,
      default: 0,
    },
    name: {
      type: String,
      default: 'login',
    },
  },

  components: {},

  computed: {
    navArr() {
      return this.name == 'login'
        ? ['Login.login.navArr.phone', 'Login.login.navArr.mail']
        : this.name == 'forget'
        ? ['Login.tel', 'Login.email']
        : ['Login.navArr.phone', 'Login.navArr.mail'];
    },
  },

  mounted() {},

  methods: {
    navChange(index) {
      this.$emit('navChange', index);
    },
  },
};
</script>
<style lang="scss" scoped>
.login-nav span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  transition: color ease-in-out 0.2s;
}
.active {
  border-bottom: 2px solid $mainColor;
}
</style>
