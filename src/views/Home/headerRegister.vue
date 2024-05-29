<template>
  <ul class="header-box center Wcolor flex_between column">
    <li class="header-box_title">{{ $t('Home.headerTitle') }}</li>
    <li class="header-box_proTitle font-Ty opacity6">
      {{ $t('Home.headerPro') }}
    </li>

    <li class="header-box_register centerFlex" v-if="!userInfo || !userInfo.recomcode">
      <el-input
        :placeholder="$t('Home.register.placeholder')"
        v-model="account"
        class="ipt"
        @keyup.native.enter="toRegister"
      ></el-input>
      <el-button
        type="primary"
        class="marginTen font-Six"
        @click="toRegister"
        >{{ $t('Home.register.btn') }}</el-button
      >
    </li>
  </ul>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      account: '',
    };
  },

  components: {},

  computed: {
    ...mapState({
      userInfo: (state) => state.accountInfo,
    }),
  },

  mounted() {},

  methods: {
    toRegister() {
      this.$router.push({
        name: 'register',
        params: {
          code: 0,
          account: this.account,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header-box {
  width: 75%;
  //height: 330px;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 500;
  &_title {
    font-size: 48px;
    // line-height: 80px;
  }
  &_register {
    width: 70%;
    margin: 50px auto 20px auto;
    // margin: 90px auto 20px auto;
    align-content: center;
    .el-input {
      width: calc(100% - 150px);
      margin-right: 10px;
    }
    .el-button {
      background-color: var(--mian-bgColor);
      border-color: var(--mian-bgColor);
      color: var(--index-bgColor);
      &:hover {
        background-color: var(--button-hoverColor);
      }
    }
  }
}
.ipt.el-input :deep(.el-input__inner) {
  background: rgba($boxBg, 0.3);
  &:focus {
    border-color: var(--mian-bgColor);
  }
}
</style>
