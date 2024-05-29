<template>
  <div class="invite navBg">
    <!-- bg -->
    <div class="invite-bg centerFlex itCenter">
      <ul class="Wcolor">
        <li class="title">{{ $t('invite.headerTitle') }}</li>
        <li class="font-Six header-text center">{{ $t('invite.downText') }}</li>
      </ul>
    </div>

    <!-- 流程图 -->
    <div class="cen">
      <div class="invite-process boxBg allFlex itCenter">
        <ul class="list allFlex column">
          <li class="allFlex itCenter">
            <div class="indexFont titleColor">01</div>
            <img src="@InviteImg/invite-icon1.png" alt="" />
          </li>

          <li>
            <p class="titleColor font-Tf">{{ $t('invite.title1') }}</p>
            <p class="navColor">{{ $t('invite.pro1') }}</p>
          </li>
        </ul>

        <img src="@InviteImg/row-right.png" alt="" class="row-icon" />

        <ul class="list allFlex column">
          <li class="allFlex itCenter">
            <div class="indexFont titleColor">02</div>
            <img src="@InviteImg/invite-icon2.png" alt="" />
          </li>

          <li>
            <p class="titleColor font-Tf">{{ $t('invite.title2') }}</p>
            <p class="navColor">{{ $t('invite.pro2') }}</p>
          </li>
        </ul>

        <img src="@InviteImg/row-right.png" alt="" class="row-icon" />

        <ul class="list allFlex column">
          <li class="allFlex itCenter">
            <div class="indexFont titleColor">03</div>
            <img src="@InviteImg/invite-icon3.png" alt="" />
          </li>

          <li>
            <p class="titleColor font-Tf">{{ $t('invite.title3') }}</p>
            <p class="navColor">{{ $t('invite.pro3') }}</p>
          </li>
        </ul>
      </div>

      <!-- 邀请 -->
      <div class="allFlex">
        <div class="f1">
          <my-invite :data="obj"></my-invite>
        </div>
        <div class="marginTen">
          <record :arr="list"></record>
        </div>
      </div>

      <!-- 规则 -->
      <!-- <team-table :dataArr="teamArr"></team-table>

      <div class="main-page">
        <div class="page-box">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :prev-text="$t('Last')"
            :next-text="$t('Next')"
            :currentPage="page"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div> -->
      <!-- <rule></rule> -->
    </div>
  </div>
</template>

<script>
import { getInviteCode, getInviteList, getTeamRecord } from '@/api/Account';
import mixin from '@/utils/mixin.js';
export default {
  name: '',
  data() {
    return {
      hide: true,
      obj: {
        address: '',
        tgm: '',
      },
      list: [],
      total: 0,
      page: 1,
      teamArr: [],
    };
  },
  mixins: [mixin],

  components: {
    // rule(resolve) {
    //   return require(['./rule'], resolve);
    // },
    myInvite(resolve) {
      return require(['./myInvite'], resolve);
    },
    record(resolve) {
      return require(['./record'], resolve);
    },
    // teamTable(resolve) {
    //   return require(['./teamTable'], resolve);
    // },
  },
  methods: {
    getData() {
      const params = {
        page: this.page,
        limit: 10,
      };
      getTeamRecord(params).then((res) => {
        if (res.code == '200') {
          this.total = res.count;
          this.teamArr = res.data;
        }
      });
    },
    init() {
      getInviteCode().then((res) => {
        if (res.code == '200') {
          let data =res.data
          let code = data.recomcode
          data.appurl = `${location.href.split('#')[0]}#/register/${code}`
          this.obj = data
        }
      });
    },
    getList() {
      let data = {
        page: this.page,
        limit: 99,
      };
      getInviteList(data).then((res) => {
        if (res.code == '200') {
          this.list = res.data;
          this.total = res.count;
        }
      });
    },
  },
  created() {
    this.init();
    this.getData();
    this.getList();
  },
};
</script>

<style scoped="scoped" lang="scss">
.invite {
  height: calc(100vh - 50px);
  min-height: 1000px;
}
.invite-bg {
  height: 300px;
  background: url('../../assets/InviteImg/bg.png') no-repeat;
  background-size: 100% 100%;
}
.title {
  font-size: 36px;
}
.header-text {
  padding: 6px 10px;
  background: rgba($mainColor, 0.3);
  border-radius: 20px;
  margin-top: 14px;
}
.invite-process {
  height: 327px;
  margin-top: -40px;
  box-shadow: 1px 0px 10px 0px rgba($border, 0.5);
  padding: 40px 20px;
  .list {
    width: 240px;
    height: 247px;
    background: rgba($mainColor, 0.1);
    border-radius: 4px;
    padding: 40px 20px;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
.indexFont {
  font-size: 60px;
}
.row-icon {
  width: 24px;
  height: 12px;
}
.invite-title {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  background: $border;
}
.main-page {
  height: 60px;
  position: relative;
  background: $whiteColor;
  border-top: 1px solid $contractBg;
}
.main-page span {
  display: inline-block;
  width: 100px;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
  border-radius: 10px;
}
.el-pagination {
  display: inline-block;
  margin: auto;
  background: transparent;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
