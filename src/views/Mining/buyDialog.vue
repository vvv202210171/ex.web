<template>
  <el-dialog :title="rowObj.name" :visible.sync="dialogObj.show" width="35%">
    <ul class="dialog-main padding">
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.list.recentRate')
        }}</span>
        <span class="greenColor">
          {{ rowObj.minGas }}% - {{ rowObj.maxGas }}%
        </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.list.cycle')
        }}</span>
        <span class="titleColor">
          {{ $t('Mining.list.day', { num: rowObj.cycle }) }}
        </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.list.quota')
        }}</span>
        <span class="titleColor">
          {{ rowObj.minNumber }} - {{ rowObj.maxNumber }}
        </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.list.backTime')
        }}</span>
        <span class="titleColor">
          {{ $t('Mining.list.everyday') }}
        </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.assets')
        }}</span>
        <span class="titleColor">
          {{ $t('Mining.list.onTimeBack') }}
        </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.list.advance')
        }}</span>
        <span class="redColor"> {{ rowObj.returnGas }}% </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.list.buyNumber')
        }}</span>
        <el-input
          v-model="dialogObj.number"
          type="number"
          :placeholder="`${rowObj.minNumber} - ${rowObj.maxNumber}`"
        >
          <div slot="suffix" class="suffix flex_between">
            <span class="titleColor f1">USDT</span>
            <span
              class="mainColor hand f1"
              @click="dialogObj.number = balance"
              >{{ $t('Mining.list.all') }}</span
            >
          </div>
        </el-input>
      </li>

      <li class="endFlex">
        <span class="navColor">{{ $t('Mining.list.available') }}</span>
        <span class="titleColor">{{ balance }}USDT</span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.list.password')
        }}</span>
        <el-input v-model="dialogObj.password" show-password autocomplete="new-password"/>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogObj.show = false">{{
        $t('My.cancel')
      }}</el-button>
      <el-button
        type="primary"
        :disabled="dialogObj.number <= 0 || dialogObj.password.length == 0"
        @click="$emit('submit')"
        >{{ $t('My.comfirm') }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    rowObj: {
      type: Object,
      default: () => {},
    },
    dialogObj: {
      type: Object,
      default: () => {},
    },
    balance: {
      type: String,
      default: '',
    },
  },
  methods: {},
  created() {},
};
</script>
<style lang="scss" scoped>
.dialog-main {
  &_label {
    width: 150px;
  }
  li {
    height: 40px;
    line-height: 40px;
  }
}
.suffix {
  width: 110px;
  span:first-child {
    position: relative;
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 80%;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      background: $border;
    }
  }
}
</style>
