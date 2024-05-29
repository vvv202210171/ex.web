<template>
  <div class="Wbg home-data ">
    <ul class="allFlex cen ">
      <li class="allFlex column">
        <span class="darkColor Bold font-Th">{{ obj.today }}</span>
        <span class="navColor">{{ $t('Home.data.one') }}</span>
      </li>
      <li class="allFlex column">
        <span class="darkColor Bold font-Th">{{ obj.today }}</span>
        <span class="navColor">{{ $t('Home.data.two') }}</span>
      </li>
      <li class="allFlex column">
        <span class="darkColor Bold font-Th">{{ obj.today }}</span>
        <span class="navColor">{{ $t('Home.data.three') }}</span>
      </li>
      <li class="allFlex column">
        <span class="darkColor Bold font-Th">{{ obj.today }}</span>
        <span class="navColor">{{ $t('Home.data.four') }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        today: 111111.11111,
      },
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.home-data {
  padding: 80px 0;
}
.home-data ul {
  flex-wrap: wrap;
  li {
    width: 50%;
    height: 120px;
    padding: 20px 0;
    border-top: 1px solid $whiteColor;
    border-bottom: 1px solid $whiteColor;
    align-items: center;
  }
}
</style>
