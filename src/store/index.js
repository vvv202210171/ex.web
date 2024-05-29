import Vue from 'vue';
import Vuex from 'vuex';
import { quantityFn } from '@/utils/index.js';
import { getCoinList, getCoinMentionList, getUsdRate } from '@/api/Assets';
import { getLinkInfo } from '@/api/Account';
import { getFiatCoin, getPayFiatCoin } from '@/api/Fiat';
import { getAccountInfo, getConfig } from '@/api/Account';
import Getters from './getter';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    login: localStorage.getItem("login") || false,
    accountInfo: JSON.parse(localStorage.getItem("accountinfo")) || {},
    userId: localStorage.getItem("userId") || "",
    conSymbol: JSON.parse(sessionStorage.getItem("conSymbol")) || [], //币种行情
    optionalArr: JSON.parse(localStorage.getItem("optionalArr")) || [],
    rightInfo: {},
    centerDetailsArr: [],
    volume: "",
    coinInfo: {},
    cycleSymbol: [],
    tradSymbol: [],
    currencyInfo:[],
    cycle: {
      info: {
        rise: "",
      },
      top: [],
    },
    currency: {
      info: {
        rise: "",
      },
      top: [],
      sell: [],
      buy: [],
    },
    certain: {
      info: {
        rise: "",
      },
      top: [],
      sell: [],
      buy: [],
    },
    areaArr: [],
    tvNew: false,
    addressShow: false,
    mentionAddress: [],
    allCoinList: [],
    mentionList: [],
    aboutInfo: {},
    usdRate: {},
    fiatCoin: [],
    fiatPayCoin: [],
    dotShow: sessionStorage.getItem("noReadMsg") || false,
    getConifg: [],
  },

  getters: Getters,

  mutations: {
    CHANGE_DOTSTATE(state, val) {
      state.dotShow = val;
    },
    updataMentionList(state, arr) {
      state.mentionAddress = arr;
    },
    showAddress(state, bool) {
      state.addressShow = bool;
    },
    tradingview(state, val) {
      state.tvNew = val;
    },

    getArea(state, val) {
      //处理重复
      let obj = {};
      let arr = [];
      val.map((item) => {
        if (obj[item.mobilePrefix]) return;
        obj[item.mobilePrefix] = true;
        arr.push(item);
      });
      //按区号排序
      arr.sort((a, b) => {
        return a.mobilePrefix - b.mobilePrefix;
      });
      state.areaArr = arr;
    },
    setCoinInfo(state, val) {
      if (val.length > 0) {
        state.certain.info = val;
      }
    },
    //合约数据更新
    conSymbol(state, val) {
      state.conSymbol = val.filter((item) => item.maincoin.toUpperCase() == "USDT");
    },
    tradSymbol(state, val) {
      state.tradSymbol = val.filter((item) => item.maincoin.toUpperCase() == "USDT");
    },
    currencyInfo(state, val){
      state.currencyInfo = val.filter((item) => item.maincoin.toUpperCase() == "USDT");
    },
    cycleSymbol(state, val) {
      state.cycleSymbol = val.filter((item) => item.maincoin.toUpperCase() == "USDT");
    },
    updataCenterCoin(state, val) {
      state.centerDetailsArr = val;
    },
    //ws 更新行情
    setMarketData(state, val) {
      if (val.overview) {
        state.centerDetailsArr = val.overview;
      }
      if (val.symbols) {
        state.tradSymbol = val.symbols.filter(
          (item) => item.maincoin.toUpperCase() == "USDT"
        );
      }
      if (val.aimssymbols) {
        state.targetSymbol = val.aimssymbols.filter(
          (item) => item.maincoin.toUpperCase() == "USDT"
        );
      }
      if (val.consymbols) {
        state.conSymbol = val.consymbols.filter(
          (item) => item.maincoin.toUpperCase() == "USDT"
        );
      }
      if (val.volume) {
        state.volume = val.volume[0].volume;
      }
    },

    changeRightInfo(state, val) {
      state.rightInfo = val;
    },

    //ws 更新大盘成交xinxi
    updataCertain(state, val) {
      if (val.coninfo) {
        state.certain.info = val.coninfo;
      }

      if (val.contop) {
        if (val.updata) {
          state.certain.top = val.contop;
        } else {
          val.contop.forEach((item) => {
            state.certain.top.forEach((value, key) => {
              if (value.autoid == item.autoid) {
                state.certain.top.splice(key, 1);
              }
            });
          });
          state.certain.top = val.contop.concat(state.certain.top);
          state.certain.top =
            state.certain.top.length > 30
              ? state.certain.top.slice(0, 30)
              : state.certain.top;
        }
      }

      if (val.consell) {
        val.consell = quantityFn(val.consell, 0);
        state.certain.sell = val.consell;
      }
      if (val.conbuy) {
        val.conbuy = quantityFn(val.conbuy, 1);
        state.certain.buy = val.conbuy;
      }
    },
    //保存币种信息
    updataCurrency(state, val) {
      state.tradSymbol = val;
    },

    //刷新数据
    userUpdata(state, val) {
      state.accountInfo = val;
    },

    //登录
    login(state, val) {
      state.accountInfo = val;
      state.login = true;
      state.userId = localStorage.getItem("userId");
    },
    updataCycle(state, val) {
      if (val.cycleinfo) {
        state.cycle.info = val.cycleinfo;
      }

      if (val.cycletop) {
        if (val.updata) {
          state.cycle.top = val.cycletop;
        } else {
          val.cycletop.forEach((item) => {
            state.cycle.top.forEach((value, key) => {
              if (value.autoid == item.autoid) {
                state.cycle.top.splice(key, 1);
              }
            });
          });
          state.cycle.top = val.cycletop.concat(state.cycle.top);
          state.cycle.top =
            state.cycle.top.length > 30
              ? state.cycle.top.slice(0, 30)
              : state.cycle.top;
        }
      }
    },
    updataTrad(state, val) {
      if (val.info) {
        state.currency.info = val.info;
      }

      if (val.top) {
        if (val.updata) {
          state.currency.top = val.top;
        } else {
          val.top.forEach((item) => {
            state.currency.top.forEach((value, key) => {
              if (value.autoid == item.autoid) {
                state.currency.top.splice(key, 1);
              }
            });
          });
          state.currency.top = val.top.concat(state.currency.top);
          state.currency.top =
            state.currency.top.length > 30
              ? state.currency.top.slice(0, 30)
              : state.currency.top;
        }
      }

      if (val.buy) {
        val.buy = quantityFn(val.buy, 1);
        state.currency.buy = val.buy;
      }
      if (val.sell) {
        val.sell = quantityFn(val.sell, 0);
        state.currency.sell = val.sell;
      }
    },
    //退出登录
    back(state) {
      localStorage.removeItem("login");
      localStorage.removeItem("userId");
      localStorage.removeItem("accountinfo");
      localStorage.removeItem("token");
      state.login = false;
      state.userId = "";
      state.accountInfo = {};
    },

    //自选
    updataOptional(state, val) {
      let index = null;
      let arr = state.optionalArr.filter((item, key) => {
        if (item.tradcoin == val.tradcoin && item.maincoin == val.maincoin)
          index = key;
        return item.tradcoin == val.tradcoin && item.maincoin == val.maincoin;
      });
      arr.length > 0
        ? state.optionalArr.splice(index, 1)
        : state.optionalArr.push(val);
      localStorage.setItem("optionalArr", JSON.stringify(state.optionalArr));
    },
    //所有币种
    allCoinList(state, val) {
      state.allCoinList = val;
    },
    mentionList(state, val) {
      state.mentionList = val;
    },
    aboutInfo(state, val) {
      state.aboutInfo = val;
    },
    usdRate(state, val) {
      state.usdRate = val;
    },
    fiatCoin(state, val) {
      state.fiatCoin = val;
    },
    fiatPayCoin(state, val) {
      state.fiatPayCoin = val;
    },
    GET_CONFIG(state, val) {
      state.getConfig = val
    }
  },
  actions: {
    getUser({ commit }) {
      getAccountInfo().then((res) => {
        if (res.code == 200) {
          commit("userUpdata", res.data);
        }
      });
    },
    getFiatCoin({ commit }) {
      getFiatCoin().then((res) => {
        if (res.code == 200) {
          commit("fiatCoin", res.data);
        }
      });
    },
    getPayCoin({ commit }) {
      getPayFiatCoin().then((res) => {
        if (res.code == 200) {
          commit("fiatPayCoin", res.data);
        }
      });
    },
    getAllCoins({ commit }) {
      getCoinList().then((res) => {
        if (res.code == "200") {
          commit("allCoinList", res.data);
        }
      });
    },
    getMentionAddress({ commit }, coin) {
      getCoinMentionList({ coin }).then((res) => {
        if (res.code == "200") {
          commit("mentionList", res.data);
        }
      });
    },
    getAboutInfo({ commit }) {
      getLinkInfo().then((res) => {
        if (res.code == "200") {
          commit("aboutInfo", res.data);
        }
      });
    },
    getUSDRate({ commit }) {
      getUsdRate({ coin: "USD" }).then((res) => {
        if (res.code == "200") {
          commit("usdRate", res.data);
        }
      });
    },
    getConfig({ commit }) {
      getConfig().then((res) => {
        if (res.code == "200") {
          commit("GET_CONFIG", res.data);
        }
      });
    },
  },
});
export default store;
