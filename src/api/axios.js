import axios from 'axios';
import { router } from '../router/index';
import { Message } from 'element-ui';
import store from '../store';
import { Loading } from 'element-ui';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';

// http请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// http响应拦截器
let type;
axios.interceptors.response.use(
  (data) => {
    if (data.data.code == '200') {
      return data;
    } else {
      if (data.data.code == '401') {
        localStorage.removeItem('token');
        store.commit('back');
        router.push('/login');
        return data;
      }
      Message.error({
        message: data.data.msg,
      });
    }
    return data;
  },
  (error) => {
    // Message.error({
    //   message: '请求失败',
    // });
    return Promise.reject(error);
  }
);

export function get(url, params, headers = {}) {
    let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
    });
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        headers: {
          token: localStorage.getItem('token') || '',
          locale: localStorage.getItem('lang') || 'EN',
        },
      })
      .then((res) => {
          loadingInstance.close()
        resolve(res.data);
      })
      .catch((err) => {
          loadingInstance.close()
        reject(err);
      });
  });
}

export function post(url, params) {
    let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
    });
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          token: localStorage.getItem('token') || '',
          locale: localStorage.getItem('lang') || 'EN',
        },
      })
      .then((res) => {
          loadingInstance.close()
        resolve(res.data);
      })
      .catch((err) => {
          loadingInstance.close()
        reject(err);
      });
  });
}
