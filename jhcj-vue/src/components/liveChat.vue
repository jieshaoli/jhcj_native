<template>
  <div id="live-chat">
    <ul class="lite-chatbox"
        id="liteChatbox">
      <li v-for="(item, index) in chat_data"
          :key="index">
        <div class="cright cmsg"
             v-if="item.user.user_id == userInfo.user_id">
          <img class="headIcon radius"
               ondragstart="return false;"
               oncontextmenu="return false;"
               :src="item.user.user_photo" />
          <span class="time">{{ item.info_time | showTime }}</span>
          <span class="name">{{ item.user.user_name }}</span><br>
          <span class="content">{{ item.info.content }}</span>
        </div>
        <div class="cleft cmsg"
             v-else>
          <img class="headIcon radius"
               ondragstart="return false;"
               oncontextmenu="return false;"
               :src="item.user.user_photo" />
          <span class="name">{{ item.user.user_name }}</span>
          <span class="time">{{ item.info_time | showTime }}</span><br>
          <span class="content">{{ item.info.content }}</span>
        </div>
      </li>
    </ul>
    <div class="input-box">
      <input id="input"
             type="text"
             :placeholder="input_placeholder"
             @focus="checkUserInfo">
      <button class="smile-btn"
              @click="showEmoji"><img style="width:25px;"
             src="../assets/image/smile.png"
             alt=""></button>
      <mt-button class="send-btn"
                 type="primary"
                 @click.native="sendMsg">发送</mt-button>
    </div>
  </div>
</template>
<script>
import _setting from '../common/setting';
import bus from '../common/bus';
import { getChatRoomInfo } from '../api/courseApi';
import { mapGetters } from 'vuex';
import { Base64 } from 'js-base64';

