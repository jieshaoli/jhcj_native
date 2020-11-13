<template>
  <div id="freeTextLiving">
    <largerPicture v-show="imgIsShowing"
                   :isShowimage_url=isShowimage_url
                   @imgBgHidechild="imgBgHidechild"></largerPicture>
    <div v-show="chat_data.length <= 0"
         style="width: 100%; height: 100%; text-align:center;">
      <img src="../assets/image/logo_empty.png"
           alt="默认图"
           style="width: 80px; margin: 25% 100px;">
    </div>
    <div v-show="chat_data.length > 0"
         class="lite-chatbox"
         id="lite-chat-box">
      <ul>
        <li v-for="(item, index) in chat_data"
            :key="index">
          <div class="cleft cmsg"
               v-if="item.content.content.info_type == 1">
            <img class="headIcon radius"
                 ondragstart="return false;"
                 oncontextmenu="return false;"
                 :src="item.content.content.user.user_photo" />
            <span class="showMark"
                  v-if="teacher_id == item.content.content.user.user_id ? true : false">老师</span>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.sentTime | showTime }}</span><br>
            <span class="content"
                  :class="teacher_id == item.content.content.user.user_id ? 'conRed': 'conBlack'">{{ item.content.content.info.content }}</span>
          </div>
          <div class="cleft cmsg"
               v-else-if="item.content.content.info_type == 2">
            <img class="headIcon radius"
                 ondragstart="return false;"
                 oncontextmenu="return false;"
                 :src="item.content.content.user.user_photo" />
            <span class="showMark"
                  v-if="teacher_id == item.content.content.user.user_id ? true : false">老师</span>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.sentTime | showTime }}</span><br>
            <span class="content"
                  :class="teacher_id == item.content.content.user.user_id ? 'conRed': 'conBlack'"><img @click="imgBgHide(item.content.content.info.image_url)"
                   :src="item.content.content.info.image_url" /></span>
          </div>
          <div class="cleft cmsg"
               v-else-if="item.content.content.info_type == 3">
            <img class="headIcon radius"
                 ondragstart="return false;"
                 oncontextmenu="return false;"
                 :src="item.content.content.user.user_photo" />
            <span class="showMark"
                  v-if="teacher_id == item.content.content.user.user_id ? true : false">老师</span>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.sentTime | showTime }}</span><br>
            <span class="content"
                  :class="teacher_id == item.content.content.user.user_id ? 'conRed': 'conBlack'">这是播放音频的</span>
          </div>
          <div class="cleft cmsg"
               v-else-if="item.content.content.info_type == 4">
            <img class="headIcon radius"
                 ondragstart="return false;"
                 oncontextmenu="return false;"
                 :src="item.content.content.user.user_photo" />
            <span class="showMark"
                  v-if="teacher_id == item.content.content.user.user_id ? true : false">老师</span>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.sentTime | showTime }}</span><br>
            <span class="content"
                  :class="teacher_id == item.content.content.user.user_id ? 'conRed': 'conBlack'">{{ item.content.content.info.content }}<br /><img
                   @click="imgBgHide(item.content.content.info.image_url)"
                   :src="item.content.content.info.image_url" /></span>
          </div>
          <div class="cleft cmsg"
               v-else-if="item.content.content.info_type == 5">
            <img class="headIcon radius"
                 ondragstart="return false;"
                 oncontextmenu="return false;"
                 :src="item.content.content.user.user_photo" />
            <span class="showMark"
                  v-if="teacher_id == item.content.content.user.user_id ? true : false">老师</span>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.sentTime | showTime }}</span><br>
            <span class="content"
                  :class="teacher_id == item.content.content.user.user_id ? 'conRed': 'conBlack'">{{ item.content.content.info.content }}</span>
            <div class="questionDiv">
              <span class="questionName">{{ item.content.content.info.qa_name }}</span>
              <span class="questionTime">{{ item.content.content.info.qa_time | showTime }}</span><br />
              <span class="questionContent">{{ item.content.content.info.qa_content }}</span>
            </div>
          </div>
          <div class="cleft cmsg"
               v-else-if="item.content.content.info_type == 6">
            <img class="headIcon radius"
                 ondragstart="return false;"
                 oncontextmenu="return false;"
                 :src="item.content.content.user.user_photo" />
            <span class="showMark"
                  v-if="teacher_id == item.content.content.user.user_id ? true : false">老师</span>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.sentTime | showTime }}</span><br>
            <span class="content"
                  :class="teacher_id == item.content.content.user.user_id ? 'conRed': 'conBlack'"><img @click="imgBgHide(item.content.content.info.image_url)"
                   :src="item.content.content.info.image_url" /></span>
            <div class="questionDiv">
              <span class="questionName">{{ item.content.content.info.qa_name }}</span>
              <span class="questionTime">{{ item.content.content.info.qa_time | showTime }}</span><br />
              <span class="questionContent">{{ item.content.content.info.qa_content }}</span>
            </div>
          </div>
          <div class="cleft cmsg"
               v-else-if="item.content.content.info_type == 7">
            <img class="headIcon radius"
                 ondragstart="return false;"
                 oncontextmenu="return false;"
                 :src="item.content.content.user.user_photo" />
            <span class="showMark"
                  v-if="teacher_id == item.content.content.user.user_id ? true : false">老师</span>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.sentTime | showTime }}</span><br>
            <span class="content"
                  :class="teacher_id == item.content.content.user.user_id ? 'conRed': 'conBlack'">{{ item.content.content.info.content }}<br /><img
                   @click="imgBgHide(item.content.content.info.image_url)"
                   :src="item.content.content.info.image_url" /></span>
            <div class="questionDiv">
              <span class="questionName">{{ item.content.content.info.qa_name }}</span>
              <span class="questionTime">{{ item.content.content.info.qa_time | showTime }}</span><br />
              <span class="questionContent">{{ item.content.content.info.qa_content }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getChatHistory } from '../api/courseApi.js';
