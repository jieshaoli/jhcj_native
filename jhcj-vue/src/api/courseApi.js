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
//获取直播要点
export function getLiveKeyPoints(params) {
  return request({
    url: "/app/v1/user/course/live/main",
    method: "post",
    data: QS.stringify(params),
    needToken: true,
  })
}
//收藏课程
export function keepTheCourse(params) {
  return request({
    url: "/app/v1/user/course/channel/collection",
    method: "post",
    data: QS.stringify(params),
    needToken: true,
  })
}
//取消收藏课程
export function cancelKeepTheCourse(params) {
  return request({
    url: "/app/v1/user/course/channel/collection/cancel",
    method: "post",
    data: QS.stringify(params),
    needToken: true,
  })
}
//获取聊天室历史记录
export function getChatHistory(params) {
  return request({
    url: "/app/v2/course/chat/information",
    method: "post",
    data: QS.stringify(params),
    needToken: true
  })
}