export default {
  name: 'liveChat',
  props: {
    course_info: {
      type: Object,
    },
  },
  data() {
    return {
      input_placeholder: '输入内容...',
      chat_data: [],
      chat_token: '',
      chat_id: '',
    };
  },
  mounted() {},
  updated() {
    this.updateScroll();
  },
  computed: {
    ...mapGetters({
      userInfo: 'user',
    }),
  },
  created() {
    let access_token = localStorage.getItem('access_token');
    if (
      access_token &&
      access_token.length != undefined &&
      access_token != null
    ) {
      this.networkForChatInfo();
    }
    bus.$on('login', (msg) => {
      if (msg == 'success-todo') {
        this.networkForChatInfo();
      }
    });
    this.initChatRoomSDK();
    // setTimeout(() => {
    //   console.log('user:',this.userInfo.user_id);//刷新之后加下延迟获取store
    // }, 200);
  },
  methods: {
    checkUserInfo() {
      if (this.userInfo.user_id == '' || this.userInfo.user_id == undefined) {
        let access_token = localStorage.getItem('access_token');
        if (
          access_token &&
          access_token.length != undefined &&
          access_token != null
        ) {
          let user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            this.userInfo.user_id = user.id;
            this.userInfo.user_name = user.user_nickname;
            this.userInfo.user_photo = user.user_picture;
            this.userInfo.user_role = 2;
          }
        } else {
          bus.$emit('login', 'show-view');
        }
      }
    },
    showEmoji() {
      document.getElementById('input').focus();
    },
    sendMsg() {
      let input = document.getElementById('input');
      let currentTime = new Date().getTime();
      let textContent = input.value;
      let infoC = {};
      if (textContent.length > 0) {
        infoC = { content: textContent };
      }
      let data = {
        info_type: 1,
        info: infoC,
        info_time: currentTime + '',
        user: this.userInfo,
      };
      this.chat_data.push(data);

      let contentStr = JSON.stringify(data);
      let base64Str = Base64.encode(contentStr);
      let msg = new RongIMLib.TextMessage({ content: base64Str });

      let conversationType = RongIMLib.ConversationType.CHATROOM;
      let targetId = this.chat_id;
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
          console.log('发送文本消息成功', message);
        },
        onError: function (errorCode) {
          console.log('发送文本消息失败', errorCode);
        },
      });

      input.blur();
      input.value = '';
    },
    updateScroll() {
      let chat_box = document.getElementById('live-chat');
      // debugger
      chat_box.scrollTop = chat_box.scrollHeight - 50;
      console.log(chat_box.scrollHeight, '-=-=-=', chat_box.scrollTop);
    },
    networkForChatInfo() {
      getChatRoomInfo(this.course_info)
        .then((res) => {
          this.chat_token = res.result.data.token;
          this.chat_id = res.result.data.sdk_id;
          this.rongYunConnect();
        })
        .catch((rej) => {});
    },
    initChatRoomSDK() {
      RongIMLib.RongIMClient.init(_setting.RongYunAppKey);
      RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
          // status 标识当前连接状态
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              console.log('链接成功');
              break;
            case RongIMLib.ConnectionStatus.CONNECTING:
              console.log('正在链接');
              break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              console.log('断开连接');
              break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              console.log('其他设备登录, 本端被踢');
              break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
              console.log('域名不正确, 请至开发者后台查看安全域名配置');
              break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log('网络不可用, 此时可调用 reconnect 进行重连');
              break;
            default:
              console.log('链接状态为', status);
              break;
          }
        },
      });
      let self = this;
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
          let messageContent = message.content;
          // 判断消息类型
          switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage: // 文字消息
              {
                console.log('text', messageContent.content);
                console.log('文字内容', Base64.decode(messageContent.content));
                let msg = Base64.decode(messageContent.content);
                let msgInfo = JSON.parse(msg);
                if (msgInfo.info_type != 9 && msgInfo.info_type != 11) {
                  self.chat_data.push(msgInfo);
                }
              }
              break;
            case RongIMClient.MessageType.ImageMessage: // 图片消息
              console.log('图片缩略图 base64', messageContent.content);
              console.log('原图 url', messageContent.imageUri);
              break;
            case RongIMClient.MessageType.HQVoiceMessage: // 音频消息
              console.log('音频 type ', messageContent.type); // 编解码类型，默认为 aac 音频
              console.log('音频 url', messageContent.remoteUrl); // 播放：<audio src={remoteUrl} />
              console.log('音频 时长', messageContent.duration);
              break;
            case RongIMClient.MessageType.RichContentMessage: // 富文本(图文)消息
              console.log('文本内容', messageContent.content);
              console.log('图片 base64', messageContent.imageUri);
              console.log('原图 url', messageContent.url);
              break;
            case RongIMClient.MessageType.UnknownMessage: // 未知消息
              console.log('未知消息, 请检查消息自定义格式是否正确', message);
              break;
            default:
              console.log('收到消息', message);
              break;
          }
        },
      });
    },
    rongYunConnect() {
      let self = this;
      RongIMClient.connect(this.chat_token, {
        onSuccess: function (userId) {
          console.log('连接成功, 用户 id 为', userId);
          // 连接已成功, 此时可通过 getConversationList 获取会话列表并展示
          self.joinChatRoom();
        },
        onTokenIncorrect: function () {
          console.log('连接失败, 失败原因: token 无效');
        },
        onError: function (errorCode) {
          let info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '链接超时';
              break;
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
              info = '不可接受的协议版本';
              break;
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
              info = 'appkey 不正确';
              break;
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
              info = '服务器不可用';
              break;
            default:
              info = errorCode;
              break;
          }
          console.log('连接失败, 失败原因: ', info);
        },
      });
    },
    joinChatRoom() {
      RongIMClient.getInstance().joinChatRoom(this.chat_id, 0, {
        onSuccess: function () {
          console.log('加入聊天室成功');
        },
        onError: function (error) {
          console.log('加入聊天室失败', error);
        },
      });
    },
  },
  beforeDestroy() {
    RongIMClient.getInstance().quitChatRoom(this.chat_id, {
      onSuccess: function () {
        console.log('退出聊天室成功');
        RongIMClient.getInstance().disconnect();
        // RongIMClient.getInstance().logout();//disconnect();
      },
      onError: function (error) {
        console.log('退出聊天室失败');
      },
    });
  },
};
</script>

<style lang="css" scoped>
#live-chat {
  background: #f5f5f5;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.lite-chatbox {
  height: calc(100% - 50px);
}
hr {
  background: #e1e1e1;
  width: 100%;
  height: 0.5px;
}
.input-box {
  background: white;
  position: absolute;
  height: 50px;
  width: 100%;
  left: 0px;
  bottom: 0px;
  display: flex;
  border-top: 0.5px solid #ddd;
}
.input-box .horizontal {
  position: absolute;
  top: 2px;
  left: 0px;
}
.input-box #input {
  border-radius: 6px;
  border: 0.5px solid #edebec;
  background: #fbf9fa;
  height: 32px;
  outline-style: none;
  display: flex;
  font-size: 15px;
  align-items: center;
  margin-top: 8px;
  margin-left: 16px;
  flex: 1;
  position: relative;
  padding-left: 10px;
}
.input-box .smile-btn {
  position: relative;
  /* display: inline-block; */
  width: 25px;
  height: 25px;
  margin: 12px;
  border-width: 0;
  background: transparent;
  /* float: left; */
}
.input-box .send-btn {
  position: relative;
  width: 55px;
  height: 32px;
  margin-right: 16px;
  margin-top: 8px;
  font-size: 14px;
}
</style>
