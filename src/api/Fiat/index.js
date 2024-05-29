import { get, post } from '../axios';

export const getFiatCoin = () => get('/fiat/fiatCoin');

export const getPayFiatCoin = () => get('/fiat/payCoinList');

export const getFiatRecord = (params) => get('/fiat/fiatOrderList', params);

export const buyFiat = (params) => post('/fiat/addFiatPayOrder', params);
