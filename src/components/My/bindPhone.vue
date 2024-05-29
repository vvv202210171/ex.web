<template>
  <div class="bindPhone">
    <!-- 填写 -->
    <ul class="bindPhone-main">
      <li class="allFlex">
        <el-select v-model="area" slot="prepend" class="area" v-if="index == 0">
          <el-option
            :label="`+${item.mobilePrefix}`"
            :value="item.mobilePrefix"
            v-for="(item, index) in areaArr"
            :key="'area' + index"
          ></el-option>
        </el-select>
        <input
          class="f1 titleColor"
          type="text"
          v-model="account"
          :placeholder="$t(placeholder)"
        />
      </li>

      <li class="allFlex">
        <input
          type="number"
          :placeholder="$t('My.placeholder.code')"
          v-model="code"
          class="f1 titleColor"
        />
        <span class="mainColor hand" v-if="!disabled" @click="saveCode">{{
          $t('My.save')
        }}</span>
        <span class="mainColor" v-else>{{ countTime }}</span>
      </li>
    </ul>
    <div slot="footer" class="dialog-footer endFlex">
      <el-button @click="hide">{{ $t('My.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{
        $t('My.comfirm')
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getCodeList, getCode } from '@/api/Account';
import mixin from '@/utils/mixin.js';
export default {
  data() {
    return {
      area: '852',
      account: '',
      code: '',
      msg: this.$t('My.save'),
    };
  },
  mixins: [mixin],
  components: {},
  created() {
    if (this.$store.state.areaArr.length == 0) {
      this.getArea();
    }
  },
  computed: {
    ...mapState({
      areaArr: (state) => state.areaArr,
      userInfo: (state) => state.accountInfo,
    }),
    placeholder() {
      return this.index == 0 ? 'My.placeholder.phone' : 'My.placeholder.email';
    },
  },
  props: {
    index: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.account = '';
        this.code = '';
        this.disabled = false;
      }
    },
  },

  methods: {
    saveCode() {
      if (this.account == '') {
        this.$message.warning(this.$t('Login.placeholder.username'));
        return;
      }
      if(this.index == 0){  //手机
        this.sendCode(this.account, 'registerByTel',   this.area );
      }else{  //邮箱
        this.sendCode(this.account, 'registerByEmail',  this.userInfo.areacode);
      }
    },

    hide() {
      this.$emit('hide');
    },
    submit() {
      let _this = this;
      if (this.code == '') {
        this.$message.warning(_this.$t('alert.code'));
        return;
      }
      this.$emit('submitAccount', this.account, this.code, this.area);
      this.timer && clearInterval(_this.timer);
      this.countTime = 60;
      this.disabled = false;
    },
    getArea() {
      getCodeList().then((res) => {
        if (res.code == '200') {
          const _this = this;
          this.$store.commit('getArea', res.data);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dropdown {
  width: 100px;
  position: relative;
}

.area {
  width: 100px;
}
.el-select :deep(.el-input){
  width: 100px;
  background: $boxBg;
  border: none !important;
}
.el-select :deep(.el-input__inner) {
  border: none !important;
}
.bindPhone-main {
  padding: 0 20px;
  li {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid $border;
    input {
      height: 100%;
    }
  }
}
</style>
