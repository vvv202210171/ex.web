import axios from 'axios';
import store from '@/store/index';
import Exif from 'exif-js';
import OSS from 'ali-oss';




export default {
  /**阿里oss 上传图片
   *
   */
  uploadAlioss(file, ossConfig) {
    const client = new OSS(ossConfig);
    let uploadPromise = new Promise((resolve, reject) => {
      //压缩
      this.compressPicture(file, (newFile) => {
        //压缩完成后走oss 上传
        //定义文件夹和文件名 fileName
        let fileName = `mobileImage/${
          ossConfig.bucket
        }_${new Date().getTime()}.jpg`;

        client
          .multipartUpload(fileName, newFile)
          .then((res) => {
            //上传成功 重新拼一个访问路径
            let imgUrl = `${ossConfig.ossUrl}${res.name}`;
            console.log(imgUrl);
            res && resolve(imgUrl);
          })
          .catch((e) => {
            console.log(e);
            reject();
          });
      });
    });

    return uploadPromise;
  },

  /**
   * 图片压缩
   * @param file 图片file格式
   */
  compressPicture(file, callback) {
    const vm = this;
    let img = document.createElement('img');
    let cvs = document.createElement('canvas');
    let zipBase64;
    if (file && file.size / 1024 > 200) {
      console.log('compress-picture');
      //如果图片过大 设置下每次压缩的比例  减少处理时间
      let ratio,
        fileSize = file.size / 1024;
      if (fileSize > 2000) {
        ratio = 0.3;
      } else if (fileSize > 1000) {
        ratio = 0.5;
      } else if (fileSize > 500) {
        ratio = 0.7;
      } else {
        ratio = 0.9;
      }

      let reader = new FileReader();
      reader.readAsDataURL(file); //  转成 base64 编码
      reader.onload = function (e) {
        let naturalBase64 = e.target.result; //  获取 base64 编码，这是原图的
        img.src = naturalBase64;
        img.onload = function () {
          cvs.width = img.naturalWidth * ratio;
          cvs.height = img.naturalHeight * ratio;
          let ctx = cvs.getContext('2d');
          ctx.drawImage(img, 0, 0, cvs.width, cvs.height); //  画在 canvas 上
          // 压缩后新图的 base64
          zipBase64 = cvs.toDataURL();
          let lastFile = vm.dataURLtoFile(zipBase64, 'upload.png');
          vm.compressPicture(lastFile, callback);
        };
      };
    } else {
      callback(file);
    }
  },
  dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  },

  imgPreview(file) {
    let compressImg = new Promise((resolve, reject) => {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation');
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result;
          let img = new Image();
          img.src = result;
          let data;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          // if (this.result.length <= (100 * 1024)) {
          //   data = "";
          //   resolve(data)
          // } else {
          img.onload = function () {
            data = self.compress(img, Orientation);
            resolve(data);
          };
          // }
        };
      }
    });
    return compressImg;
  },

  rotateImg(img, direction, canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    const min_step = 0;
    const max_step = 3;
    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    let height = img.height;
    let width = img.width;
    let step = 2;
    if (step == null) {
      step = min_step;
    }
    if (direction == 'right') {
      step++;
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
    } else {
      step--;
      step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    let degree = (step * 90 * Math.PI) / 180;
    let ctx = canvas.getContext('2d');
    switch (step) {
      case 0:
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);
        break;
      case 1:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, 0, -height);
        break;
      case 2:
        canvas.width = width;
        canvas.height = height;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, -height);
        break;
      case 3:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, 0);
        break;
    }
  },
  compress(img, Orientation) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    //瓦片canvas
    let tCanvas = document.createElement('canvas');
    let tctx = tCanvas.getContext('2d');
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = (width * height) / 4000000) > 1) {
      // console.log("大于400万像素")
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    //        铺底色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = (width * height) / 1000000) > 1) {
      // console.log("超过100W像素");
      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
      //            计算每块瓦片的宽和高
      let nw = ~~(width / count);
      let nh = ~~(height / count);
      tCanvas.width = nw;
      tCanvas.height = nh;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(
            img,
            i * nw * ratio,
            j * nh * ratio,
            nw * ratio,
            nh * ratio,
            0,
            0,
            nw,
            nh
          );
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    //修复ios上传图片的时候 被旋转的问题
    if (Orientation != '' && Orientation != 1) {
      switch (Orientation) {
        case 6: //需要顺时针（向左）90度旋转
          this.rotateImg(img, 'left', canvas);
          break;
        case 8: //需要逆时针（向右）90度旋转
          this.rotateImg(img, 'right', canvas);
          break;
        case 3: //需要180度旋转
          this.rotateImg(img, 'right', canvas); //转两次
          this.rotateImg(img, 'right', canvas);
          break;
      }
    }
    //进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.1);
    // console.log('压缩前：' + initSize);
    // console.log('压缩后：' + ndata.length);
    // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    // console.log(ndata)
    return ndata;
  },

  uploadImg(data, isBase64) {
    const vm = this;
    let uploadMethod = new Promise((resolve, reject) => {
      var formData = new FormData();
      if (isBase64) {
        formData.append('imgurl', vm.dataURLtoFile(data, 'upload.png'));
      } else {
        formData.append('imgurl', data);
      }
      formData.append('token', localStorage.getItem('token'));
      store.dispatch('common/showLoading', true);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      axios
        .post(Api.baseURL + Api.uploadImage.url, formData, config)
        .then((res) => {
          if (res.code == 0) {
            resolve(res.data[0].url);
          } else if (res.code == 1) {
            if (res.msg != 'token不能为空！') {
              Toast({ message: res.msg || '网络不给力' });
            }
          } else if (res.code == 2) {
            store.dispatch('common/showGoLoginPopup', true);
          }
          store.dispatch('common/showLoading', false);
        });
    });
    return uploadMethod;
  },
};
