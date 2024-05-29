import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import {Message} from 'element-ui';
import {router} from './router/index';
import '@/assets/css/element.scss';
import i18n from './i18n/i18n';
import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';
import store from './store';
import '@/api/websocket.js';
import moment from 'moment';

//全局组件
import AppHeader from './components/appHeader'; //头部组件
import AppFooter from './components/appFooter'; //脚部组件
import TradingView from './components/tradingView'; //tradingview 组件
import VueClipboard from 'vue-clipboard2';
import mixin from '@/Mixin';

Vue.prototype.$bus = new Vue();
Vue.use(ElementUI);
Vue.use(vuescroll);
Vue.use(AppHeader);
Vue.use(AppFooter);
Vue.use(TradingView);
Vue.use(VueClipboard);
// Vue.use(ContractAlert);

Vue.filter("ts_local", function (str, fmt = "yyyy/MM/dd hh:mm") {    
    if (!str) return str
      const TIME_ZONE = parseInt(store.state.getConfig.TIME_ZONE)
      let date = new Date(str)
      date.setHours(date.getHours() - (TIME_ZONE))
      if (date == 'Invalid Date') return str
      date = new Date(date.setHours(date.getHours() - 8))
      let timezone = -date.getTimezoneOffset() / 60;
      date.setHours(date.getHours() + timezone)
      const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" +
            o[k]).length)));
        }
      }
      return moment(str).format(fmt)
});

Object.assign(Vue.prototype, {
    goBack: () => {
        router.go(-1);
    },
    pushPath: (path, query) => {
        router.push({path: path, query: query || {}});
    },

    onCopy() {
        Message({
            message: i18n.t('mine.copy'),
            type: 'success',
        });
    },
});

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        // 判断该路由是否需要登录权限
        let token = localStorage.getItem('token');
        // if (token) {
        //   // 通过vuex state获取当前的token是否存在
        //   document.title = to.meta.title;
        //   next();
        // } else {
        //   next({
        //     path: '/login',
        //   });
        // }
        next();
    } else {
        // document.title = to.meta.enTitle;
        next();
    }
});

Vue.use(mixin);
new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App),
}).$mount('#box');
