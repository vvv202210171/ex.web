<template>
  <div class="about navBg">
    <!-- banner -->
    <div class="about-banner centerFlex itCenter">
      <ul>
        <li class="Wcolor font-Ts about-banner_title center">
          {{ $t('About.bannerText') }}
        </li>
        <li class="centerFlex">
          <el-input
            v-model.trim="searchVal"
            :placeholder="$t('About.placeholder')"
            class="ipt"
          ></el-input>
          <el-button type="primary" @click.stop="toSearch" class="marginTen">{{
            $t('About.search')
          }}</el-button>
        </li>
      </ul>
    </div>

    <!-- 文章 -->
    <div class="cen about-article boxBg" v-if="!detailsShow">
      <div class="allFlex about-article_box">
        <!-- 列表 -->
        <ul
          class="article-left"
          :style="{ width: $i18n.locale == 'AR' ? '200px' : '300px' }"
        >
          <li
            v-for="(item, key) in leftArr"
            :key="key"
            @click="index = key"
            class="font-Six hand"
            :class="index == key ? 'mainColor' : 'navColor'"
          >
            {{ $t(item.title) }}
          </li>
        </ul>

        <!-- 内容 -->
        <div class="article-right f1">
          <div class="titleColor font-Tf Bold article-right_title">
            {{ searchVal ? $t('About.result') : $t(title) }}
          </div>
          <ul
            class="article-right_ul navColor"
            v-if="searchArr.length > 0 && finish"
          >
            <li
              class="allFlex hand"
              v-for="(item, key) in searchArr"
              :key="key"
              @click="toDetails(item, key)"
            >
              <span>{{ item.title }}</span>
              <span>{{ item.wdate | ts_local }}</span>
            </li>
          </ul>

          <!-- 暂无记录 -->
          <div class="centerFlex column itCenter no_data" v-else>
            <img src="@AboutImg/no-record.png" alt="" class="" />
            <span class="navColor font-Ty">{{ $t('message.noRecord') }}</span>
          </div>
        </div>
      </div>
    </div>

    <notice-details
      :leftArr="list"
      :detailsObj="detailsObj"
      @back="detailsShow = false"
      @check="check"
      :index="infoIndex"
      v-else
    ></notice-details>
  </div>
</template>
<script>
import { getNotice } from '@/api/Account';
export default {
  data() {
    return {
      index: 0,
      infoIndex: 0,
      leftArr: [
        {
          title: 'About.nav.one',
          type: 'notice',
        },
        // {
        //   title: 'About.nav.two',
        //   type: 'activity',
        // },
        // {
        //   title: 'About.nav.three',
        //   type: 'protocol',
        // },
        // {
        //   title: 'About.nav.four',
        //   type: 'coins',
        // },
        // {
        //   title: 'About.nav.five',
        //   type: 'contract',
        // },
        {
          title: 'About.nav.six',
          type: 'help',
        },
      ],
      list: [],
      searchArr: [],
      detailsObj: {},
      detailsShow: false,
      finish: false,
      searchVal: '',
    };
  },
  components: {
    noticeDetails(resolve) {
      return require(['./details'], resolve);
    },
  },
  computed: {
    title() {
      return this.leftArr[this.index].title;
    },
    type() {
      return this.leftArr[this.index].type;
    },
    locale() {
      return this.$i18n.locale;
    }
  },
  watch: {
    index() {
      this.initData();
    },
    searchVal(val) {
      if (val) {
        this.searchArr = this.list.filter(
          (item) => item.title.indexOf(val) >= 0
        );
      }
    },
    locale() {
      this.initData(false);
    },
  },
  methods: {
    toSearch() {
      if (this.searchVal == '') {
        this.$message.warning(this.$t('About.alert1'));
        return;
      }
      if (this.searchArr.length == 0) {
        this.$message.warning(this.$t('About.noBack'));
        return;
      }
    },
    check(index) {
      this.detailsObj = this.list[index];
      this.infoIndex = index;
    },
    toDetails(obj, index) {
      this.detailsObj = obj;
      this.infoIndex = index;
      this.detailsShow = true;
    },
    initData(bool) {
      //请求
      getNotice({ type: this.type }).then((res) => {
        if (res.code == '200') {
          this.list = res.data;
          this.searchArr = res.data;
          this.finish = true;
          this.detailsObj = bool ? this.$route.query.info : this.list[0];
        }
      });
    },
  },
  created() {
    if (this.$route.query.info) {
      this.initData(true);
      this.detailsShow = true;
      this.infoIndex = this.$route.query.index;
    } else {
      this.initData(false);
    }
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.about {
  padding-bottom: 40px;
}
.about-banner {
  height: 300px;
  background: url('../../assets/AboutImg/banner.png') no-repeat;
  background-size: 100% 100%;
  ul {
    width: 450px;
  }
  &_title {
    line-height: 80px;
  }
}
.about-article {
  min-height: 935px;
  padding: 30px 10px;
  margin-top: -30px;
  border-radius: 4px;
  box-shadow: 1px 0 10px 0 rgba(#2f364c, 0.5);
}

.article-left {
  height: 100%;
  li {
    transition: ease-in-out 0.1s;
    height: 38px;
    line-height: 38px;
    border-radius: 4px;

    &:hover {
      color: $mainColor;
    }
  }
}
.article-right {
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  &_title {
    margin-bottom: 30px;
  }
  &_ul {
    li {
      border-bottom: 1px solid $border;
      height: 48px;
      line-height: 48px;
      position: relative;
      padding: 0 10px 0 20px;
      transition: ease-in-out 0.2s;
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: $whiteColor;
        top: 50%;
        left: 4px;
        transform: translate(0, -50%);
      }

      &:hover {
        background-color: rgba(var(--mian-bgColor), 0.08);
        color: $mainColor;
        &::after {
          background: $mainColor;
        }
      }
    }
  }
}

.no_data {
  height: 200px;
  img {
    width: 100px;
  }
  span {
    line-height: 30px;
  }
}
.ipt.el-input {
  margin-right: 10px;
}
.ipt.el-input :deep(.el-input__inner) {
  background: rgba($boxBg, 0.3);
}
</style>
