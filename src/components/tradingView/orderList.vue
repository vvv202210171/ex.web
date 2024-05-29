<template>
  <ul>
    <li class="font-Two">
      {{ $t('message.tradingview.price') }} {{ dataObj.price }}
    </li>
    <li class="font-Two">
      {{ $t('message.tradingview.amount') }} {{ dataObj.number
      }}{{ dataObj.paycoin }}
    </li>
    <li class="font-Two">
      {{ $t('message.tradingview.rise') }}
      <span :class="dataObj.income >= 0 ? 'greenColor' : 'redColor'">{{
        dataObj.income >= 0
          ? $t('message.tradingview.surplus')
          : $t('message.tradingview.deficit')
      }}</span>
    </li>
    <li class="font-Two" v-if="name == 'cycle'">
      {{ $t('message.tradingview.downtime') }}
      <span class="mainColor">{{ time }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      time: '',
    };
  },
  props: {
    dataObj: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: 'cycle',
    },
  },
  methods: {
    filter() {
      let _this = this;
      this.timer && clearInterval(_this.timer);
      this.timer = setInterval(() => {
        let dataDate = `${new Date().getFullYear()}/${this.dataObj.wdate}`;
        let newDate = dataDate.replace(/-/g, '/');
        let num = Math.floor(
          (new Date(newDate).getTime() +
            this.dataObj.lever * 1000 -
            new Date().getTime()) /
            1000
        );
        this.time = num > 0 ? num : 0;
      }, 1000);
    },
  },
  watch: {
    'dataObj.autoid': {
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
    if (this.dataObj.autoid) {
      this.filter();
    }
  },
  mounted() {},
};
</script>
<style scoped lang="scss"></style>
