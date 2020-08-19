import request from './directRequest';
import QS from 'qs';

//登录
export function login(params) {
  return request({
    url: '/app/v1/login/userLoginCode',
    method: 'post',
    data: QS.stringify(params)
  });
}
//发送登录验证码
export function loginMsgCode(params) {
  return request({
    url: '/app/v1/login/code',
    method: 'post',
    data: QS.stringify(params)
  })
}
//获取课堂信息
export function getCourseMsg(params) {
  return request({
    url: '/app/v2/course/room/message',
    method: 'post',
    data: QS.stringify(params)
  })
}
