import { get, post } from '../axios.js';

//首页推荐
export const getTrads = () => get('/trad/overview');

//行情列表
export const getDetailsInfo = () => get('/trad/symbols');

//币种详情
export const currencyInfo = (params) =>
  get('/trad/currencyIntroduction', params);

//当前委托
export const getQuery = (params) => get('/trad/entrustOrder', params);

//所有当前委托
export const getAllQuery = (params) => get('/trad/tradEntrust', params);

//历史委托
export const getHistory = (params) => get('/trad/entrustHistory', params);

//所有历史委托
export const getAllHistory = (params) => get('/trad/tradHistory', params);

//盘口数据
export const getTradsInfo = (params) => get('/trad/entrust', params);

//k线记录
export const TgetKLine = (params) => get('/trad/kline', params);

//撤销订单
export const undoFn = (params) => post('/trad/closeEntrust', params);

//可用资产
export const getAccount = (params) => get('/trad/tradAccount', params);

//限价买入
export const buyLimitFn = (params) => post('/trad/buyLimit', params);

//市价买入
export const buyMarketFn = (params) => post('/trad/buyMarket', params);

//限价售出
export const sellLimitFn = (params) => post('/trad/sellLimit', params);

//市价售出
export const sellMarketFn = (params) => post('/trad/sellMarket', params);

//币种详情
export const getCoinInfo = (params) => get('/trad/trad', params);
