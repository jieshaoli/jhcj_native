import request from "./request";
import QS from "qs";

//登录
export function login(params) {
  return request({
    url: "/app/v1/login/userLoginCode",
    method: "post",
    data: QS.stringify(params),
    needToken: false
  });
}
//发送登录验证码
export function loginMsgCode(params) {
  return request({
    url: "/app/v1/login/code",
    method: "post",
    data: QS.stringify(params),
    needToken: false
  });
}
// 获取用户的基本信息
export function getUserBaseInfo() {
  return request({
    url: "/app/v1/user/center/base",
    method: "get",
    needToken: true
  });
  /*info:
bind_ios: 0
bind_qq: 0
bind_wx: 0
cumulative_sign_in: 5
default_address_id: 41
id: 60
identity_id: 1
identity_newbie_task: "4,8,7,6,5"
integral_count: 1426
is_first_update: 0
type_id: 1
user_education_id: 3
user_industry: "c"
user_nickname: "一往无前"
user_picture: "http://qiniu.1yuaninfo.com/2020/07/85d71202007301459086740.png"
user_sex: 1
user_vocation: "销售"
user_year: "1996-1-14"
*/
}
