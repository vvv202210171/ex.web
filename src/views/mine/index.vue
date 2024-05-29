<template>
  <div class="my navBg">
    <div class="my-title boxBg">
      <div class="cen titleColor font-Four">{{ $t('My.mine') }}</div>
    </div>

    <!-- 账号 -->
    <div class="my-header boxBg">
      <div class="cen allFlex">
        <!-- left -->
        <div class="allFlex my-header_left">
          <img src="@MyImg/account.png" alt="" class="account"/>
          <div class="marginTen">
            <p class="titleColor">{{ dataObj.member || '' }}</p>
            <p  class="navColor font-Two">
              {{ $t('My.credit') }}：{{dataObj.reputation}}
<!--              {{ phoneShow ? dataObj.tel : dataObj.email }}-->
<!--              <span v-show="dataObj.minlevel > 0" class="mainColor marginTen font-Tt">V</span>-->
<!--              <span v-show="dataObj.minlevel > 0" class="mainColor">{{ dataObj.minlevel }}</span>-->
            </p>
          </div>
        </div>

        <!-- right -->
        <ul class="my-header_right allFlex column">
          <li class="titleColor">{{ $t('My.safe') }} {{ $t(grade) }}</li>
          <li class="grade">
            <span :class="high ? 'mainBg' : 'listBg'"></span>
            <span :class="low ? 'mainBg' : 'listBg'"></span>
            <span class="mainBg"></span>
          </li>
          <li class="navColor font-Two">{{ $t('My.promite') }}</li>
        </ul>
      </div>
    </div>

    <!-- 安全，密码，其他 -->
    <div class="boxBg">
      <div class="cen my-main">
        <div>
          <my-main :dataObj="accountObj" @change="change"></my-main>
        </div>
        <div>
          <my-main :dataObj="safeObj" @change="change"></my-main>
        </div>
        <div>
          <other-data
              :dataArr="addressArr"
              :workList="workList"
              @delAddress="delAddress"
              @add="addFn"
              @set="setFn"
              @see="seeFn"
          ></other-data>
        </div>
      </div>
    </div>

    <!-- 弹出框 -->
    <el-dialog
        :title="$t(dialogTitle)"
        :visible.sync="dialog"
        :width="index == 2 ? '580px' : '520px'"
        custom-class="dialogBox"
    >
      <div v-if="index < 2">
        <bind-phone
            :index="index"
            @hide="dialog = false"
            :show="dialog"
            @submitAccount="submitAccount"
        ></bind-phone>
      </div>
      <div v-if="index == 2">
        <real-name
            @hide="()=>{
              dialog = false
              showRealName = false
            } "
            :show="dialog"
            :showRealName="showRealName"
            @submitReal="submitReal"
        ></real-name>
      </div>

      <div v-if="index == 3 || index == 4">
        <change-pass
            :index="index"
            :phoneShow="phoneShow"
            @hide="dialog = false"
            :show="dialog"
            @submitPass="submitPass"
        ></change-pass>
      </div>

      <div v-if="index == 5">
        <add-address
            :show="dialog"
            @hide="dialog = false"
            @AddAddress="AddAddress"
        ></add-address>
      </div>

      <div v-if="index == 6">
        <work-order
            :show="dialog"
            @hide="dialog = false"
            @subWork="subWork"
        ></work-order>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAccountInfo,
  bindPhone,
  bindEmail,
  codeSetPass,
  setPassword,
  editRealyname,
  subQuest,
  getQuest,
  setPhoneEmail,
  firstSetPass,
  editpassword,
} from '@/api/Account';
import {mentionList, delMention, addMention} from '@/api/Assets';
import {mapState} from 'vuex';
import Upload from '@/api/upload.js';
import {imgPreviewUrl} from "@/api/api";

