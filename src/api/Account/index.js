import { get, post } from '../axios.js';

// 注册获取验证码
export const getCode = (params) => get('/user/getCode', params);

//注册
export const registerFn = (params) => post('/member/registerByEmail', params);

//登录
export const loginFn = (params) => post('/member/loginByTelOrEmail', params);

//忘记密码
export const forgetFn = (params) => post('/member/forgetByEmail', params);

//设置交易密码
export const setPassword = (params) => post('/user/updatetradpassword', params);

//获取用户信息
export const getAccountInfo = () => get('/user/userInfo');

//实名认证
export const editRealyname = (params) => post('/user/editRealName', params);

//修改登录密码
export const codeSetPass = (params) => post('/user/updatePassword', params);

//绑定手机
export const bindPhone = (params) => post('/user/updatetel', params);

//绑定邮箱
export const bindEmail = (params) => post('/user/addUserEmail', params);

//获取公告列表
export const getNotice = (params) => get('/home/articles', params);

//获取推荐码
export const getInviteCode = () => get('/user/getInvitationUrl');

//推荐列表
export const getInviteList = (params) => get('/user/getMyTeam', params);

//手机号注册
export const phoneRegister = (params) => post('/member/registerByTel', params);

//邮箱忘记密码
export const forgetPhone = (params) => post('/member/forgetByTel', params);

//获取区号列表
export const getCodeList = (params) => get('/home/areaCode', params);

//轮播图
export const getBanner = (params) => get('/home/banner', params);

//hash注册
export const registerHashFn = (params) =>
  post('/member/enrollfromprivatekey', params);

//hash 登录
export const hashLogin = (params) =>
  post('/member/loginfromprivatekey', params);

//导出私钥
export const exportHash = (params) => post('/user/getprivatekey', params);

//董事分红明细
export const getShareRecord = (params) => post('/contract/trad_income', params);

//分红收益
export const getShareNum = (params) => post('/contract/group_income', params);

//根据原密码修改新密码
export const editpassword = (params) => post('/user/editPassword', params);

//获取工单列表
export const getQuest = () => get('/user/onlineList');

//提交工单
export const subQuest = (params) => post('/user/addOnline', params);

//平台抵扣劵
export const getCoupon = (params) => post('/contract/coupon_list', params);

export const getKeys = () => get('/home/getOssKey');

//分拥记录
export const getTeamRecord = (params) =>
  get('/contract/contractIncome', params);

//获取联系方式
export const getLinkInfo = () => get('/home/aboutUs');

export const setPhoneEmail = (params) => post('/user/setNewTelOrEmail', params);

//首次设置交易密码
export const firstSetPass = (params) => post('/user/addTradPassword', params);

//查询开启的充值渠道(KF：客服充值；SM：扫码充值)
export const getChargeType = (params) => get('/user/rg_channel', params);

//获取是否显示验证码
export const getConfig = () => get('/common/get_config');
