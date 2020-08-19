<template>
  <div id="live-chat">
    <ul class="lite-chatbox"
        id="liteChatbox">
      <li v-for="(item, index) in chat_data"
          :key="index">
        <div class="cright cmsg"
             v-if="item.user.user_id == self_info.user_id">
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
import _setting from '../common/setting'
import bus from '../common/bus'
import { getChatRoomInfo } from '../api/tokenApi'

export default {
  name: 'liveChat',
  props: {
    course_info: {
      type: Object,
    },
  },
  data() {
    return {
      self_info: {
        user_id: -1,
        user_name: '',
        user_photo: '',
        user_role: 2,
      },
      input_placeholder: '输入内容...',
      chat_data: [],
    }
  },
  methods: {
    checkUserInfo() {
      debugger
      if (this.self_info.user_id == -1) {
        let access_token = localStorage.getItem('access_token')
        if (
          access_token &&
          access_token.length != undefined &&
          access_token != null
        ) {
          let user = JSON.parse(localStorage.getItem('user'))
          if (user) {
            this.self_info.user_id = user.id
            this.self_info.user_name = user.user_nickname
            this.self_info.user_photo = user.user_picture
            this.self_info.user_role = 2
          }
        } else {
          bus.$emit('login', 'show-view')
        }
      }
    },
    showEmoji() {
      document.getElementById('input').focus()
    },
    sendMsg() {
      let input = document.getElementById('input')
      let currentTime = new Date().getTime()
      let textContent = input.value
      let infoC = {}
      if (textContent.length > 0) {
        infoC = { content: textContent }
      }
      let data = {
        info_type: 1,
        info: infoC,
        info_time: currentTime + '',
        user: this.self_info,
      }
      this.chat_data.push(data)
      input.blur()
      input.value = ''
    },
    updateScroll() {
      let chat_box = document.getElementById('live-chat')
      debugger
      chat_box.scrollTop = chat_box.scrollHeight - 50
      console.log(chat_box.scrollHeight, '-=-=-=', chat_box.scrollTop)
    },
  },
  created() {
    let access_token = localStorage.getItem('access_token')
    for (var i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      let left = {
        info_type: 1,
        info: {
          content: '测试文字测试文字测试文字测试文字测试文字测试文字测试文字',
        },
        info_time: new Date().getTime() + '',
        user: {
          user_name: '李少杰',
          user_photo:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597227459592&di=3aa680712d6075632866a0f56e99ca2b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F17%2F20151017233054_NK3rj.jpeg',
          user_id: 11,
          user_role: 2,
        },
      }
      let right = {
        info_type: 1,
        info: {
          content: '哈哈哈，你在测试吧',
        },
        info_time: new Date().getTime() + '',
        user: {
          user_name: '李少杰',
          user_photo:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597227459592&di=3aa680712d6075632866a0f56e99ca2b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F17%2F20151017233054_NK3rj.jpeg',
          user_id: 111,
          user_role: 2,
        },
      }
      this.chat_data.push(left)
      this.chat_data.push(right)
    }
    var config = {
      appkey: _setting.RongYunAppKey,
    }
    // var IM = RongIMLib.init(config);
    if (
      access_token &&
      access_token.length != undefined &&
      access_token != null
    ) {
      getChatRoomInfo(this.course_info)
        .then((res) => {})
        .catch((rej) => {})
    }

    bus.$on('login', (msg) => {
      if (msg == 'success-todo') {
      }
    })
  },
  mounted() {},
  updated() {
    this.updateScroll()
  },
}
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
