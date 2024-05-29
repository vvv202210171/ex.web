<template>
  <div class="alertHeader">
    <div class="titleColor font-Four">{{ $t(title) }}</div>
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
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.alertHeader {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
}
</style>
