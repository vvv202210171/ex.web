import { get, post } from '../axios.js';

//申购列表
export const getList = (params) => post('/lock/lock_manage', params);

//申购记录
export const getRecord = (params) => post('/lock/findlockorder', params);

//购买
export const flashTran = (params) => post('/lock/lock_order', params);

//收益
export const profit = (params) => post('/lock/lock_income', params);