export default {
  data() {
    return {
      dialog: false,
      account: {
        phone: '1111',
      },
      dataObj: {},
      dialogTitle: 'My.dialogTitle.one',
      accountObj: {
        title: 'My.Personal',
        arr: [
          {
            title: 'My.phone',
            icon: require('@MyImg/my-icon1.png'),
            proTitle: 'My.proTitle1',
            rightText: '',
            rightShow: false,
            btn: 'My.phone_p',
            index: 0,
          },
          {
            title: 'My.email',
            icon: require('@MyImg/my-icon2.png'),
            proTitle: 'My.proTitle1',
            rightText: '',
            rightShow: false,
            btn: 'My.phone_p',
            index: 1,
          },
          {
            title: 'My.Realname',
            icon: require('@MyImg/my-icon3.png'),
            proTitle: 'My.proTitle1',
            rightShow: false,
            btn: 'My.Certification',
            index: 2,
          },
        ],
      },
      safeObj: {
        title: 'My.Personal',
        arr: [
          {
            title: 'My.title4',
            icon: require('@MyImg/my-icon1.png'),
            proTitle: 'My.proTitle2',
            rightShow: false,
            btn: 'My.modify',
            index: 3,
          },
          {
            title: 'My.title5',
            icon: require('@MyImg/my-icon2.png'),
            proTitle: 'My.proTitle3',
            rightShow: false,
            btn: 'My.set',
            index: 4,
          },
        ],
      },
      // otherObj: {
      //   title: 'My.title3',
      //   arr: [
      //     {
      //       title: 'My.title6',
      //       icon: require('@MyImg/my-icon1.png'),
      //       proTitle: 'My.proTitle4',
      //       rightShow: true,
      //       rightText: 'My.add',
      //       btn: 'My.operation',
      //     },
      //     {
      //       title: 'My.title7',
      //       icon: require('@MyImg/my-icon2.png'),
      //       proTitle: 'My.proTitle5',
      //       rightShow: false,
      //       btn: 'My.operation',
      //     },
      //   ],
      // },
      phoneShow: false,
      index: 0,
      workList: [],
      //是否是查看实名 做数据回显
      showRealName:false
    };
  },

  components: {
    myMain(resolve) {
      return require(['./myMain'], resolve);
    },
    otherData(resolve) {
      return require(['./otherData'], resolve);
    },
    bindPhone(resolve) {
      return require(['@/components/My/bindPhone'], resolve);
    },
    changePass(resolve) {
      return require(['@/components/My/changePass'], resolve);
    },
    realName(resolve) {
      return require(['@/components/My/realname'], resolve);
    },
    addAddress(resolve) {
      return require(['@/components/My/addAddress'], resolve);
    },
    workOrder(resolve) {
      return require(['@/components/My/WorkOrder'], resolve);
    },
  },

  computed: {
    ...mapState({
      accountInfo: (state) => state.accountInfo,
      addressArr: (state) => state.mentionAddress,
    }),
    low() {
      return (
          (this.dataObj.phone !== '--' && this.dataObj.email !== '--') ||
          this.dataObj.idcardstate !== 'no'
      );
    },
    high() {
      return this.low && this.dataObj.tradpasswordstate !== 'false';
    },
    grade() {
      let str = 'My.low';
      if (this.low && !this.hight) {
        str = 'My.center';
      }

      if (this.high) {
        str = 'My.high';
      }
      return str;
    },
  },
  destroyed() {
    this.$bus.$off('realname');
    this.$bus.$off('coupon');
  },

  mounted() {
  },
  created() {
    this.getAccountInfo();
    this.getWorkList();
    // this.getCouponList();
    this.$store.state.mentionAddress.length == 0 && this.getAllAddress();

    this.$bus.$on('realname', () => {
      this.index = 2;
      if (
          this.accountInfo.idcardstate == 'no' ||
          this.accountInfo.idcardstate == 'reject'
      ) {
        this.setTitle(2);
        this.dialog = true;
      } else {
        let title =
            this.accountInfo.idcardstate == 'completed'
                ? 'My.realname.success'
                : 'My.realname.review';
        this.$message.warning(this.$t(title));
      }
    });

    this.$bus.$on('coupon', () => {
      this.dialogTitle = 'My.title8';
      this.index = 7;
      this.dialog = true;
    });
  },

  methods: {
    // getCouponList() {
    //   let data = {
    //     token: localStorage.getItem('token'),
    //     type: 0,
    //   };
    //   getCoupon(data).then((res) => {
    //     if (res.code == '200') {
    //       this.couponList = res.data;
    //     }
    //   });
    // },
    AddAddress(data) {
      addMention(data).then((res) => {
        if (res.code == '200') {
          this.dialog = false;
          this.getAllAddress();
          this.$message.success(res.msg);
        } else {
          this.$message(res.msg);
        }
      });
    },
    delAddress(obj) {
      let data = {
        id: obj.autoid,
        token: localStorage.getItem('token'),
      };

      delMention(data).then((res) => {
        if (res.code == '200') {
          this.getAllAddress();
          this.$message.success(res.msg);
        } else {
          this.$message(res.msg);
        }
      });
    },
    submitReal(data) {
      editRealyname(data).then((res) => {
        //请求成功
        if (res.code == '200') {
          this.$message.success(res.msg);
          this.getAccountInfo();
          this.dialog = false;
        }
      });
    },
    submitAccount(account, code, area) {
      let setType = 0;
      if (this.index == 0 && this.accountInfo.tel) {
        setType = 1;
      }
      if (this.index == 1 && this.accountInfo.email) {
        setType = 1;
      }
      const params = {
        code,
        account,
        areaCode: area,
        type: this.index == 0 ? 'TEL' : 'EMAIL',
        setType: setType,
      };

      setPhoneEmail(params).then((res) => {
        if (res.code == '200') {
          this.$message.success(res.msg);
          this.getAccountInfo();
          this.dialog = false;
        }
      });
      // if (this.index == 0) {
      //   data.tel = account;
      //   data.areaCode = area;
      //   bindPhone(data).then((res) => {
      //     if (res.code == '200') {
      //       this.$message.success('success');

      //     }
      //   });
      // } else {
      //   data.email = account;
      //   bindEmail(data).then((res) => {
      //     if (res.code == '200') {
      //       this.$message.success('success');
      //       this.getAccountInfo();
      //       this.dialog = false;
      //     }
      //   });
      // }
    },
    getAllAddress() {
      let data = {
        token: localStorage.getItem('token'),
      };
      mentionList(data).then((res) => {
        if (res.code == '200') {
          this.$store.commit('updataMentionList', res.data);
        }
      });
    },
    submitPass(newPassword, oldPassword) {
      let data = {
        type: this.index == 3 ? 'LOGIN' : 'TRAD',
        newPassword,
        oldPassword,
      };
      if (this.dataObj.tradpasswordstate == 'false' && this.index == 4) {
        firstSetPass({tradPassword: newPassword}).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.dialog = false;
            this.getAccountInfo();
          }
        });
      } else {
        editpassword(data).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.dialog = false;
            this.getAccountInfo();
          }
        });
      }
      // if (this.index == 3) {
      //   codeSetPass(data).then((res) => {
      //     if (res.code == '200') {
      //       this.$message.success(res.msg);
      //       this.dialog = false;
      //       this.getAccountInfo();
      //     }
      //   });
      // } else {
      //   codeSetPass(data).then((res) => {
      //     if (res.code == '200') {
      //       this.$message.success(res.msg);
      //       this.dialog = false;
      //       this.getAccountInfo();
      //     }
      //   });
      // }
    },
    getAccountInfo() {
      //请求
      getAccountInfo().then((res) => {
        if (res.code == '200') {
          this.dataObj = res.data;
          this.phoneShow = this.dataObj.tel !== '';
          this.accountObj.arr[0].rightText = this.dataObj.tel;
          this.accountObj.arr[0].rightShow = true;
          this.accountObj.arr[1].rightText = this.dataObj.email;
          this.accountObj.arr[1].rightShow = true;
          this.accountObj.arr[1].btn =
              this.dataObj.email == '' ? 'My.phone_p' : 'My.modify';
          this.accountObj.arr[0].btn =
              this.dataObj.tel == '' ? 'My.phone_p' : 'My.modify';
          //实名认证状态
          this.setRealName(this.dataObj.idcardstate);

          // 交易密码
          if (
              this.dataObj.tradpasswordstate !== 'false' ||
              !this.dataObj.tradpasswordstate
          ) {
            this.safeObj.arr[1].btn = 'My.modify';
          }
          localStorage.setItem('accountinfo', JSON.stringify(this.dataObj));
          this.$store.commit('login', this.dataObj);
        }
      });
    },
    setRealName(str) {
      if (str == 'review') {
        this.accountObj.arr[2].btn = 'Coin.sh';
      } else if (str == 'reject') {
        this.accountObj.arr[2].btn = 'Coin.bh';
      } else if (str == 'no') {
        this.accountObj.arr[2].btn = 'mine.certified';
      } else {
        this.accountObj.arr[2].btn = 'mine.verified';
      }
    },
    setTitle(index) {
      switch (index) {
        case 0:
          this.dialogTitle = 'My.dialogTitle.one';
          break;
        case 1:
          this.dialogTitle = 'My.dialogTitle.six';
          break;
        case 2:
          this.dialogTitle = 'My.dialogTitle.seven';
          break;
        case 3:
          this.dialogTitle = 'My.dialogTitle.two';
          break;
        case 4:
          this.dialogTitle =
              this.dataObj.tradpasswordstate == 'false'
                  ? 'My.dialogTitle.eleven'
                  : 'My.dialogTitle.eight';
          break;
        case 5:
          this.dialogTitle = 'My.dialogTitle.eight';
          break;
      }
    },
    change(index) {
      this.index = index;
      if (this.index == 2) {
        if (this.accountInfo.idcardstate == 'no' ||this.accountInfo.idcardstate == 'reject') {
          this.showRealName = false;
          this.setTitle(index);
          this.dialog = true;
        } else if(this.accountInfo.idcardstate ==  'review' || this.accountInfo.idcardstate ==  'completed') {
          this.showRealName = true;
          this.setTitle(index);
          this.dialog = true;
        }
      } else {
        this.setTitle(index);
        this.dialog = true;
      }
    },
    addFn() {
      this.index = 5;
      this.dialogTitle = 'My.dialogTitle.nine';
      this.dialog = true;
    },
    subWork(title, quest, images) {
      let data = {
        title,
        quest,
        images,
      };
      subQuest(data).then((res) => {
        if (res.code == '200') {
          this.getWorkList();
          this.$message.success(res.msg);
          this.dialog = false;
        }
      });
    },

    getWorkList() {
      getQuest().then((res) => {
        if (res.code == '200') {
          res.data.map((item) => (item.imagesArr = item.images.split(',')));
          this.workList = res.data;
        }
      });
    },
    setFn() {
      this.index = 6;
      this.dialogTitle = 'Customer.title';
      this.dialog = true;
    },
    seeFn() {
      this.index = 7;
      this.dialogTitle = 'My.title8';
      this.dialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
// .dialogBox :deep(.el-dialog__header) {
//   background: #e7ecef !important;
// }

.my {
  height: 100%;
  min-height: 1000px;
}

.my-title {
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid $border;
}

.my-header {
  padding: 20px 0;

  &_left {
    align-items: center;

    .account {
      width: 60px;
      height: 60px;
      border-radius: 50px;
    }

    > div {
      align-items: center;
      line-height: 26px;
    }
  }

  &_right {
    align-items: flex-end;
  }
}

.my-main {
  margin-top: 10px;
  padding: 40px 0;
}

.grade span {
  display: inline-block;
  width: 100px;
  height: 4px;
  margin-left: 10px;
}
</style>
