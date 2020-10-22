<template>
  <div id="live-chat">
    <mt-loadmore :top-method="loadTop"
                 ref="loadmore"
                 class="load-more">
      <div class="lite-chatbox"
           :id="if_more_x ? 'lite-chat-box2' : 'lite-chat-box1'"
           @click.stop="inputBlur">
        <ul>
          <li v-for="(item, index) in chat_data"
              :key="index">
            <div class="cright cmsg"
                 v-if="item.content.content.user.user_id == userInfo.user_id">
              <img class="headIcon radius"
                   ondragstart="return false;"
                   oncontextmenu="return false;"
                   :src="item.content.content.user.user_photo" />
              <span class="time">{{ item.sentTime | showTime }}</span>
              <span class="name">{{ item.content.content.user.user_name }}</span><br>
              <span class="content">{{ item.content.content.info.content }}</span>
            </div>
            <div class="cleft cmsg"
                 v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 1">
              <img class="headIcon radius"
                   ondragstart="return false;"
                   oncontextmenu="return false;"
                   :src="item.content.content.user.user_photo" />
              <span class="name">{{ item.content.content.user.user_name }}</span>
              <span class="time">{{ item.sentTime | showTime }}</span><br>
              <span class="content">{{ item.content.content.info.content }}</span>
            </div>
            <div class="cleft cmsg"
                 v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 2">
              <img class="headIcon radius"
                   ondragstart="return false;"
                   oncontextmenu="return false;"
                   :src="item.content.content.user.user_photo" />
              <span class="name">{{ item.content.content.user.user_name }}</span>
              <span class="time">{{ item.sentTime | showTime }}</span><br>
              <span class="content"><img :src="item.content.content.info.image_url" /></span>
            </div>
            <div class="cleft cmsg"
                 v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 3">
              <img class="headIcon radius"
                   ondragstart="return false;"
                   oncontextmenu="return false;"
                   :src="item.content.content.user.user_photo" />
              <span class="name">{{ item.content.content.user.user_name }}</span>
              <span class="time">{{ item.sentTime | showTime }}</span><br>
              <span class="content">这是播放音频的</span>
            </div>
            <div class="cleft cmsg"
                 v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 4">
              <img class="headIcon radius"
                   ondragstart="return false;"
                   oncontextmenu="return false;"
                   :src="item.content.content.user.user_photo" />
              <span class="name">{{ item.content.content.user.user_name }}</span>
              <span class="time">{{ item.sentTime | showTime }}</span><br>
              <span class="content">{{ item.content.content.info.content }}<br /><img :src="item.content.content.info.image_url" /></span>
            </div>
            <div class="cleft cmsg"
                 v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 5">
              <img class="headIcon radius"
                   ondragstart="return false;"
                   oncontextmenu="return false;"
                   :src="item.content.content.user.user_photo" />
              <span class="name">{{ item.content.content.user.user_name }}</span>
              <span class="time">{{ item.sentTime | showTime }}</span><br>
              <span class="content">
                <div class="questionDiv">
                  <span class="questionName">【问】{{ item.content.content.info.qa_name }}</span>
                  <span class="questionTime">{{ item.content.content.info.qa_time | showTime }}</span><br />
                  <span class="questionContent">{{ item.content.content.info.qa_content }}</span>
                </div>
                【答】{{ item.content.content.info.content }}
              </span>
            </div>
            <div class="cleft cmsg"
                 v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 6">
              <img class="headIcon radius"
                   ondragstart="return false;"
                   oncontextmenu="return false;"
                   :src="item.content.content.user.user_photo" />
              <span class="name">{{ item.content.content.user.user_name }}</span>
              <span class="time">{{ item.sentTime | showTime }}</span><br>
              <span class="content">
                <div class="questionDiv">
                  <span class="questionName">【问】{{ item.content.content.info.qa_name }}</span>
                  <span class="questionTime">{{ item.content.content.info.qa_time | showTime }}</span><br />
                  <span class="questionContent">{{ item.content.content.info.qa_content }}</span>
                </div>
                【答】<img :src="item.content.content.info.image_url" />
              </span>
            </div>
            <div class="cleft cmsg"
                 v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 7">
              <img class="headIcon radius"
                   ondragstart="return false;"
                   oncontextmenu="return false;"
                   :src="item.content.content.user.user_photo" />
              <span class="name">{{ item.content.content.user.user_name }}</span>
              <span class="time">{{ item.sentTime | showTime }}</span><br>
              <span class="content">
                <div class="questionDiv">
                  <span class="questionName">【问】{{ item.content.content.info.qa_name }}</span>
                  <span class="questionTime">{{ item.content.content.info.qa_time | showTime }}</span><br />
                  <span class="questionContent">{{ item.content.content.info.qa_content }}</span>
                </div>
                【答】{{ item.content.content.info.content }}<br /><img :src="item.content.content.info.image_url" />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </mt-loadmore>
    <div :class="if_more_x ? 'input-box2' : 'input-box1'"
         id="input-tool">
      <div class="tool-header">
        <textarea id="editor"
                  type="text"
                  v-model="input_text"
                  :placeholder="input_placeholder"
                  @focus="textFocus"
                  @blur="textBlur"></textarea>
        <button id="smile"
                style="width:25px;"
                @click="showEmoji">
          <img id="smileImg"
               style="width:25px;"
               src="../assets/image/smile.png"
               alt="" />
        </button>
        <mt-button class="send-btn"
                   type="primary"
                   @click.native="sendMsg">发送</mt-button>
      </div>
      <transition name="fade">
        <div class="tool-emoji"
             v-show="isShowingEmoji">
          <emoji-view v-on:emoji="emojiInput"
                      v-show="isShowingEmoji"></emoji-view>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import _setting from '../common/setting';