import largerPicture from '../components/largerPicture';

export default {
  name: 'freeTextLiving',
  props: {
    course_info: {
      type: Object,
    },
    teacher_id: {
      type: Number,
    },
  },
  components: {
    largerPicture,
  },
  data() {
    return {
      chat_data: [],
      requestTimer: null,
      needScroll: true,
      imgIsShowing: false,
      isShowimage_url: '',
      imgAction: false,
      intervalTimer: undefined,
    };
  },
  created() {
    // this.intervalTimer = setInterval(() => {
      this.networkForChatList();
    // }, 3000);

  },
  mounted() {
    console.log('free mounted');
  },
  updated() {
    console.log('updated')
    this.updateView();
  },
  destroyed() {
    clearInterval(this.intervalTimer);
  },
  methods: {
    imgBgHidechild(val) {
      this.imgIsShowing = val;
      this.imgAction = true;
    },
    imgBgHide(val) {
      this.imgIsShowing = !this.imgIsShowing;
      this.isShowimage_url = val;
      this.imgAction = true;
    },
    updateView() {
      if (!this.imgAction) {
        this.updateScroll();
      }
      this.imgAction = false;
    },
    updateScroll() {
      let chat_box = document.getElementById('lite-chat-box');
      console.log('update:', chat_box.scrollTop, chat_box.scrollHeight);
      // if (this.needScroll) {
        console.log('need')
        chat_box.scrollTop = chat_box.scrollHeight;
      // }
    },
    networkForChatList() {
      let item, para;
      if (this.chat_data.length > 0) {
        item = this.chat_data[this.chat_data.length - 1];
        para = {
          uid: this.course_info.uid,
          messageUId: item.messageUId,
          playback: true,
          type: 1,
        };
      } else {
        para = { uid: this.course_info.uid, type: 1, playback: true };
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
              this.chat_data.push(chatMessage);
            }
            console.log('chat_data:', this.chat_data);
          }
        })
        .catch((rej) => {
          this.$catchError(rej);
        });
    },
  },
};
</script>
<style lang="css" scoped>
#freeTextLiving {
  background: #f5f5f5;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.lite-chatbox {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.content {
  white-space: pre-line;
}
.questionDiv .questionContent {
  white-space: pre-line;
}
</style>
