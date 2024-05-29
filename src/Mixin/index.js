let mixin = {
  data() {
    return {
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true,
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right',
        },
        rail: {
          background: '#1ddaab',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: true,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: true,
          background: '#1ddaab',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        },
      },
    };
  },
  methods: {
    open() {
      let _this = this;

      this.$confirm(
        _this.$t('message.currency.open.title'),
        _this.$t('message.currency.open.prompt'),
        {
          confirmButtonText: _this.$t('message.currency.open.rightBtn'),
          cancelButtonText: _this.$t('message.currency.open.leftBtn'),
        }
      ).then(() => {
        this.$router.replace({
          path: '/mine',
        });
      });
    },
  },
};
export default mixin;
