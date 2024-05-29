<template>
  <div class="rule boxBg">
    <div class="invite-title titleColor">{{ $t('invite.header') }}</div>
    <div class="table-record">
      <el-table :data="arr" height="245px">
        <el-table-column
          prop="member"
          :label="$t('invite.form.account')"
        ></el-table-column>
        <el-table-column
          prop="wdate"
          :label="$t('invite.form.time')"
          align="right"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    arr: {
      type: Array,
      default: () => [],
    },
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.rule {
  min-width: 300px;
  width: 35%;
  margin-top: 40px;
  border: 1px solid $border;
  &-ul {
    line-height: 30px;
    padding: 20px;
  }
}
.invite-title {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  background: $border;
}
.table-record {
  padding: 0 10px;
}
::v-deep .el-table th.el-table__cell{
  background-color: var(--index-bgColor) !important;
  color: var(--title-color) !important;
}

::v-deep .el-table__empty-block{
  background-color: var(--index-bgColor) !important;
  .el-table__empty-text{
    color: var(--title-color) !important;
  }
}
</style>
