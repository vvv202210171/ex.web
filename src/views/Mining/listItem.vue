<template>
  <div class="listBg list-item allFlex column">
    <p class="titleColor list_name font-Six">{{ info.name }}</p>
    <ul class="flex_between">
      <li class="f1">
        <p class="navColor">{{ $t('Mining.list.minNumber') }}</p>
        <p class="titleColor font-Eight">
          {{ info.minNumber }}-{{ info.maxNumber }}
        </p>
      </li>
      <li class="f1">
        <p class="navColor">{{ $t('Mining.list.rate') }}</p>
        <p class="greenColor font-Eight">
          {{ info.minGas }}%-{{ info.maxGas }}%
        </p>
      </li>
      <li class="f1">
        <p class="navColor">{{ $t('Mining.list.cycle') }}</p>
        <p class="titleColor font-Eight">
          {{ $t('Mining.list.day', { num: info.cycle }) }}
        </p>
      </li>
    </ul>
    <el-button
      block
      type="primary"
      v-if="login && login != 'false'"
      @click="$emit('showAlert', info)"
      >{{ $t('Mining.list.btn') }}</el-button
    >
    <div class="buy-btn_noLogin buy-btn mainColor btnBg" v-else>
      <router-link to="/login" replace tag="span" class="hand">{{
        $t('Login.titleArr.login')
      }}</router-link>
      <span class="proColor" replace style="margin: 0 10px">/</span>
      <router-link to="/register/0" tag="span" class="hand">{{
        $t('Login.titleArr.register')
      }}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      login: (state) => state.login,
    }),
  },
  methods: {},
  created() {},
};
</script>
<style lang="scss" scoped>
.list-item {
  width: calc(50% - 10px);
  height: 200px;
  border-radius: 4px;
  padding: 0 20px 20px 20px;
  margin-bottom: 20px;
  li > p {
    line-height: 30px;
  }
}
.list_name {
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid $boxBg;
}

::v-deep .el-button--primary{
  background-color: var(--mian-bgColor) !important;
  border: none;
}

.buy-btn {
  width: 100%;
  @include height(34px);
  text-align: center;
  &_noLogin {
    border: 1px solid $border;
    border-radius: 5px;
  }
}
</style>
