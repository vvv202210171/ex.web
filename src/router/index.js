import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'home',
    },

    //首页
    {
      path: '/home',
      name: 'home',
      component: (resolve) => require(['@/views/Home'], resolve),
      meta: {
        enTitle: 'Coinbase Lite',
        zhTitle: 'Coinbase Lite',
        requireAuth: false,
      },
    },
    //ieo
    // {
    //   path: '/ieo',
    //   name: 'ieo',
    //   component: (resolve) => require(['@/views/IEO'], resolve),
    //   meta: {
    //     enTitle: 'IEO',
    //     zhTitle: 'IEO',
    //     position: 'relative',
    //     footer: false,
    //     requireAuth: false,
    //     star: true,
    //   },
    // },
    // {
    //   path: '/ieoRecord',
    //   name: 'ieoRecord',
    //   component: (resolve) => require(['@/views/IEO/ieoRecord'], resolve),
    //   meta: {
    //     enTitle: 'IEO',
    //     zhTitle: 'IEO',
    //     position: 'relative',
    //     footer: false,
    //     requireAuth: false,
    //     star: true,
    //   },
    // },

    {
      path: '/mining',
      name: 'mining',
      component: (resolve) => require(['@/views/Mining'], resolve),
      meta: {
        enTitle: 'mining',
        zhTitle: '锁仓挖矿',
        requireAuth: false,
      },
    },

    //周期合约
    {
      path: '/currency',
      name: 'currency',
      component: (resolve) => require(['@/views/currency'], resolve),
      meta: {
        enTitle: 'Currency',
        zhTitle: '币币交易',

        requireAuth: false,
      },
    },

    //杠杆合约
    {
      path: '/certain',
      name: 'certain',
      component: (resolve) => require(['@/views/Certain'], resolve),
      meta: {
        enTitle: 'Leverage',
        zhTitle: '合约',

        requireAuth: false,
      },
    },
    {
      path: '/cycle',
      name: 'cycle',
      component: (resolve) => require(['@/views/Cycle'], resolve),
      meta: {
        enTitle: 'Cycle',
        zhTitle: '秒合约',

        requireAuth: true,
      },
    },
    // {
    //   path: '/fiat',
    //   name: 'fiat',
    //   component: (resolve) => require(['@/views/Fiat'], resolve),
    //   meta: {
    //     enTitle: 'Fiat',
    //     zhTitle: '法币',
    //     position: 'relative',
    //     footer: false,
    //     requireAuth: true,
    //     star: true,
    //   },
    // },

    //用户协议
    {
      path: '/userAgreement',
      name: 'userAgreement',
      component: (resolve) => require(['@/views/userAgreement.vue'], resolve),
      meta: {
        zhTitle: '用户协议',
        enTitle: 'user agreement',

        requireAuth: false,
      },
    },

    //资产
    {
      path: '/assets',
      name: 'assets',
      component: (resolve) => require(['@/views/Assets'], resolve),
      meta: {
        enTitle: 'Assets',
        zhTitle: '资产',

        requireAuth: false,
      },
    },
    {
      path: '/charge',
      name: 'charge',
      component: (resolve) => require(['@/views/Assets/charge.vue'], resolve),
      meta: {
        enTitle: 'charge',
        zhTitle: '充值',

        requireAuth: false,
      },
    },
    {
      path: '/mention',
      name: 'mention',
      component: (resolve) => require(['@/views/Assets/mention.vue'], resolve),
      meta: {
        enTitle: 'mention',
        zhTitle: '提现',

        requireAuth: false,
      },
    },
    //订单
    {
      path: '/order',
      name: 'order',
      component: (resolve) => require(['@/views/Order'], resolve),
      meta: {
        enTitle: 'Orders',
        zhTitle: '订单',

        requireAuth: false,
      },
    },

    //关于
    {
      path: '/about',
      name: 'about',
      component: (resolve) => require(['@/views/About'], resolve),
      meta: {
        enTitle: 'HelpCenter',
        zhTitle: '帮助中心',

        requireAuth: false,
      },
    },

    //登录
    {
      name: 'login',
      path: '/login',
      component: (resolve) => require(['@/views/login'], resolve),
      meta: {
        enTitle: 'Login',
        zhTitle: '登录',

        requireAuth: false,
      },
    },

    //注册

    {
      name: 'register',
      path: '/register/:code',
      component: (resolve) => require(['@/views/register'], resolve),
      meta: {
        enTitle: 'Register',
        zhTitle: '注册',

        requireAuth: false,
      },
    },

    //个人中心
    {
      path: '/mine',
      name: 'mine',
      component: (resolve) => require(['@/views/mine'], resolve),
      meta: {
        enTitle: 'Account',
        zhTitle: '个人中心',

        requireAuth: true,
      },
    },
    //分享好友
    {
      path: '/invite',
      name: 'invite',
      component: (resolve) => require(['@/views/Invite/index.vue'], resolve),
      meta: {
        enTitle: 'Invite',
        zhTitle: '邀请好友',

        requireAuth: true,
      },
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: (resolve) => require(['@/views/aboutUs.vue'], resolve),
      meta: {
        enTitle: 'about us',
        zhTitle: '关于我们',
        requireAuth: true,
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: (resolve) => require(['@/views/privacyPolicy'], resolve),
      meta: {
        enTitle: 'privacy policy',
        zhTitle: '隐私政策',

        requireAuth: false,
      },
    },
    {
      path: '/whitePaper',
      name: 'whitePaper',
      component: (resolve) => require(['@/views/WhitePapers/index.vue'], resolve),
      meta: {
        enTitle: 'whitePaper',
        zhTitle: '白皮書',
        requireAuth: true,
      },
    },
  ],
});

const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
