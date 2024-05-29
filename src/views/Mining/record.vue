<template>
  <div class="record">
    <p class="titleColor record_title listBg padding">
      {{ $t('Mining.record') }}
    </p>
    <el-table :data="listData">
      <el-table-column prop="name" :label="$t('Mining.table.name')">
      </el-table-column>

      <el-table-column prop="payNumber" :label="$t('Mining.table.number')">
      </el-table-column>

      <el-table-column prop="income" :label="$t('Mining.table.income')">
      </el-table-column>

      <el-table-column prop="writedate" :label="$t('Mining.table.startTime')">
      </el-table-column>

      <el-table-column prop="enddate" :label="$t('Mining.table.endTime')">
      </el-table-column>

      <el-table-column :label="$t('Mining.table.state')">
        <template slot-scope="scope">
          <span>{{ $t(`Mining.state.${scope.row.state}`) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Mining.table.operation')" align="right" v-if="userInfo.minerState == 'enable'">
        <template slot-scope="scope">
          <span v-show="scope.row.state == 'enable'" class="redColor hand" @click="showAlert(scope.row)">{{
        $t('Mining.list.advance') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" :prev-text="$t('Last')" :next-text="$t('Next')"
      :currentPage="page" :hide-on-single-page="hide"
      @current-change="(page) => $emit('changePage', page)"></el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      hide: false,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.accountInfo,
    }),
  },
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    showAlert(obj) {
      this.$emit('advanceShow', obj);
    },
  },
  created() { },
};
</script>
<style lang="scss" scoped>
.record {
  border: 1px solid var(--border-color);

  &_title {
    height: 46px;
    line-height: 46px;
  }
}

::v-deep .el-table {
  tr {
    background-color: var(--index-bgColor) !important;

    th {
      background-color: transparent !important;
    }
  }

  .el-table__empty-block {
    background-color: var(--index-bgColor) !important;
  }
}

::v-deep .el-pagination{
  button {
    background-color: var(--index-bgColor) !important;
  }
  ul {
    li {
      background-color: var(--index-bgColor) !important;
      color: var(--mian-bgColor);
    }
  }
}
</style>
