import { get, post } from '../axios';

//所有当前委托
export const getAllQuery = (params) => get('/trad/tradEntrust', params);

//所有历史委托
export const getAllHistory = (params) => get('/trad/tradHistory', params);

//成交明细
export const getOrders = (params) => get('/trad/tradOrder', params);
