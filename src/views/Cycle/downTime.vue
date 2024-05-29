<template>
  <div class="mainColor">{{ time }}</div>
</template>
<script>
import { getSystemTime } from '@/api/Cycle';
export default {
  data() {
    return {
      time: '',
      newTime: null,
    };
  },
  props: {
    info: {
      type: Object,
      defalut: () => {},
    },
  },
  methods: {
    async filter() {
      let _this = this;
      this.timer && clearInterval(_this.timer);
      this.newTime = this.info.serverTime
      let num = Math.floor(
        (+this.info.wdate + this.info.lever * 1000 - this.newTime) / 1000
      );
      this.time = num
      this.timer = setInterval(() => {
        if (num <= 0) {
          num == 0 && this.$emit('tableCheck', 0, this.info.autoid);
          clearInterval(_this.timer);
          this.newTime = null;
        }
        num--;
        this.time = num > 0 ? num : 0;
      }, 1000);
    },
  },
  watch: {
    'info.autoid': {
      handler(val) {
        if (val && name == 'cycle') {
          this.filter();
        }
      },
    },
  },
  destroyed() {
    let _this = this;
    this.timer && clearInterval(_this.timer);
  },
  created() {
    if (this.info.autoid) {
      this.filter();
    }
  },
};
</script>
<style scoped lang="scss"></style>
