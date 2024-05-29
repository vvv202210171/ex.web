<template>
  <ul class="cen main flex_between">
    <li class="">
      <p class="navColor value_info">{{ $t('Mining.assets') }}</p>
      <div class="value_text">
        <span class="font-Th Bold titleColor"
          >{{ info.totalPayNumber || '--' }} USDT</span
        >
        <span class="font-Four navColor">
          ≈
          {{ usdRate.symbol
          }}{{
            info.totalPayNumber
              ? Number(info.totalPayNumber * usdRate.price).toFixed(4)
              : '--'
          }}
        </span>
      </div>
    </li>

    <li class="flex_between main_right center">
      <div>
        <p class="navColor value_info flex_between">
          {{ $t('Mining.income') }}
        </p>
        <p class="titleColor value_text font-Tf">
          {{ info.totalTodayIncome || '--' }}
        </p>
      </div>
      <div>
        <p class="navColor value_info flex_between">
          {{ $t('Mining.incomeAll') }}
        </p>
        <p class="titleColor value_text font-Tf">
          {{ info.totalIncome || '--' }}
        </p>
      </div>
      <div>
        <p class="navColor value_info flex_between">{{ $t('Mining.order') }}</p>
        <p class="titleColor value_text font-Tf">{{ info.count || '--' }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      usdRate: (state) => state.usdRate,
    }),
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},
  created() {},
};
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
}
.main_right {
  width: 36%;
  .value_info {
    height: 30px;
  }
  .value_text {
    line-height: 40px;
  }
}
</style>
