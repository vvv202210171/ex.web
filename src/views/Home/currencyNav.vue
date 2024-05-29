<template>
  <div class="nav-box">
    <ul class="allFlex box cen">
      <li
        v-for="(item, key) in currencyArr.slice(0, 4)"
        :key="key"
        class="box-li allFlex hand"
        :class="key !== 0 && 'li'"
        @click.stop="toDetails(item)"
      >
        <div class="box-li_right f1 allFlex column">
          <p class="Wcolor font-Four Bold">
            {{ item.tradcoin }}/{{ item.maincoin }}
          </p>
          <p
            class="font-Six"
            :class="item.rise > 0 ? 'greenColor' : 'redColor'"
          >
            {{ item.price }}
          </p>
          <p class="font-Four opacity6 Wcolor">
            24H Vol <span class="marginTen">{{ item.volume }}</span>
          </p>
        </div>

        <!-- <div class="box-li_left allFlex column">
          
        </div> -->
        <p
          class="font-Four box-li_left"
          :class="item.rise > 0 ? 'greenColor' : 'redColor'"
        >
          {{ item.rise }}%
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
require('echarts/lib/chart/line');
export default {
  data() {
    return {};
  },
  computed: {
    currencyArr() {
      return this.$store.state.centerDetailsArr;
    },
  },
  methods: {
    toDetails(row) {
      const query = { maincoin: row.maincoin, tradcoin: row.tradcoin };
      this.$router.push({name:'currency',params : query} );
    },
  },
  created() {},
  mounted() {
    // this.$nextTick(() => {
    //   this.initEcharts();
    // });
  },
};
</script>
<style scoped lang="scss">
.nav-box {
  padding: 30px 0;
  z-index: 500;
}
.box {
  height: 124px;
  justify-content: center;
  li {
    position: relative;
    height: 124px;
    min-width: 300px;
    padding: 20px 40px;
    position: relative;
    flex: 1;
    transition: ease-in-out 0.2s;
    &:hover {
      transform: scale(1.1);
      z-index: 99;
    }
  }
  .li::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 80%;
    position: absolute;
    background: rgba($mainColor, 0.5);
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    z-index: 90;
  }
}

.box-li_left {
  position: absolute;
  top: 20px;
  right: 40px;
}
</style>
