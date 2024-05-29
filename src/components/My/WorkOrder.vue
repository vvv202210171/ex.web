<template>
  <div class="realname">
    <ul>
      <li class="allFlex li">
        <span>{{ $t('Customer.title1') }}</span>
        <input
          type="text"
          class="f1 titleColor"
          :placeholder="$t('Customer.placeholder1')"
          v-model="title"
        />
      </li>
      <li class="allFlex textarea">
        <span>{{ $t('Customer.title2') }}</span>
        <textarea
          type="text"
          class="f1 titleColor"
          :placeholder="$t('Customer.placeholder2')"
          v-model="quest"
        />
      </li>
      <li class="flex_between upload-li">
        <span>{{ $t('Verified.pic') }}</span>
        <div class="startFlex f1 itCenter">
          <el-image
            v-for="(item, key) in questArr"
            :key="key"
            class="avatar-uploader hand"
            :src="`/api/res/preview/${item}`"
            fit="cover"
          ></el-image>

          <div v-if="questArr.length < 4">
            <el-upload
              class="avatar-uploader"
              accept="image/*"
              action=""
              :before-upload="fnBeforeUpload"
              name="imgurl"
            >
              <i class="el-icon-plus avatar-uploader-icon proFont"></i>
            </el-upload>
          </div>
        </div>
      </li>
    </ul>
    <div slot="footer" class="dialog-footer endFlex">
      <el-button @click="hide">{{ $t('My.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{
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
      title: '',
      quest: '',
      questArr: [],
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
    show(val) {
      if (!val) {
        this.title = '';
        this.quest = '';
        this.questArr = [];
      }
    },
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    async fnBeforeUpload(option) {
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
            this.questArr.push(res.data[0].resseq)
          }
        });
      });

      // let res = await getKeys();
      // try {
      //   this.ossConfig.region = res.data.region;
      //   this.ossConfig.accessKeyId = res.data.credentials.accessKeyId;
      //   this.ossConfig.accessKeySecret = res.data.credentials.accessKeySecret;
      //   this.ossConfig.bucket = res.data.bucket;
      //   this.ossConfig.ossUrl = res.data.ossUrl;
      //   this.ossConfig.stsToken = res.data.credentials.securityToken;
      //   Upload.uploadAlioss(option, this.ossConfig).then((url) => {
      //     this.questArr.push(url);
      //   });
      // } catch {
      //   console.log('error');
      // }
    },
    hide() {
      this.$emit('hide');
    },
    submit() {
      if (this.title == '') {
        this.$message.warning(this.$t('Customer.placeholder1'));
        return;
      }
      if (this.quest == '') {
        this.$message.warning(this.$t('Customer.placeholder3'));
        return;
      }
      const image = this.questArr.join(',');
      this.$emit('subWork', this.title, this.quest, image);
    },
  },
};
</script>
<style lang="scss" scoped>
.realname {
  padding: 0 20px;
  height: 380px;
}
.realname ul {
  li:not(:last-child) {
    border-bottom: 1px solid $border;

    span:first-child {
      width: 100px;
    }
    input {
      height: 100%;
    }
  }
  li:last-child {
    height: 100px;
    border-bottom: 1px solid $border;
    span:first-child {
      width: 100px;
      line-height: 100px;
    }
    p {
      line-height: 26px;
    }
  }
}
.li {
  height: 55px;
  line-height: 55px;
}
.textarea {
  height: 120px;

  span {
    line-height: 55px;
  }
  textarea {
    background: transparent;
    height: 100%;
    line-height: 30px;
  }
}

.avatar-uploader {
  width: 40px;
  height: 40px;
  border: 1px solid $border;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}
.el-icon-plus,
.avatar-uploader-icon {
  font-size: 20px;
}
</style>
