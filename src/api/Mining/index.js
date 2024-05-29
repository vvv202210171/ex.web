import { get, post } from '../axios';

export const getMineInfo = () => get('/miner/minerInfo');

export const getMineList = () => get('/miner/minManage');

export const getMyReocrd = (params) => get('/miner/minOrder', params);

export const addOrder = (params) => post('/miner/addMinOrder', params);

export const advanceOrder = (params) => post('/miner/redeemOrder', params);
