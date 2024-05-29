<template>
  <el-dialog :title="rowObj.name" :visible.sync="abvanceObj.show" width="35%">
    <ul class="dialog-main padding">
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
          $t('Mining.table.number')
        }}</span>
        <span class="titleColor">
          {{ rowObj.payNumber }}
        </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.table.income')
        }}</span>
        <span class="titleColor">
          {{ rowObj.income }}
        </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.table.endTime')
        }}</span>
        <span class="titleColor">
          {{ rowObj.enddate }}
        </span>
      </li>
      <li class="flex_between">
        <span class="navColor dialog-main_label">{{
          $t('Mining.list.password')
        }}</span>
        <el-input v-model="abvanceObj.password" show-password> </el-input>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="abvanceObj.show = false">{{
        $t('My.cancel')
      }}</el-button>
      <el-button
        type="primary"
        :disabled="abvanceObj.password.length == 0"
        @click="$emit('submit')"
        >{{ $t('Mining.list.advance') }}</el-button
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
    abvanceObj: {
      type: Object,
      default: () => {},
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
</style>
