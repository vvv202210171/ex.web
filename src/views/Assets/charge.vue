<template>
  <div class="charge navBg">
    <div class="cen">
      <div class="nav_header listBg allFlex">
        <span class="font-Eight titleColor Bold">{{
          $t("Assets.charge")
        }}</span>
        <span @click="goBack" class="navColor font-Four hand btnColorHover">{{
          $t("About.back")
        }}</span>
      </div>

      <div class="charge-box boxBg allFlex">
        <ul class="charge-left">
          <li>
            <p class="titleColor">{{ $t("Assets.coin") }}</p>
            <el-select v-model="coin">
              <el-option
                v-for="(item, key) in coinArr"
                :key="key"
                :value="item.name"
                >{{ item.name }}</el-option
              >
            </el-select>
          </li>

          <li v-if="chainArr.length > 1">
            <p class="titleColor">{{ $t("Assets.chain") }}</p>
            <div>
              <el-button
                size="mini"
                @click="
                  chainIndex = key;
                  getAddress(item);
                "
                :type="chainIndex == key ? 'primary' : ''"
                v-for="(item, key) in chainArr"
                :key="key"
                >{{ item.symbol }}</el-button
              >
            </div>
          </li>

          <li v-if="chargeObj" class="titleColor">
            <p>{{ $t("Assets.mentionBox.tips.one") }}</p>
            <p>
              {{ $t("Assets.mentionBox.tips.two", { coin: chargeObj.coin }) }}
            </p>
            <p>
              {{
                $t("Assets.mentionBox.tips.seven", {
                  min: chargeObj.oneinlow,
                  coin: chargeObj.coin,
                })
              }}
            </p>
            <p>{{ $t("Assets.mentionBox.tips.three") }}</p>
            <p>{{ $t("Assets.mentionBox.tips.five") }}</p>
            <p>{{ $t("Assets.mentionBox.tips.six") }}</p>
          </li>
        </ul>
        <ul v-if="chargeObj" class="f1 mention-right">
          <!-- 充币地址 -->
          <li>
            <p class="titleColor">{{ $t("Assets.chargeBox.title") }}</p>
            <el-input
              :placeholder="$t('Assets.placeholder')"
              v-model="address"
              disabled
            >
              <div slot="suffix">
                <el-button
                  type="primary"
                  size="mini"
                  v-clipboard:copy="address"
                  v-clipboard:success="onCopy"
                >
                  {{ $t("Assets.chargeDialog.copy") }}
                </el-button>
              </div>
            </el-input>
          </li>
          <!--冲币二维码-->
          <li>
            <div class="icon-box">
              <vue-qr :text="address || ''" qid="testid" :size="size"></vue-qr>
            </div>
          </li>

          <!-- 冲币数量 -->
          <li>
            <p class="titleColor">{{ $t("Assets.table.twelve") }}</p>
            <el-input
              type="number"
              :placeholder="$t('Assets.table.twelve')"
              v-model="depositNum"
            >
              <div slot="suffix">
                <span class="navColor">{{ coin }}</span>
              </div>
            </el-input>
          </li>

          <li class="mention-right_btn">
            <el-button
              type="primary"
              :disabled="finish"
              @click="addressShow = true"
              >{{ $t("Assets.mentionBox.submit") }}
            </el-button>
          </li>
        </ul>
      </div>
      <el-dialog
        :visible.sync="addressShow"
        :closeOnClickModal="false"
        width="40%"
        :title="$t('Assets.mentionBox.submit')"
      >
        <div class="realname">
          <ul>
            <li class="allFlex li">
              <span>{{ $t("Assets.chargeBox.id") }}</span>
              <input
                type="text"
                class="f1 titleColor"
                :placeholder="$t('Assets.chargeBox.label1')"
                v-model="orderNumber"
              />
            </li>
            <li class="startFlex li itCenter">
              <span>{{ $t("Verified.pic") }}:</span>
              <el-upload
                class="avatar-uploader marginTen"
                action="#"
                accept="image/*"
                :before-upload="fnBeforeUpload3"
                name="imgurl"
                :show-file-list="false"
              >
                <el-image
                  v-if="imgurl"
                  style="width: 100%; height: 100%"
                  :src="`/api/res/preview/${imgurl}`"
                  fit="cover"
                ></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon proFont"></i>
              </el-upload>
            </li>
          </ul>
          <div slot="footer" class="dialog-footer endFlex">
            <el-button @click="addressShow = false">{{
              $t("My.cancel")
            }}</el-button>
            <el-button
              type="primary"
              @click="submit"
              :disabled="!commitState"
              >{{ $t("My.comfirm") }}</el-button
            >
          </div>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="imgurl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import { mapGetters } from "vuex";
