import { get, post } from '../axios';

//兑换列表
export const getIeoList = (params) => get('/ieo/getIeoList', params);

//兑换
export const tranIeo = (params) => post('/ieo/addIeoOrder', params);

//记录
export const getReocrd = (params) => get('/ieo/getIeoOrder', params);

//拉取余额
export const getBalance = (params) => get('/ieo/findPayCoinByCoin', params);

//赠送比例
export const getGas = (params) => get('/ieo/findGasById', params);
