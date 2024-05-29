import { getCode } from '@/api/Account';
import { mapState } from 'vuex';
let mixin = {
  data() {
    return {
      page: 1,
      count: 0,
      total: 0,
      disabled: false,
      countTime: 60,
      timer: null,
      msg: '',
      hidePage: true,
      loadState: false,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.accountInfo,
    }),
  },

  methods: {
    comShow(str, type) {
      let _this = this;
      this.$message({
        showClose: true,
        duration: 3000,
        message: _this.$t(str),
        type: type || 'info',
      });
    },
    open(str) {
      let _this = this;
      this.$confirm(_this.$t(str), _this.$t('message.currency.open.prompt'), {
        confirmButtonText: _this.$t('message.currency.open.rightBtn'),
        cancelButtonText: _this.$t('message.currency.open.leftBtn'),
      }).then(() => {
        this.$router.replace({
          path: '/mine',
        });
      });
    },

    sendCode(name, type, areacode) {
      let _this = this;
      if (name && name == '') {
        this.comShow(_this.$t('Login.placeholder.username'), 'warning');
        return;
      }

      let data = {
        type,
        areaCode: areacode || this.userInfo.areacode,
        account: name,
      };
      getCode(data).then((res) => {
        if (res.code == '200') {
          this.$message.success(res.msg);
          this.calcTime();
        }
      });
    },
    calcTime() {
      let _this = this;
      if (this.timer) {
        clearInterval(_this.timer);
        this.timer = null;
      }
      this.countTime = 60;
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.countTime > 0) {
            this.countTime--;
            this.msg = this.countTime + 'S';
            this.disabled = true;
          } else {
            clearInterval(_this.timer);
            this.timer = null;
            this.msg = this.$t('My.save');
            this.countTime = 60;
            this.disabled = false;
          }
        }, 1000);
      }
    },
    currentChange(val) {
      this.page = val;
      this.loadState = false;
      this.getData();
    },
  },
};
export default mixin;
