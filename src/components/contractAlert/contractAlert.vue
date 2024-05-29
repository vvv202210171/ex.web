<template>
  <div class="alertBox">
    <el-dialog :visible.sync="dialogVisible" width="37%" :show-close="false">
      <!-- 中间 -->
      <ul class="main" ref="dialogBox">
        <li class="allFlex main-logo">
          <img src="@HomeImg/home-logo.png" alt="" class="logo-icon" />
          <span class="Wcolor preserve-btn btnBg hand" @click="toDown">{{
            $t('Alert.preserve')
          }}</span>
        </li>

        <!-- btcmex -->
        <li class="allFlex column center main-text">
          <span>Ho Bi</span>
          <span>{{ $t('Alert.online') }}</span>
        </li>

        <!-- 盈利金额 -->
        <li class="main-profit center">
          <span class="mainColor middleAll">{{ obj.number }}</span>
          <span class="Wcolor font-Tf">{{ $t('Alert.profit') }} USDT</span>
        </li>

        <!-- 周期 -->
        <li class="allFlex main-info">
          <div class="allFlex column f1 center">
            <span class="navColor font-Four">{{ $t(obj.title) }}</span>
            <span class="Wcolor">{{ obj.tradcoin }}/{{ obj.maincoin }}</span>
          </div>

          <div class="allFlex column f1 center">
            <span class="navColor font-Four">{{ $t(contract) }}</span>
            <div class="Wcolor">
              <span>{{ obj.lever }}</span>
              <span v-if="obj.type !== 1">{{ obj.type == 2 ? 's' : 'X' }}</span>
            </div>
          </div>

          <div class="allFlex column f1 center">
            <span class="navColor font-Four">{{ $t('Alert.price') }}</span>
            <span class="Wcolor">${{ obj.price }}</span>
          </div>
        </li>

        <!-- ercode -->
        <li class="main-code center">
          <vue-qr :text="url" :size="200"></vue-qr>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import vueQr from 'vue-qr';
export default {
  name: 'contractAlert',
  data() {
    return {
      dialogVisible: false,
      number: 1111,
      url: 'https://www.getex-vip/download/index.html',
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.$emit('hide');
      }
    },
    dialogShow(val) {
      if (val) {
        this.dialogVisible = true;
      }
    },
  },
  components: {
    vueQr,
  },
  props: {
    dialogShow: {
      type: Boolean,
      default: false,
    },
    obj: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    contract() {
      let str = '';
      switch (this.obj.type) {
        case 1:
          str = 'Alert.target';
          break;
        case 2:
          str = 'Alert.cycle';
          break;
        case 3:
          str = 'Alert.certain';
          break;
      }
      return str;
    },
    name() {
      let str = '';
      switch (this.obj.type) {
        case 1:
          str = 'target';
          break;
        case 2:
          str = 'cycle';
          break;
        case 3:
          str = 'certain';
          break;
      }
      return str;
    },
  },

  methods: {
    getCode() {
      let _this = this;
      let canvas = document.getElementById('code');
      QRCode.toCanvas(
        canvas,
        {
          text: _this.url,
          width: 128 * 5,
          height: 128 * 5,
        },
        function (error) {
          console.log(error);
          if (error) return;
        }
      );
    },
    toDown() {
      html2canvas(this.$refs.dialogBox, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: false,
      }).then((canvas) => {
        // 转成图片，生成图片地址
        let imgUrl = canvas.toDataURL('image/png');
        //保存图片
        var alink = document.createElement('a');
        alink.href = imgUrl;
        alink.download = `Ho Bi_${this.name}`; //图片名
        alink.click();
        this.dialogVisible = false;
      });
    },
  },
  mounted() {},
};
</script>

<style scoped="scoped" lang="scss">
:deep(.el-dialog__header) {
  padding: 0;
}
:deep(.el-dialog__body) {
  padding: 0;
}
.main {
  background: $bgGradient;
  padding: 20px;
}
.main-logo {
  align-items: center;
}
.logo-icon {
  width: 122px;
  height: 32px;
}
.preserve-btn {
  padding: 4px 10px;
  border-radius: 30px;
  background: $ligitBg;
}

.main-text {
  span {
    font-family: PingFang SC;
    font-weight: 800;
    color: $blueColor;

    line-height: 62px;
    // text-shadow: 0px 4px 12px rgba(2, 11, 47, 0.68);

    // background: linear-gradient(0deg, #1895fd 0%, #3febff 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    &:first-child {
      font-size: 36px;
    }

    &:last-child {
      line-height: 143px;
      font-size: 90px;
    }
  }
}

.main-profit {
  width: 350px;
  height: 80px;
  background: $navBg;
  border-radius: 8px;
  margin: 80px auto 0;

  position: relative;
  span:first-child {
    font-size: 40px;
    width: 100%;
    top: 0;
    transform: translate(-50%, -50%);
  }
  span:last-child {
    line-height: 100px;
  }
}

.main-info {
  margin: 40px 0;
  div {
    height: 45px;
  }
}

.main-code {
  #code {
    width: 100px;
    height: 100px;
  }
}
</style>
