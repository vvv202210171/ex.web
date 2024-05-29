import Vue from 'vue';
import store from '../store/index';

let wsCoinfig = {
  ws: null, //建立的连接
  lockReconnect: false, //是否真正建立连接
  timeout: 30 * 1000, //60秒一次心跳
  timeoutObj: null, //心跳心跳倒计时
  serverTimeoutObj: null, //心跳倒计时
  timeoutnum: null, //断开 重连倒计时

  userNo: new Date().getTime().toString() + Math.floor(Math.random() * 100).toString(),
};

// 初始化方法
initWebpack();
function initWebpack() {
  const socketURL = `${(location.protocol === 'https:' ? 'wss': 'ws' )}://${location.host}/ws/`
  wsCoinfig.ws = new WebSocket(`${socketURL}${wsCoinfig.userNo}`);
  wsCoinfig.ws.onopen = onopen;
  wsCoinfig.ws.onmessage = onmessage;
  wsCoinfig.ws.onclose = onclose;
  wsCoinfig.ws.onerror = onerror;
}

function reconnect() {
  //重新连接
  if (wsCoinfig.lockReconnect) {
    return;
  }
  window.isReloadWs = true
  wsCoinfig.lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  wsCoinfig.timeoutnum && clearTimeout(wsCoinfig.timeoutnum);
  wsCoinfig.timeoutnum = setTimeout(function () {
    //新连接
    initWebpack();
    wsCoinfig.lockReconnect = false;
  }, 5000);
}

function reset() {
  //重置心跳
  clearTimeout(wsCoinfig.timeoutObj);
  clearTimeout(wsCoinfig.serverTimeoutObj);
  //重启心跳
  start();
}

function start() {
  //开启心跳
  // console.log('开启心跳');
  wsCoinfig.timeoutObj && clearTimeout(wsCoinfig.timeoutObj);
  wsCoinfig.serverTimeoutObj && clearTimeout(wsCoinfig.serverTimeoutObj);
  wsCoinfig.timeoutObj = setTimeout(() => {
    //这里发送一个心跳，后端收到后，返回一个心跳消息，
    if (wsCoinfig.ws.readyState == 1) {
      //如果连接正常
      wsCoinfig.ws.send('ping');
    } else {
      //否则重连
      reconnect();
    }

    //心跳时间内没有重新开启心跳就关闭 socket
    wsCoinfig.serverTimeoutObj = setTimeout(() => {
      //超时关闭
      console.log('超时关闭');
      window.isReloadWs = true
      wsCoinfig.ws.close();
    }, wsCoinfig.timeout);
  }, wsCoinfig.timeout);
}

function onopen() {
  //开启心跳
  start();
  if(window.isReloadWs){
    Vue.prototype.$bus.$emit('wsReload')
  }
  Vue.prototype.$ws = wsCoinfig.ws;
  //连接成功后 发送 获取币种信息的请求  先判断缓存有没有币种 没有就不发送
  let selectedParams = localStorage.getItem('selectedParams');
  if (selectedParams) {
    store.commit('tradingview', true);
    wsCoinfig.ws.send(`${selectedParams}`);
  } else {
    wsCoinfig.ws.send(`USDT_BTC_contract_1`);
  }
}

function onmessage(e) {
  if (e) {
    //收到服务端的心跳回应 重置心跳
    if (e.data == 'pong') {
      reset();
      return;
    }
    if (e.data) {
      let resData = JSON.parse(e.data);
      //处理行情数据,合约
      if (resData.consymbols) {
        resData.time = new Date().getTime();
        // 更新数据  行情
        store.commit('setMarketData', resData);
      }
      //币币
      if (resData.consymbols) {
        resData.time = new Date().getTime();
        store.commit('conSymbol', resData.consymbols);
      }
      if (resData.coninfo || resData.contop) {
        resData.time = new Date().getTime();
        // 更新数据  币种数据
        store.commit('updataCertain', resData);
      }

      //目标
      // if (resData.aimsinfo) {
      //   store.commit('updataTarget', resData);
      // }

      // if (resData.aimssymbols) {
      //   store.commit('targetSymbol', resData.aimssymbols);
      // }
      if (resData.cyclesymbols) {
        store.commit('cycleSymbol', resData.cyclesymbols);
      }
      if (resData.cycleinfo || resData.cycletop) {
        store.commit('updataCycle', resData);
      }

      //周期
      if (resData.info || resData.top) {
        store.commit('updataTrad', resData);
      }
      if (resData.symbols) {
        store.commit('tradSymbol', resData.symbols);
      }
    }

    //收到服务器信息，心跳重置
  }
}

function onclose(e) {
  console.log(e);
  console.log('连接关闭');
  //重连
  reconnect();
}

function onerror(e) {
  console.log('出现错误');
  //重连
  reconnect();
}

Vue.prototype.$ws = wsCoinfig.ws;