import bus from '../common/bus';
import { getChatHistory } from '../api/courseApi';
import { mapGetters } from 'vuex';
import { Base64 } from 'js-base64';
import emojiView from './emojiView.vue';
import { Toast, Loadmore, MessageBox } from 'mint-ui';

export default {
  name: 'liveChat',
  props: {
    course_info: {
      type: Object,
    },
  },
  components: {
    emojiView,
    Loadmore,
  },
  data() {
    return {
      input_placeholder: '输入内容...',
      chat_data: [],
      chat_token: '',
      chat_id: '',
      if_more_x: true,
      input_text: '',
      isShowingEmoji: false,
      isConnected: false,
      isEnterRoom: false,
      canLoadMore: true,
      needScroll: true,
      scrollH: 0,
      userInfo: {
        user_id: '',
        user_name: '',
        user_photo: '',
        user_role: 2,
      },
      checkerId: '',
      ifNeedCheck: true,
    };
  },
  mounted() {
    let per = window.innerHeight / window.innerWidth;
    if (per > 1.8) {
      this.if_more_x = true;
    } else {
      this.if_more_x = false;
    }
    if (
      this.$store.state.user.user_name &&
      this.$store.state.user.user_name.length > 0
    ) {
      this.userInfo = {
        user_id: 'junhui#' + this.$store.state.user.user_phone,
        user_name: this.$store.state.user.user_name,
        user_photo: this.$store.state.user.user_photo,
        user_role: 2,
      };
    }
    this.$nextTick(() => {
      if (this.haveLogin()) {
        if (this.userInfo.user_id == '' || this.userInfo.user_id == undefined) {
          this.networkForSaveUser();
        }
      }
    });
  },
  updated() {
    this.updateScroll();
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  watch: {
    user: function (val, oldValue) {
      if (val.user_name && val.user_name.length > 0) {
        this.userInfo = {
          user_id: 'junhui#' + val.user_phone,
          user_name: val.user_name,
          user_photo: val.user_photo,
          user_role: 2,
        };
      }
    },
  },
  created() {
    bus.$on('getChatInfo_sdk_id', (msg) => {
      this.chat_token = msg.token;
      this.chat_id = msg.sdk_id;
      this.ifNeedCheck = msg.is_examine_room == 1 ? true : false;
      this.checkerId = msg.send_examine_id;
      this.rongYunConnect();
    });
    this.initChatRoomSDK();
  },
  methods: {
    showEmoji() {
      this.judgeToLogin();
      this.switchEmoji();
    },
    switchEmoji() {
      var bg = document.getElementById('input-tool');
      var image = document.getElementById('smileImg');
      let chat_box = document.getElementById('lite-chat-box1');
      var bgH = 50,
        top = 0;
      if (this.if_more_x) {
        bgH = 84;
        chat_box = document.getElementById('lite-chat-box2');
      }
      if (this.isShowingEmoji) {
        this.isShowingEmoji = false;
        image.setAttribute('src', require('../assets/image/smile.png'));
        let input = document.getElementById('editor');
        // input.focus();
        top = 0;
      } else {
        image.setAttribute('src', require('../assets/image/keyboard.png'));
        this.isShowingEmoji = true;
        bgH += 160;
        top = -160;
      }
      bg.style.height = bgH + 'px';
      chat_box.style.marginTop = top + 'px';
    },
    emojiInput(text) {
      this.input_text += text;
    },
    inputBlur() {
      if (this.isShowingEmoji) {
        this.switchEmoji();
      } else {
        let input = document.getElementById('editor');
        input.blur();
      }
    },
    judgeToLogin() {
      if (this.haveLogin()) {
        if (this.userInfo.user_id == '' || this.userInfo.user_id == undefined) {
          if (
            this.$store.state.user.user_id &&
            this.$store.state.user.user_id.length > 0
          ) {
            this.userInfo.user_id =
              'junhui#' + this.$store.state.user.user_phone;
            this.userInfo.user_name = this.$store.state.user.user_name;
            this.userInfo.user_photo = this.$store.state.user.user_photo;
            this.userInfo.user_role = this.$store.state.user.user_role;
          } else {
            this.networkForSaveUser();
          }
        }
        return true;
      } else {
        bus.$emit('login', 'show-view');
        return false;
      }
    },
    textFocus(e) {
      if (this.judgeToLogin()) {
        this.isShowingEmoji = true;
        this.switchEmoji();
        this.needScroll = true;
      }
    },
    textBlur() {
      console.log('blur');
    },
    haveLogin() {
      let access_token = localStorage.getItem('access_token');
      if (
        access_token != null &&
        access_token != undefined &&
        access_token.length > 1
      ) {
        return true;
      } else {
        return false;
      }
    },
    sendMsg() {
      this.judgeToLogin();
      let input = document.getElementById('editor');
      let currentTime = new Date().getTime();
      let textContent = this.input_text;
      let infoC = {};
      input.blur();
      if (textContent.length > 0) {
        infoC = { content: textContent };
      } else {
        this.warningToast('请输入内容再发送');
        return;
      }
      let data = {
        info_type: 1,
        info: infoC,
        info_time: currentTime + '',
        target_id: this.chat_id,
        user: this.userInfo,
      };
      if (this.ifNeedCheck) {
        this.sendToRongIMSolo(data);
      } else {
        this.sendToRongIM(data);
      }

      this.input_text = '';
    },
    sendToRongIMSolo(data) {
      console.log(data, 'data');
      let contentStr = JSON.stringify(data);
      let base64Str = Base64.encode(contentStr);
      let msg = new RongIMLib.TextMessage({ content: base64Str });
      let conversationType = RongIMLib.ConversationType.PRIVATE;
      let targetId = this.checkerId;
      let self = this;
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
          console.log('发送文本消息成功', message);
          self.addDataForShow(data, message);
        },
        onError: function (errorCode) {
          console.log('发送消息失败', errorCode);
          if (errorCode == '23408') {
            self.errorToast('发送消息失败:您被管理员禁言了！');
          } else {
            self.errorToast('发送消息失败:' + errorCode);
          }
        },
      });
    },
    sendToRongIM(data) {
      console.log(data, 'data');
      let contentStr = JSON.stringify(data);
      let base64Str = Base64.encode(contentStr);
      let msg = new RongIMLib.TextMessage({ content: base64Str });
      let conversationType = RongIMLib.ConversationType.CHATROOM;
      let targetId = this.chat_id;
      let self = this;
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
          console.log('发送文本消息成功', message);
          self.addDataForShow(data, message);
        },
        onError: function (errorCode) {
          console.log('发送消息失败', errorCode);
          if (errorCode == '23408') {
            self.errorToast('发送消息失败:您被管理员禁言了！');
          } else {
            self.errorToast('发送消息失败:' + errorCode);
          }
        },
      });
    },
    addDataForShow(data, message) {
      let chatMessage = {
        content: {
          content: data,
        },
        messageUId: message.messageUId,
        objectName: message.objectName,
        senderUserId: message.senderUserId,
        sentTime: message.sentTime,
        targetId: message.targetId,
      };
      this.needScroll = true;
      this.chat_data.push(chatMessage);
    },
    updateScroll() {
      let chat_box;
      if (this.if_more_x) {
        chat_box = document.getElementById('lite-chat-box2');
      } else {
        chat_box = document.getElementById('lite-chat-box1');
      }
      if (this.needScroll) {
        chat_box.scrollTop = chat_box.scrollHeight;
      } else {
        if (this.canLoadMore) {
          chat_box.scrollTop = chat_box.scrollHeight - this.scrollH - 20;
        } else {
          chat_box.scrollTop = chat_box.scrollHeight - this.scrollH;
        }
      }
      this.scrollH = chat_box.scrollHeight;
    },
    removeAccessToken() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    initChatRoomSDK() {
      let self = this;
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
              {
                console.log('其他设备登录, 本端被踢');
                self.errorToast('其他设备登录, 本端被踢');
                self.removeAccessToken();
                bus.$emit('login', 'show-view');
              }
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
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
          let messageContent = message.content;
          // 判断消息类型
          switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage: // 文字消息
              {
                console.log('文字内容', Base64.decode(messageContent.content));
                let msg = Base64.decode(messageContent.content);
                let msgInfo = JSON.parse(msg);
                if (msgInfo.info_type != 9 && msgInfo.info_type != 11) {
                  if (msgInfo.info_type === 10) {
                    bus.$emit('liveKeyPoints', msgInfo);
                  } else {
                    if (
                      self.ifNeedCheck &&
                      msgInfo.user.user_id == self.userInfo.user_id
                    ) {
                      return;
                    } else {
                      self.addDataForShow(msgInfo, message);
                    }
                  }
                } else if (msgInfo.info_type == 11) {
                  if (msgInfo.info.status == 3) {
                    console.log('课程已结束');
                    MessageBox.alert(
                      '直播课堂已结束，查看更多内容请下载：君汇财经app',
                      '直播结束!'
                    ).then((action) => {
                      location.href =
                        'https://app.1yuaninfo.com/app_web/Download.html';
                    });
                  }
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
            case RongIMClient.MessageType.RecallCommandMessage:
              {
                console.log('收到撤回消息', message);
                let mesUId = message.content.messageUId;
                let at = -1;
                for (let index = 0; index < self.chat_data.length; index++) {
                  let ele = self.chat_data[index];
                  if (ele.messageUId == mesUId) {
                    at = index;
                  }
                }
                if (at >= 0) {
                  self.needScroll = true;
                  self.chat_data.splice(at, 1);
                }
              }
              break;
            default:
              console.log('default:收到消息', message);
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
          self.isConnected = true;
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
          self.errorToast(info);
          console.log('连接失败, 失败原因: ', info);
        },
      });
    },
    joinChatRoom() {
      let self = this;
      RongIMClient.getInstance().joinChatRoom(this.chat_id, 0, {
        onSuccess: function () {
          console.log('加入聊天室成功');
          self.successToast('加入聊天室成功');
          self.isEnterRoom = true;
          self.networkForHistoryList();
        },
        onError: function (error) {
          console.log('加入聊天室失败', error);
          self.errorToast('加入聊天室失败');
        },
      });
    },
    loadTop() {
      if (this.canLoadMore) {
        this.networkForHistoryList();
      } else {
        this.$refs.loadmore.onTopLoaded();
        self.warningToast('没有更多的数据');
      }
    },
    networkForHistoryList() {
      let item = this.chat_data[0];
      let para;
      if (item) {
        para = { uid: this.course_info.uid, messageUId: item.messageUId };
        this.needScroll = false;
      } else {
        para = { uid: this.course_info.uid };
        this.needScroll = true;
      }
      getChatHistory(para)
        .then((res) => {
          let dataCount = res.result.count;
          let data = res.result.data;
          if (data.length > 0) {
            for (let index = 0; index < data.length; index++) {
              let info = data[index];
              let msg = Base64.decode(info.content.content);
              let msgInfo = JSON.parse(msg);
              let chatMessage = {
                content: {
                  content: msgInfo,
                },
                messageUId: info.messageUId,
                objectName: info.objectName,
                senderUserId: info.senderUserId,
                sentTime: info.sentTime,
                targetId: info.targetId,
              };
              this.chat_data.unshift(chatMessage);
            }
            this.canLoadMore = true;
          } else {
            this.canLoadMore = false;
          }
          this.$refs.loadmore.onTopLoaded();
        })
        .catch((rej) => {
          if (this.$refs.loadmore.onTopLoaded) {
            this.$refs.loadmore.onTopLoaded();
          }
          this.$catchError(rej);
        });
    },
    networkForSaveUser() {
      console.log('networkForSaveUser');
      this.$store
        .dispatch('AddUser')
        .then((resolve) => {
          console.log('SET_USER_chat', resolve);
          if (
            this.$store.state.user.user_name &&
            this.$store.state.user.user_name.length > 0
          ) {
            this.userInfo = {
              user_id: 'junhui#' + this.$store.state.user.user_phone,
              user_name: this.$store.state.user.user_name,
              user_photo: this.$store.state.user.user_photo,
              user_role: 2,
            };
          }
        })
        .catch((reject) => {
          this.$catchError(reject);
        });
    },
    errorToast(msg) {
      Toast({
        message: msg,
        position: 'middle',
        duration: 1500,
      });
    },
    warningToast(msg) {
      Toast({
        message: msg,
        position: 'top',
        duration: 1500,
      });
    },
    successToast(msg) {
      Toast({
        message: msg,
        position: 'bottom',
        duration: 1500,
      });
    },
  },
  beforeDestroy() {
    let self = this;
    if (this.isEnterRoom) {
      RongIMClient.getInstance().quitChatRoom(this.chat_id, {
        onSuccess: function () {
          console.log('退出聊天室成功');
          self.successToast('退出聊天室成功');
          self.isEnterRoom = false;
          RongIMClient.getInstance().disconnect();
          self.isConnected = false;
          // RongIMClient.getInstance().logout();//disconnect();
        },
        onError: function (error) {
          console.log('退出聊天室失败');
          self.errorToast('退出聊天室失败');
        },
      });
    } else {
      if (this.isConnected) {
        RongIMClient.getInstance().disconnect();
        this.isConnected = false;
      }
    }
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
#live-chat >>> .mint-loadmore-content {
  height: 100%;
  width: 100%;
}
.load-more {
  height: 100%;
  width: 100%;
}
#lite-chat-box1 {
  height: calc(100% - 50px);
}
#lite-chat-box2 {
  height: calc(100% - 84px);
}
hr {
  background: #e1e1e1;
  width: 100%;
  height: 0.5px;
}
#input-tool {
  width: 100%;
  background: white;
  position: absolute;
  left: 0px;
  bottom: 0px;
  border-top: 0.5px solid #ddd;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.input-box1 {
  height: 50px;
}
.input-box2 {
  height: 84px;
}
#input-tool .tool-header {
  margin-bottom: 10px;
  padding: 0;
  width: 100%;
  height: 50px;
  display: flex;
}
.tool-header #editor {
  border-radius: 6px;
  border: 0.5px solid #edebec;
  background: #fbf9fa;
  height: 32px;
  outline: none;
  resize: none;
  display: flex;
  font-size: 15px;
  align-items: center;
  line-height: 32px;
  margin-top: 8px;
  margin-left: 16px;
  flex: 1;
  position: relative;
  padding-left: 10px;
}
.tool-header #smile {
  position: relative;
  /* display: inline-block; */
  width: 25px;
  height: 25px;
  margin: 12px 0 12px 12px;
  border-width: 0;
  background: transparent;
  /* float: left; */
}
.tool-header .send-btn {
  position: relative;
  width: 55px;
  height: 32px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 8px;
  font-size: 14px;
}
#input-tool .tool-emoji {
  width: 100%;
}
.content {
  white-space: pre-line;
}
.questionDiv .questionContent {
  white-space: pre-line;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
  transform: translateY(0);
}
.fade-enter,
.fade-leave-to {
  transform: translateY(100%);
}
.fade-leave,
.fade-enter-to {
  transform: translateY(0%);
}
</style>
