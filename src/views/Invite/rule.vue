<template>
  <div class="rule">
    <div class="invite-title titleColor">{{ $t('invite.rule') }}</div>
    <ul class="rule-ul">
      <li v-for="(item, index) in rules" class="navColor" :key="'rule' + index">
        {{ $t(item) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: [
        'invite.rules.one',
        'invite.rules.two',
        'invite.rules.three',
        'invite.rules.four',
        'invite.rules.five',
        'invite.rules.six',
      ],
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.rule {
  margin-top: 40px;
  border: 1px solid $whiteColor;
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
</style>