import { getChargeAddress, rgaddFiatPayOrder } from "@/api/Assets";
import Upload from "@/api/upload";
import {imgUpload} from "@/api/res";
export default {
  data() {
    return {
      size: 120,
      coin: "USDT",
      chainIndex: 0,
      address: "",
      chargeObj: {},
      chainArr: [],
      depositNum: null, //充值数量
      orderNumber: "", //订单号，
      addressShow: false, //证据弹窗
      imgurl: "", //充值截图
      dialogVisible: false,
    };
  },
  props: {},
  components: {
    VueQr,
  },

  computed: {
    ...mapGetters({
      coinArr: "chargeList",
    }),
    //输入冲币数量才能点提交按钮
    finish() {
      return (
        this.depositNum == "" ||
        Number(this.depositNum) <
          (this.chargeObj ? this.chargeObj.oneinlow : 0)
      );
    },
    //输入交易订单号才能提交订单
    commitState() {
      return this.orderNumber.length > 0 && this.imgurl.length > 0;
    },
  },
  watch: {
    coinArr(val) {
      this.chainArr = val[0].coinArr;
      this.coin = val[0].coinArr[0].coin;
    },
    coin(val) {
      this.chainIndex = 0;
      if (this.coinArr?.length > 0) {
        const arr = this.coinArr.filter((item) => item.name == val);
        this.chargeObj =
          arr.length > 0 ? arr[0].coinArr[0] : this.coinArr[0].coinArr[0];
        this.chainArr =
          arr.length > 0 ? arr[0].coinArr : this.coinArr[0].coinArr;
      }
    },
    chargeObj(val) {
      if (val.coin) {
        this.getAddress(val);
      }
      if (
        this.depositNum == "" ||
        Number(this.depositNum) < this.chargeObj.oneinlow
      ) {
        this.depositNum = this.chargeObj.oneinlow;
      }
    },
  },
  created() {
    this.$store.dispatch("getAllCoins");
    if (this.$route.query) {
      this.coin = this.$route.query.coin;
    }
  },

  mounted() {},

  methods: {
    getAddress(charge) {
      let data = {
        coin: charge.coin,
        symbol: charge.symbol,
        blockName: charge.blockname,
      };
      getChargeAddress(data).then((res) => {
        if (res.code == "200") {
          this.address = res.data.address;
        }
      });
    },
    submit() {
      const reg = /^[A-Za-z0-9]{4,64}$/ ;
      if(!reg.test(this.orderNumber)){
        this.$message.error(this.$t('Assets.chargeBox.label1'))
        return
      }
      const data = {
        coin: this.coin,
        blockname: this.chargeObj.blockname,
        address: this.address,
        number: this.depositNum,
        orderid: this.orderNumber,
        imgurl: this.imgurl
      };
      rgaddFiatPayOrder(data).then((res) => {
        if (res.code == "200") {
          this.$message.success(res.msg);
          this.$router.push({
            path: "/assets",
            query: {
              activeIndex: 2,
            },
          });
        }
      });
    },
    async fnBeforeUpload3(option) {
      const size = option.size / 1024 < 5000;
      if (!size) {
        this.$message.error(this.$t("Customer.placeholder4"));
        return false;
      }
      Upload.compressPicture(option, (file) => {
        let formData = new FormData();
        formData.append("imgurl", file);
        imgUpload(formData).then((res) => {
          if (res.code == 200) {
            this.imgurl = res.data[0].resseq;
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.charge {
  min-height: 100vh;
  height: 100%;
  > div {
    height: 100%;
    min-height: 600px;
    padding-bottom: 20px;
  }  
}
.copy-icon {
  width: 16px;
  height: 16px;
}
.charge-right {
  min-width: 450px;
  height: 430px;
  padding: 30px;
  border: 1px solid $borderColor;
}
.charge-left {
  width: 45%;
  margin-right: 20px;
  li {
    margin-bottom: 15px;
  }
  p {
    line-height: 40px;
  }
  &_title {
    line-height: 50px;
  }
  .el-button {
    width: 80px;
    height: 30px;
  }
}

.charge-box {
  margin-top: 18px;
  padding: 30px;
  height: 100%;
  min-height: 550px;
}
.mention-right {
  max-width: 500px;

  &_btn {
    margin-top: 40px;
  }

  li {
    margin-bottom: 15px;
  }

  p {
    line-height: 40px;
  }

  .el-input {
    height: 40px;
    line-height: 40px;
  }

  .el-button {
    width: 100%;
  }
}
.icon-box {
  margin-top: 50px;
  text-align: center;
  img {
    border-radius: 10px;
  }
}
.realname {
  padding: 0 20px;
}
.realname ul {
  li {
    height: 100px;
    border-bottom: 1px solid $border;
    span:first-child {
      line-height: 100px;
    }
    p {
      line-height: 26px;
    }
    input {
      border: 1px solid #959595;
      border-radius: 5px;
      height: 50px;
      display: flex;
      align-self: center;
      padding: 0px 10px;
    }
  }
}
.avatar-uploader {
  line-height: 40px;
  width: 40px;
  height: 40px;
  border: 1px solid $border;
  border-radius: 4px;
  text-align: center;
}
.el-icon-plus,
.avatar-uploader-icon {
  font-size: 20px;
}

::v-deep .el-select {
  .el-input.is-focus .el-input__inner, .el-input__inner:focus{
    border-color: var(--mian-bgColor);      
  }
}   
::v-deep .el-input__inner {
  color: var(--title-color);
}

::v-deep .el-button:hover, .el-button:focus {
  color: var(--title-color);
  background-color: var(--button-hoverColor);
  border-color: var(--mian-bgColor);
}

::v-deep .el-button--primary {
    background-color: var(--mian-bgColor);
    border-color: var(--mian-bgColor);
    &:hover{
      background-color: var(--button-hoverColor);
    }
}

::v-deep .el-input__inner:focus {
  border-color: var(--mian-bgColor);
}
</style>