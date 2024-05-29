import { get, post } from '../axios.js';

// 当前持仓
export const getPositionRecord = (params) => get('/contract/position', params);

//币种当前持仓
export const getCoinPosition = (params) =>
  get('/contract/positionByCoin', params);

//市价买入
export const buyMarket = (params) => post('contract/buyMarket', params);

//市价出售
export const sellMarket = (params) => post('/contract/sellMarket', params);

//限价买入
export const buyLimit = (params) => post('/contract/buyLimit', params);

//限价售出
export const sellLimit = (params) => post('/contract/sellLimit', params);

//当前委托
export const getAccount = (params) => get('/contract/tradEntrust', params);

//币种当前委托
export const getCoinAccount = (params) => get('/contract/entrustOrder', params);

//获取杠杠倍数
export const getLever = (params) => get('/contract/lever', params);

//24h 行情
export const getTrads = () => get('/contract/overview');

//个人余额
export const getContractAccount = (params) =>
  get('/contract/contractAccount', params);

//获取币种列表
export const getSymbols = () => get('/contract/symbols');

//获取k线数据
export const getKLine = (params) => get('/contract/kline', params);

//历史持仓
export const getPositionHistory = (params) =>
  get('/contract/tradOrder', params);

//历史委托
export const getHistory = (params) => get('/contract/tradHistory', params);

//币种历史委托
export const getCoinHistory = (params) =>
  get('/contract/entrustHistory', params);

//撤销委托
export const closeEntrust = (params) => post('contract/closeEntrust', params);

//修改止盈止损
export const profitLoss = (params) => post('/contract/editProfitLoss', params);

//按数量止盈止损
export const profitLossNum = (params) => post('/contract/profitLoss', params);

//一键平仓
export const allCloseFn = (params) => post('contract/closeAllPosition', params);

//根据币种一键平仓
export const coinAllCloseFn = (params) =>
  post('/contract/closeCoinPosition', params);

//info
export const getInfo = (params) => get('/contract/info', params);

//平仓
export const closePosition = (params) =>
  post('/contract/closePosition', params);

//调整保证金
export const changeMargin = (params) => post('/contract/changeMargin', params);

//盘口信息
export const getCertain = (params) => get('/contract/contract', params);

//止盈止损列表
export const getAllProfitOrder = (params) =>
  get('/contract/profitLossAllOrder', params);

//撤销止盈止损
export const cancelProfit = (params) =>
  post('/contract/closeProfitLoss', params);

//止盈止损币种列表
export const getCoinProfitOrder = (params) =>
  get('/contract/profitLossOrderByCoin', params);
