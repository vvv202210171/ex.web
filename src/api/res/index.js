import { get, post } from '../axios';
//图片预览接口
export const imgPreviewUrl = '/api/res/preview/'
//图片上传
export const imgUpload = (params) => post('/res/upload', params);