<template>
  <div class="main-nav">
    <div class="listBg nav_header_title titleColor font-Four">
      {{ $t('My.title3') }}
    </div>
    <div class="nav-data">
      <!-- 提币地址 -->
      <ul class="allFlex ul-border">
        <li class="startFlex">
          <img src="@MyImg/my-icon6.png" alt="" class="left-icon" />
          <div class="centerFlex column marginTen">
            <span class="titleColor font-Four">{{ $t('My.title6') }}</span>
            <span class="navColor font-Two">{{ $t('My.proTitle4') }}</span>
          </div>
        </li>
        <li class="endFlex">
          <span class="marginTy mainColor hand" @click="$emit('add')">{{
            $t('My.add')
          }}</span>
          <!-- <span class="marginTy mainColor hand">{{ $t('My.operation') }}</span> -->
        </li>
      </ul>

      <!-- 提币地址列表 -->
      <div class="address-ul">
        <ul
          v-for="(item, key) in dataArr"
          :key="'data' + key"
          class="allFlex ul-border"
        >
          <li class="allFlex column">
            <div class="startFlex">
              <span class="titleColor font-Four">{{ item.coin }}</span>
              <span class="mainColor font-Two marginTen">{{ item.title }}</span>
            </div>

            <span class="titleColor">{{ item.address }}</span>
          </li>
          <li class="endFlex">
            <!-- <span class="marginTy mainColor hand">{{ $t('My.add') }}</span> -->
            <span class="marginTy redColor hand" @click="del(item)">{{
              $t('My.del')
            }}</span>
          </li>
        </ul>
      </div>

      <!-- 帮助中心 -->
      <ul class="allFlex">
        <li class="startFlex">
          <img src="@MyImg/my-icon7.png" alt="" class="left-icon" />
          <div class="centerFlex column marginTen">
            <span class="titleColor font-Four">{{ $t('My.title7') }}</span>
            <span class="proText font-Two">{{ $t('My.proTitle5') }}</span>
          </div>
        </li>
        <li class="endFlex">
          <span class="marginTy mainColor hand" @click="$emit('set')">{{
            $t('My.add')
          }}</span>
        </li>
      </ul>

      <!-- 工单列表 -->
      <div class="address-ul">
        <ul
          v-for="(item, key) in workList"
          :key="'data' + key"
          class="allFlex ul-border"
        >
          <li class="allFlex column">
            <div class="startFlex">
              <span class="titleColor font-Four">{{ item.title }}</span>
              <span class="navColor font-Two marginTen">{{ item.wdate }}</span>
            </div>

            <span class="titleColor">{{ item.quest }}</span>
            <div v-if="item.images && item.imagesArr.length > 0">
              <el-image
                v-for="(item, key) in item.imagesArr"
                :src="`/api/res/preview/${item}`"
                :key="'image' + key"
                class="quest-img hand"
                fit="cover"
                :preview-src-list="item.imagesArr"
              ></el-image>
            </div>
          </li>
          <li class="endFlex">
            <!-- <span class="marginTy mainColor hand">{{ $t('My.add') }}</span> -->
            <span class="marginTy mainColor">{{
              item.state == 'already' ? item.reply : $t(filterType(item.state))
            }}</span>
          </li>
        </ul>
      </div>

      <!-- 抵扣劵 -->
      <!-- <ul class="allFlex ">
        <li class="startFlex">
          <img src="@MyImg/my-icon8.png" alt="" class="left-icon" />
          <div class="centerFlex column marginTen">
            <span class="titleColor font-Four">{{ $t('My.title8') }}</span>
            <span class="proText font-Two">{{ $t('My.proTitle6') }}</span>
          </div>
        </li>
        <li class="endFlex">
          <span class="marginTy mainColor hand" @click="$emit('see')">{{
            $t('My.see')
          }}</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dataArr: {
      type: Array,
      default: () => [],
    },
    workList: {
      type: Array,
      default: () => [],
    },
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    del(obj) {
      this.$emit('delAddress', obj);
    },
    filterType(val) {
      let str = '';
      switch (val) {
        case 'sending':
          str = 'Customer.label.one';
          break;
        case 'already':
          str = 'Customer.label.one';
          break;
        case 'close':
          str = 'Customer.label.two';
          break;
      }
      return str;
    },
  },
};
</script>
<style lang="scss" scoped>
.main-nav {
  border: 1px solid $border;
  margin-bottom: 40px;
}
.nav_header_title {
  height: 50px;
  line-height: 50px;
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
}
.nav-data {
  padding: 0 30px;
  .ul-border {
    border-bottom: 1px solid $border;
  }
}
.nav-data li {
  min-height: 84px;
  align-items: center;
}
.left-icon {
  width: 48px;
  height: 48px;
}
.address-ul {
  padding: 0 40px;
  li:first-child {
    align-items: flex-start;
    padding: 20px 0;
  }
}
.quest-img {
  width: 40px;
  height: 40px;
}
</style>
