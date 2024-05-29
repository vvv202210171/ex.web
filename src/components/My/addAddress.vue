<template>
  <div class="realname">
    <ul>
      <li class="allFlex">
        <span :style="{ width: $i18n.locale == 'AR' ? '100px' : '140px' }">{{
          $t('Assets.table.six')
        }}</span>
        <el-select v-model="coin" class="box-top_select f1">
          <el-option
            v-for="item in coinArr"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </li>
      <li class="allFlex">
        <span :style="{ width: $i18n.locale == 'AR' ? '100px' : '140px' }">{{
          $t('Assets.table.seven')
        }}</span>
        <input
          type="text"
          class="f1 titleColor"
          :placeholder="$t('Assets.placeholder')"
          v-model="address"
        />
      </li>
      <li class="allFlex">
        <span :style="{ width: $i18n.locale == 'AR' ? '100px' : '140px' }">{{
          $t('Assets.table.eight')
        }}</span>
        <input
          type="text"
          class="f1 titleColor"
          :placeholder="$t('Assets.table.eight')"
          v-model="note"
        />
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
import { getCoinList } from '@/api/Assets';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      coin: '',
      note: '',
      address: '',
    };
  },
  watch: {
    show(val) {
      if (!val) {
        this.note = '';
        this.address = '';
        this.disabled = false;
      }
    },
    coinArr(val) {
      if (val) {
        this.coin = val[0].name;
      }
    },
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },

  components: {},

  computed: {
    ...mapGetters({
      coinArr: 'mentionList',
    }),
  },

  mounted() {},
  created() {
    this.$store.dispatch('getAllCoins');
  },

  methods: {
    hide() {
      this.$emit('hide');
    },
    submit() {
      if (this.address == '') {
        this.$message.warning(this.$t('Assets.placeholder'));
        return;
      }

      if (this.note == '') {
        this.$message.warning(this.$t('Assets.placeholder2'));
        return;
      }
      let data = {
        address: this.address,
        tag: this.note,
        coin: this.coin,
        title: this.note,
      };

      this.$emit('AddAddress', data);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-select :deep(.el-input__inner) {
  border: none;
}
.realname {
  padding: 0 20px;
  height: 250px;
}
.realname ul li {
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid $border;
  input {
    height: 100%;
  }
}

.avatar-uploader {
  width: 40px;
  height: 40px;
  border: 1px solid $border;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
}
.el-icon-plus,
.avatar-uploader-icon {
  font-size: 20px;
}
</style>
