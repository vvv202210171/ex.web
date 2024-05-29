<template>
  <div class="box footerBg" v-if="footerShow">
    <ul class="footer cen centerFlex itCenter column">
      <li class="centerFlex">
        <router-link
            :to="item.url"
            tag="span"
            class="lightBlue footer-icon hand"
            v-for="(item, key) in arr1"
            :key="key"
            replace
        >{{ $t(item.title) }}
        </router-link
        >
      </li>
      <li class="center lightBlue opacity6 centerFlex itCenter">
        {{ $t('Footer.text') }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'appFooter',
  props: {
    footerShow: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  computed: {
    ...mapState({
      aboutInfo: (state) => state.aboutInfo,
    }),
  },

  data() {
    return {
      arr1: [
        {
          title: 'Footer.arr.one',
          url: '/about',
        },

        {
          title: 'Footer.arr.three',
          url: '/about',
        },
        {
          title: 'Footer.arr.five',
          url: '/userAgreement',
        },
        {
          title: 'Footer.arr.twelve',
          url: '/privacy',
        },
        {
          title: 'Footer.arr.two',
          url: '/aboutUs',
        },
        {
          title: 'Footer.arr.WhitePapers',
          url: '/whitePaper',
        },
      ],
    };
  },

  methods: {},

  watch: {},
};
</script>
<style scoped="scoped" lang="scss">
.box {
  height: 170px;
  width: 100vw;
  position: relative;

  .footer {
    height: 100%;

    li:first-child {
      height: 40px;
      line-height: 40px;
    }

    li:last-child {
      height: 70px;
    }
  }

  .footer-icon {
    padding: 0 20px;
    transition: ease-out 0.2s;

    &:hover {
      color: $borderColor;
    }
  }
}

.footer-text {
  height: 50px;
  line-height: 50px;
  border-top: 1px solid rgba($border, 0.5);
}

.about-ul {
  li {
    height: 35px;
    line-height: 35px;
  }
}

</style>
