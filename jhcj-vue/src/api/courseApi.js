import request from './request';
import QS from 'qs';

//获取课堂信息
export function getCourseMsg(params) {
   return request({
    url: '/app/v2/course/room/message',
    method: 'post',
    data: QS.stringify(params),
    needToken: false,
  });
}

//登录后获取聊天室信息
export function getChatRoomInfo(params) {
  return request({
    url: "/app/v2/course/chat/message",
    method: "post",
    data: QS.stringify(params),
    needToken: true,
  });
}
