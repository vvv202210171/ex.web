<template>
  <div class="realname">
    <ul>
      <li class="allFlex">
        <span
          :style="{
            width:
              $i18n.locale == 'FR' || $i18n.locale == 'ES' ? '160px' : '120px',
          }"
          >{{ $t('Verified.Name') }}</span
        >
        <input
          maxlength="28"
          type="text"
          class="f1 titleColor"
          :placeholder="$t('Verified.NameIpn')"
          v-model="realForm.username"
          :disabled="disabled"
        />
      </li>
      <li class="allFlex">
        <span
          :style="{
            width:
              $i18n.locale == 'FR' || $i18n.locale == 'ES' ? '160px' : '120px',
          }"
          >{{ $t('Verified.type') }}</span
        >
        <span class="f1 titleColor"
          >{{ $t('Verified.typeIpn') }}/{{ $t('Verified.typeHz') }}</span
        >
      </li>
      <li class="allFlex">
        <span
          :style="{
            width:
              $i18n.locale == 'FR' || $i18n.locale == 'ES' ? '160px' : '120px',
          }"
          >{{ $t('Verified.id') }}</span
        >
        <input
          type="text"
          maxlength="28"
          class="f1 titleColor"
          :placeholder="$t('Verified.idIpn')"
          v-model="realForm.idCard"
          :disabled="disabled"
        />
      </li>

      <li class="allFlex">
        <span
          :style="{
            width:
              $i18n.locale == 'FR' || $i18n.locale == 'ES' ? '160px' : '120px',
          }"
          >{{ $t('Verified.onload') }}</span
        >
        <div v-if="disabled" class="allFlex f1 itCenter">
          <div class="f1 centerFlex column">
              <el-image
                  v-if="realForm.zm"
                  class="avatar-uploader"
                  :src="`/api/res/preview/${realForm.zm}`"
                  fit="cover"
                  :preview-src-list="[`/api/res/preview/${realForm.zm}`]"
              />
            <p class="center titleColor">{{ $t('Verified.zm') }}</p>
          </div>
          <div class="f1 centerFlex column">
              <el-image
                  v-if="realForm.fm"
                  class="avatar-uploader"
                  :src="`/api/res/preview/${realForm.fm}`"
                  fit="cover"
                  :preview-src-list="[`/api/res/preview/${realForm.fm}`]"
              ></el-image>

            <p class="center titleColor">{{ $t('Verified.fm') }}</p>
          </div>
          <div class="f1 centerFlex column">
              <el-image
                  v-if="realForm.sc"
                  class="avatar-uploader"
                  :src="`/api/res/preview/${realForm.sc}`"
                  fit="cover"
                  :preview-src-list="[`/api/res/preview/${realForm.sc}`]"
              />
            <p class="center titleColor">{{ $t('Verified.sc') }}</p>
          </div>
        </div>
        <div v-else class="allFlex f1 itCenter">
          <div class="f1 centerFlex column column">
            <el-upload
              class="avatar-uploader"
              action="#"
              accept="image/*"
              :before-upload="fnBeforeUpload1"
              name="imgurl"
              :show-file-list="false"
              :disabled="disabled"
            >
              <el-image
                v-if="realForm.zm"
                class="avatar-uploader"
                :src="`/api/res/preview/${realForm.zm}`"
                fit="cover"
              ></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon proFont"></i>
            </el-upload>
            <p class="center titleColor">{{ $t('Verified.zm') }}</p>
          </div>
          <div class="f1">
            <el-upload
              class="avatar-uploader marginTen"
              action="#"
              accept="image/*"
              :before-upload="fnBeforeUpload2"
              name="imgurl"
              :show-file-list="false"
              :disabled="disabled"
            >
              <el-image
                  class="avatar-uploader"
                v-if="realForm.fm"
                :src="`/api/res/preview/${realForm.fm}`"
                fit="cover"
              ></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon proFont"></i>
            </el-upload>
            <p class="center titleColor">{{ $t('Verified.fm') }}</p>
          </div>
          <div class="f1">
            <el-upload
              class="avatar-uploader marginTen"
              action="#"
              accept="image/*"
              :before-upload="fnBeforeUpload3"
              name="imgurl"
              :show-file-list="false"
              :disabled="disabled"
            >
              <el-image
                  class="avatar-uploader"
                v-if="realForm.sc"
                :src="`/api/res/preview/${realForm.sc}`"
                fit="cover"
              ></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon proFont"></i>
            </el-upload>
            <p class="center titleColor">{{ $t('Verified.sc') }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div slot="footer" class="dialog-footer endFlex">
      <el-button @click="hide">{{ $t('My.cancel') }}</el-button>
      <el-button :disabled="disabled" type="primary" @click="submit">{{
        $t('My.comfirm')
      }}</el-button>
    </div>
  </div>
</template>

<script>
import Upload from '@/api/upload';
import {imgUpload} from "@/api/res";
export default {
  data() {
    return {
      idmodule: '',
      imageUrl2: '',
      imageUrl1: '',
      imageUrl3: '',
      disabled: false,
      name: '',
      card: '',
      realForm: {
        username: '',
        idCard: '',
        zm: '',
        fm: '',
        sc: '',
      },
      ossConfig: {
        region: '',
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '',
        ossUrl: '',
        secure: true,
        stsToken: '',
      },
    };
  },

  watch: {
    showRealName(val){
      if (val) {
        this.realForm.username = this.$store.state.accountInfo.username
        this.realForm.idCard = this.$store.state.accountInfo.idcard;
        this.realForm.zm =this.$store.state.accountInfo.zm
        this.realForm.fm = this.$store.state.accountInfo.fm
        this.realForm.sc = this.$store.state.accountInfo.sc
        this.disabled = true;
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    showRealName: {
      type: Boolean,
      default: true,
    }
  },
  created() {
    if(this.showRealName) {
      this.realForm.username = this.$store.state.accountInfo.username
      this.realForm.idCard = this.$store.state.accountInfo.idcard;
      this.realForm.zm =this.$store.state.accountInfo.zm
      this.realForm.fm = this.$store.state.accountInfo.fm
      this.realForm.sc = this.$store.state.accountInfo.sc
      this.disabled = true;
    }
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
    submit() {
      if (this.realForm.username == '') {
        this.$message.warning(this.$t('alert.realname'));
        return;
      }

      //身份证号
      if (this.realForm.idCard == '') {
        this.$message.warning(this.$t('alert.idCard'));
        return;
      }

      if (this.realForm.zm == '') {
        this.$message.warning(this.$t('alert.zm'));
        return;
      }

      if (this.realForm.fm == '') {
        this.$message.warning(this.$t('alert.zm'));
        return;
      }

      this.$emit('submitReal', this.realForm);
    },
    async fnBeforeUpload1(option) {
      const size = option.size / 1024  < 5000;
      if (!size) {
        this.$message.error(this.$t('Customer.placeholder4'));
        return false;
      }
      Upload.compressPicture(option, (file) => {
        let formData = new FormData();
        formData.append('imgurl', file);
        imgUpload(formData).then((res) => {
          if (res.code == 200) {
            this.realForm.zm = res.data[0].resseq
          }
        });
      });
    },
    async fnBeforeUpload2(option) {
      const size = option.size / 1024  < 5000;
      if (!size) {
        this.$message.error(this.$t('Customer.placeholder4'));
        return false;
      }
      Upload.compressPicture(option, (file) => {
        let formData = new FormData();
        formData.append('imgurl', file);
        imgUpload(formData).then((res) => {
          if (res.code == 200) {
            this.realForm.fm = res.data[0].resseq
          }
        });
      });
    },
    async fnBeforeUpload3(option) {
      const size = option.size / 1024  < 5000;
      if (!size) {
        this.$message.error(this.$t('Customer.placeholder4'));
        return false;
      }
      Upload.compressPicture(option, (file) => {
        let formData = new FormData();
        formData.append('imgurl', file);
        imgUpload(formData).then((res) => {
          if (res.code == 200) {
            this.realForm.sc = res.data[0].resseq
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.realname {
  padding: 0 20px;
  height: 330px;
}
.realname ul {
  li:not(:last-child) {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid $border;
    input {
      height: 100%;
    }
  }
  li:last-child {
    height: 100px;
    border-bottom: 1px solid $border;
    span:first-child {
      line-height: 100px;
    }
    p {
      line-height: 26px;
    }
  }
}

.avatar-uploader {
  width: 40px;
  height: 40px;
  border: 1px solid $border;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
}
.el-icon-plus,
.avatar-uploader-icon {
  font-size: 20px;
}
</style>
