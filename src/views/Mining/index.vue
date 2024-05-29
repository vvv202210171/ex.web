<template>
  <div class="mining navBg">
    <div class="boxBg mining_top centerFlex">
      <mining-top :info="info"></mining-top>
    </div>

    <div class="mining_bun boxBg">
      <div class="flex_between mining_list cen">
        <list-item v-for="(item, key) in listArr" :key="key" :info="item" @showAlert="showAlert"></list-item>
      </div>
      <div class="mining_record cen">
        <record-box :page="page" :total="total" @changePage="changePage" :listData="list"
          @advanceShow="advanceShow"></record-box>
      </div>
    </div>
    <buy-dialog :rowObj="rowObj" :dialogObj="dialogObj" :balance="balance" @submit="submit"></buy-dialog>
    <advance-dialog :rowObj="rowObj" :abvanceObj="abvanceObj" @submit="advanceFn">
    </advance-dialog>
  </div>
</template>

<script>
import {
  getMineInfo,
  getMineList,
  getMyReocrd,
  addOrder,
  advanceOrder,
} from '@/api/Mining';
import { getCoinBalance } from '@/api/Assets';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      show: false,
      balance: '',
      info: {},
      dialogObj: {
        show: false,
        password: '',
        number: '',
      },
      abvanceObj: {
        show: false,
        password: '',
      },
      listArr: [],
      list: [],
      rowObj: {},
      page: 1,
      total: 0,
    };
  },
  computed: {
    ...mapState({
      login: (state) => state.login,
    }),
  },
  components: {
    miningTop(resolve) {
      return require(['./miningTop'], resolve);
    },
    listItem(resolve) {
      return require(['./listItem'], resolve);
    },
    recordBox(resolve) {
      return require(['./record'], resolve);
    },
    buyDialog(resolve) {
      return require(['./buyDialog'], resolve);
    },
    advanceDialog(resolve) {
      return require(['./advanceDialog'], resolve);
    },
  },
  methods: {
    changePage(val) {
      this.page = val;
      this.getRecord();
    },
    getBal() {
      getCoinBalance({ coin: 'USDT' }).then((res) => {
        if (res.code == 200) {
          this.balance = Math.max(res.data.usable, 0).toString();
        }
      });
    },
    advanceFn() {
      const params = {
        id: this.rowObj.id,
        tradPassword: this.abvanceObj.password,
      };
      advanceOrder(params).then((res) => {
        if (res.code == 200) {
          this.abvanceObj.password = '';
          this.abvanceObj.show = false;
          this.$message.success(res.msg);
          this.getRecord();
          this.getInfo();
        }
      });
    },
    submit() {
      if (+this.dialogObj.number > +this.rowObj.maxNumber) {
        this.$message.warning(
          this.$t('Mining.alert.max', { num: this.rowObj.maxNumber })
        );
        return;
      }
      if (+this.dialogObj.number < +this.rowObj.minNumber) {
        this.$message.warning(
          this.$t('Mining.alert.min', { num: this.rowObj.minNumber })
        );
        return;
      }
      if (+this.dialogObj.number > +this.balance) {
        this.$message.warning(this.$t('Assets.transferDialog.alert2'));
        return;
      }
      const params = {
        id: this.rowObj.id,
        number: this.dialogObj.number,
        tradPassword: this.dialogObj.password,
      };
      addOrder(params).then((res) => {
        if (res.code == 200) {
          this.dialogObj.show = false;
          this.dialogObj.number = '';
          this.dialogObj.password = '';
          this.getRecord();
          this.getInfo();
          this.$message.success(res.msg);
        }
      });
    },
    getInfo() {
      getMineInfo().then((res) => {
        if (res.code == 200) {
          this.info = res.data;
        }
      });
    },
    getList() {
      getMineList().then((res) => {
        if (res.code == 200) {
          this.listArr = res.data;
        }
      });
    },
    getRecord() {
      const params = {
        page: this.page,
        limit: 10,
      };
      getMyReocrd(params).then((res) => {
        if (res.code == 200) {
          this.list = res.data;
          this.total = res.count;
        }
      });
    },
    showAlert(obj) {
      this.rowObj = obj;
      this.dialogObj.show = true;
    },
    advanceShow(obj) {
      this.rowObj = obj;
      this.abvanceObj.show = true;
    },
  },
  created() {
    if (this.login && this.login !== 'false') {
      this.getRecord();
      this.getBal();
      this.getInfo();
    }
    this.getList();
  },
  watch: {
    dialogObj: {
      deep: true,
      handler(val) {
        if (!val.show) {
          val.password = '';
          val.number = '';
        }
      },
    },
    abvanceObj: {
      deep: true,
      handler(val) {
        if (!val.show) {
          val.password = '';
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.mining {
  min-height: 100vh;
}

.mining_top {
  height: 130px;
  padding: 30px 0;
}

.mining_bun {
  margin-top: 10px;
  padding: 20px 0 80px 0;

  min-height: calc(100vh - 140px);
}

.mining_list {
  flex-wrap: wrap;
}

.mining_record {
  margin-top: 40px;
}

::v-deep .el-dialog__title {
  color: var(--title-color) !important;
}

::v-deep .el-button--default {
  color: var(--title-color) !important;
  &:hover{
    background-color: var(--border-color);
    border-color: var(--mian-bgColor)
  }
}

::v-deep .el-button--primary {
  background-color: var(--mian-bgColor) !important;
  border: none;
}
</style>
