import { get, post } from '../axios';

//兑换列表
export const getIeoList = () => get('/flash/flashCoin');

//兑换
export const tranIeo = (params) => post('/flash/addFlash', params);

//记录
export const getReocrd = (params) => get('/flash/flashOrder', params);

//拉取余额
export const getBalance = (params) => get('/account/balance', params);
