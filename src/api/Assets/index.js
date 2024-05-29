import {get, post} from '../axios';

//提币列表(币币)
export const getList = () => get('/account/myAccount');

//提币列表(合约)
export const getContractList = () => get('/account/contractAssets');

//提币
export const mentionFn = (params) => post('/account/outCoin', params);

//提币列表
export const mentionList = () => get('/account/toAddressList');

//添加提币地址
export const addMention = (params) => post('/account/addToAddress', params);

//删除提币地址
export const delMention = (params) => post('/account/removeToAddress', params);

//获取记录
export const getTypeRecord = (params) =>
    post('/account/finance_type_coin', params);

//币种列表
export const getCoinList = () => get('/account/coins');

//获取对应币种资产
export const getCoinBalance = (params) => get('/account/tradBalance', params);

//获取充币地址
export const getChargeAddress = (params) =>
    get('/account/getRjCoinAddress', params);

//提交冲币订单
export const rgaddFiatPayOrder = (params) =>
    post('/fiat/rgaddFiatPayOrder', params);

//获取充提币记录
export const getTableInfo = (params) =>
    post('/account/finance_type_coin', params);

//所有充提币记录
export const getAllTableInfo = (params) =>
    get('/account/financeByType', params);

//提币信息
export const withdrawalTips = (params) =>
    get('/account/withdrawalTips', params);

//币种对应提币地址
export const coinMention = (params) => post('/account/toaddress_coin', params);

//划转
export const transfer = (params) => post('/account/contractTransfer', params);

//总资产折合
export const getAllAssets = () => get('/account/myAccountCount');

export const getCoinMentionList = (params) =>
    get('/account/toAddressCoin', params);

//查找汇率
export const getUsdRate = (params) =>
    get('/account/getExchangeRateByCoin', params);
//今日收益
export const getEarnings = (params) => get("/user/earnings", params);
//撤销提币订单
export const orderUndo = (params) => post("/account/out_revoke", params);