import { get, post } from './axios.js';

//币币
//撤销
export const removeOrder = (params) => post('/exchange/removeorder', params);

//历史记录
export const getYhHistoricOrders = (params) =>
  post('/exchange/getYhHistoricOrders', params);

//所有历史记录
export const getYhAllHistoricOrders = (params) =>
  post('/exchange/getYhAllHistoricOrders', params);

//查询当前挂单
export const getwtorder = (params) => post('/exchange/getwtorder', params);

//所有挂单
export const getallwtorder = (params) =>
  post('/exchange/getallwtorder', params);

//发送交易
export const transction = (params) => post('/exchange/transction', params);

//获取币种列表
export const getCurrency = () => post('/exchange/gettrads');

//获取推荐币种
export const recommended = () => post('/app/indexPage');

//总资产
export const getExassetsConvert = (params) =>
  post('/exchange/getExassetsConvert', params);

//首页
//自选
export const userFav = (params) => post('/app/userFav', params);

//公告
export const getNotice = (params) => post('/account/getNotice', params);

//获取订单列表
export const orderList = (params) => post('/otc/getOtcOrderList', params);

//法币币种列表
export const getOtcCoins = () => post('/otc/getOtcCoins');

//法币记录
export const getFiatOrderRecord = (params) =>
  post('/c2c/getOrderRecord', params);

//快捷买币
export const keyTrans = (params) => post('/otc/onkeytrans', params);

//法币币种列表
export const coinList = (params) =>
  post('/c2c/getCoinInfoWhenPlaceOrder', params);

export const c2ctransaction = (params) => post('/c2c/c2ctransaction', params);

//获取最新价
export const getBalance = (params) => post('/c2c/getCtcBalance', params);

//法币初始化请求
export const getOppoDetail = (params) => post('/c2c/getOppoDetail', params);

//申诉
export const appeal = (params) => post('/c2c/appeal', params);

//个人中心
//获取个人信息
export const getAccountInfo = (params) =>
  post('/account/getAccountInfo', params);

//绑定支付方式
export const addPay = (params) => post('/c2c/addPayment', params);

//谷歌验证
export const getGoogleValid = (params) =>
  post('/account/getGoogleValid', params);

export const bindGoogleValid = (params) =>
  post('/account/bindGoogleValid', params);

//绑定手机号
export const bindphone = (params) => post('/account/bindphone', params);

export const registerSendCode = (params) =>
  post('/account/registerSendCode', params);

//修改登录密码
export const updatelogpwd = (params) => post('/account/updatelogpwd', params);

//设置交易密码
export const setTradPassword = (params) =>
  post('/exchangews/setTradPassword', params);

export const sendCode = (params) => post('/account/sendCode', params);

//身份认证
export const seniorCertificate = (params) =>
  post('/account/seniorCertificate', params);

//资产

//提现地址管理
export const addfirend = (params) => post('/account/addfirend', params);

//所有地址
export const getAllFirends = (params) => post('/account/getAllFirends', params);

//获取公链
export const getChainList = (params) => post('/account/getChainList', params);

//删除地址
export const delfirend = (params) => post('/account/delfirend', params);

//币币账户
//划转
export const tradToC2c = (params) => post('/transfer/tradToC2c', params);

//资产列表
export const getAssetsList = (params) =>
  post('/exchange/getAssetsList', params);

export const getAllC2cTransferRecord = (params) =>
  post('/transfer/getAllC2cTransferRecord', params);

//法币账户
//划转
export const c2cToTrad = (params) => post('/transfer/c2cToTrad', params);

//充币
export const getReciveAddress = (params) =>
  post('/transfer/getReciveAddress', params);

export const getUsdtCombo = () => post('/exchange/getUsdtCombo');

export const getTradTransferRecord = (params) =>
  post('/transfer/getTradTransferRecord', params);

export const getAllTradTransferRecord = (params) =>
  post('/transfer/getAllTradTransferRecord', params);

//提币
export const addoutcoin = (params) => post('/transfer/addoutcoin', params);

//帮助中心
export const getHelpCentre = () => post('/helpcentre/getHelpCentre');

//费率
export const getCoins = () => post('/currency/getCoins');

//登录注册
//忘记密码
export const forgetSendCode = (params) =>
  post('/account/forgetSendCode', params);

export const forgetComplete = (params) =>
  post('/account/forgetComplete', params);

export const forgetFn = (params) => post('/account/forget', params);

export const login = (params) => post('/account/login', params);

//注册
export const registerComplete = (params) =>
  post('/account/registerComplete', params);

export const registerFn = (params) => post('/account/register', params);

export const getLine = (params) => post('exchange/kline', params);
