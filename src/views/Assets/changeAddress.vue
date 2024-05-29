<template>
  <div class="changeAddress">
    <ul class="changeAddress_has" v-if="addressArr.length > 0">
      <li
        v-for="(item, key) in addressArr"
        :key="key"
        @click.stop="check(item.address)"
        class="allFlex column"
      >
        <div class="startFlex">
          <span class="titleColor font-Four">{{ item.coin }}</span>
          <span class="mainColor font-Two marginTen">{{ item.title }}</span>
        </div>

        <span class="titleColor">{{ item.address }}</span>
      </li>
    </ul>
    <ul class="changeAddress_no allFlex itCenter column" v-else>
      <li>
        <img src="@MyImg/no_data.png" alt="" class="no-address" />
      </li>
      <li class="titleColor font-Th">{{ $t('Assets.mentionAddress.no') }}</li>
      <li>
        <el-button type="primary" @click="toAdd">{{
          $t('Assets.mentionAddress.btn')
        }}</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState({
      addressArr: (state) => state.mentionList,
    }),
  },

  mounted() {},

  methods: {
    toAdd() {
      this.$emit('addAddress');
    },
    check(address) {
      this.$emit('changeAddress', address);
    },
  },
};
</script>
<style lang="scss" scoped>
.changeAddress {
}
.changeAddress_has {
  max-height: 240px;
  overflow-y: scroll;
  li {
    height: 60px;
    padding: 10px 20px;
    border-bottom: 1px solid $border;
    &:hover {
      background: rgba($greenColor, 0.09);
    }
  }
}
.changeAddress_no {
  height: 350px;
  padding: 20px 0;
  .no-address {
    width: 180px;
    height: 180px;
  }
}
</style>
