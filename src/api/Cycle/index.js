import { get, post } from '../axios.js';

//当前持仓
const queryFn = (params) => get('/cycle/position', params);

//盈利订单
const getOrder = (params) => get('/cycle/top_order', params);

//获取k线
const ZgetKLine = (params) => get('/cycle/kline', params);

//币种基础信息
const getInfo = (params) => get('/cycle/info', params);

//买涨
const buyFn = (params) => post('/cycle/buyMarket', params);

//买跌
const sellFn = (params) => post('/cycle/sellMarket', params);

//历史持仓
const getHistory = (params) => get('/cycle/tradHistory', params);

//获取余额
const getBalance = (params) => get('/account/contractBalance', params);

//平仓
const closePosition = (params) => post('/cycle/close_position', params);

//止盈止损
const profitLoss = (params) => post('/cycle/profit_loss', params);

//币种列表
const getCycleSymbols = () => get('/cycle/symbols');

//获取盘口详情
const getCycle = (params) => get('/cycle/cycle', params);

//周期
const getCycleList = (params) => get('/cycle/lever', params);

//获取系统时间
const getSystemTime = () => get('/home/systemTime');
export {
  queryFn,
  getOrder,
  ZgetKLine,
  getInfo,
  buyFn,
  sellFn,
  getBalance,
  getHistory,
  closePosition,
  profitLoss,
  getCycleSymbols,
  getCycle,
  getCycleList,
  getSystemTime,
};
