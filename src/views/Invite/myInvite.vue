<template>
  <div class="my-invite">
    <div class="invite-title titleColor">{{ $t('invite.myInvite') }}</div>
    <div class="invite-data allFlex">
      <ul class="f2 allFlex column">
        <li class="invite-data_url">
          <span class="navColor">{{ $t('invite.label1') }}</span>
          <div class="copybox titleColor padding allFlex itCenter">
            <span>{{ data.appurl}}</span>
            <img
              class="hand"
              src="@ContractImg/copy.png"
              alt=""
              v-clipboard:copy="data.appurl"
              v-clipboard:success="onCopy"
            />
          </div>
        </li>
        <li class="invite-data_code">
          <span class="navColor">{{ $t('invite.label2') }}</span>
          <div class="copybox padding titleColor allFlex itCenter">
            <span>{{ data.recomcode || '--' }}</span>
            <img
              class="hand"
              src="@ContractImg/copy.png"
              alt=""
              v-clipboard:copy="data.recomcode"
              v-clipboard:success="onCopy"
            />
          </div>
        </li>
      </ul>

      <!-- number -->
      <div class="f1 column centerFlex itCenter invite-number">
        <span class="mainColor font-Tf">{{ data.direct_people || 0 }}</span>
        <span class="titleColor">{{ $t('invite.label3') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.my-invite {
  height: 285px;
  margin-top: 40px;
  border: 1px solid $border;
}
.invite-title {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  background: $border;
}
.invite-data {
  padding: 20px 40px;
  height: 245px;
  &_code {
    width: 60%;
  }
  li {
    > span {
      line-height: 40px;
    }
    .copybox {
      height: 50px;
      border: 1px solid $navColor;
      border-radius: 4px;
    }
    img {
      width: 20px;
    }
  }
}
.invite-number {
  margin-left: 20px;
  border-left: 1px solid $border;
}
</style>
