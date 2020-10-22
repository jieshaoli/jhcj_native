<template>
  <div id="chat-room">
    <div class="fixed-div">
      <mt-header :title=title
                 class="header">
        <!-- <router-link to="/" -->
        <!-- slot="left"> -->
        <mt-button class="nav-left-btn"
                   slot="left"
                   @click="reload">
          <img style="width:20px;height:20px"
               src="../assets/image/reload.png"
               alt="刷新">
        </mt-button>
        <!-- </router-link> -->
        <mt-button class="nav-right-btn"
                   slot="right"
                   @click="collect">
          <img style="width:20px;height:20px"
               :src="isCollected ? require('../assets/image/collected.png') : require('../assets/image/collection.png')"
               alt="收藏" />
        </mt-button>
      </mt-header>
    </div>
    <div class="content">
      <live-chat v-bind:course_info="course_info"></live-chat>
    </div>
  </div>
</template>

<script>
import liveChat from '../components/liveChat';
import {
  getCourseMsgUnLogin,
  getCourseMsgLogin,
  getChatRoomInfo,
  keepTheCourse,
  cancelKeepTheCourse,
} from '../api/courseApi';
import bus from '../common/bus';
import axios from 'axios';
import QS from 'qs';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { Base64 } from 'js-base64';

export default {
  name: 'chatRoom',
  data() {
    return {
      title: '文字直播课',
      course_info: {},
      courseAllData: {},
      isLogined: false,
      isCollected: false,
      platform: '',
      openId: '',
      signature: '',
    };
  },
  components: {
    liveChat,
  },
  mounted() {},
  created() {
    var hrefStr = window.location.href;
    this.checkHref(hrefStr);
    if (!this.haveLogin()) {
      bus.$emit('login', 'show-view');
    }
    bus.$on('login', (msg) => {
      if (msg == 'success-todo') {
        console.log('新登录成功了');
        if (this.isLogined == false) {
          this.isLogined = true;
          this.networkForCourseInfo();
        }
      }
    });
    bus.$on('access_token_fail', () => {
      this.isLogined = false;
      console.log('令牌已经失效了');
    });
    this.networkForCourseInfo();
  },
  methods: {
    wxShare() {
      wx.config({
        debug: false, // 为true时，就是调试模式，会弹出一些信息，正确、错误都会弹。
        appId: 'wxf1dae2ba24e9eaae', // 必填，公众号的唯一标识
        timestamp: '1539227222', // 必填，生成签名的时间戳
        nonceStr: 'Zz928106762zz', // 必填，生成签名的随机串
        signature: this.signature, // 必填，签名，
        // 必填，把要使用的方法名放到这个数组中。
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
      });
      console.log(
        this.courseAllData,
        '====data====',
        this.courseAllData.course_picture
      );
      wx.ready(() => {
        var AppMessageShareData = {
          title: this.title, // 分享到朋友标题
          desc: this.courseAllData.course_desc, // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.courseAllData.course_picture, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享给朋友');
            // alert('分享给朋友');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('分享给朋友失败');
            // alert('分享给朋友失败');
          },
        };
        var TimelineShareData = {
          title: this.title, // 分享到朋友标题
          desc: this.courseAllData.course_desc, // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.courseAllData.course_picture, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享给朋友圈');
            // alert('分享给朋友圈');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('分享给朋友圈失败');
            // alert('分享给朋友圈失败');
          },
        };
        wx.updateAppMessageShareData(AppMessageShareData); //分享到朋友
        wx.updateTimelineShareData(TimelineShareData); //分享到朋友圈
        Indicator.close();
      });
      wx.error((res) => {
        console.log('wx error:', res);
        Indicator.close();
      });
    },
    haveLogin() {
      let access_token = localStorage.getItem('access_token');
      if (
        access_token != null &&
        access_token != undefined &&
        access_token.length > 1
      ) {
        this.isLogined = true;
        return true;
      } else {
        this.isLogined = false;
        return false;
      }
    },
    checkHref(hrefStr) {
      if (hrefStr.indexOf('id') > -1) {
        let id = hrefStr.split('id=')[1].split('&')[0];
        this.course_info = {
          type: 1,
          uid: id,
        };
        console.log('liveRoom id = ', id);
      } else {
        MessageBox.alert('课程出现错误,请输入正确网址', '出错');
      }
      if (hrefStr.indexOf('platform') > -1) {
        this.platform = hrefStr.split('platform=')[1].split('&')[0];
        if (this.platform && this.platform.length > 0) {
          if (this.platform == 'wxf1dae2ba24e9eaae') {
            document.getElementsByTagName('title')[0].innerText = '服务笔记';
          }
        } else if (this.platform == 'app') {
          document.getElementsByTagName('title')[0].innerText = '君汇财经';
        }
        console.log('platform = ', this.platform);
      } else {
        document.getElementsByTagName('title')[0].innerText = '君汇财经';
      }
    },
    networkForGetSignature() {
      let config = {
        headers: {
          'Content-Type': 'application/json, text/plain, */*',
        },
      };
      let url =
        'http://z.1yuaninfo.com/index/chat/share?url=' +
        Base64.encode(window.location.href);
      axios
        .get(url)
        .then((res) => {
          console.log('GetSignature:', res);
          if (res.data.error_code) {
            Toast({
              title: res.data.msg,
              position: 'center',
              duration: 2000,
            });
            Indicator.close();
          }
          if (res.data) {
            if (res.data.result.length > 0) {
              this.signature = res.data.result;
              if (this.courseAllData && this.courseAllData != {}) {
                this.wxShare();
              }
            } else {
              Indicator.close();
            }
          }
        })
        .catch((rej) => {
          console.log('GetSignature', rej);
          Indicator.close();
          this.$catchError(rej);
        });
    },
    networkForCourseInfo() {
      if (this.isLogined) {
        getCourseMsgLogin(this.course_info)
          .then((res) => {
            let courseInfo = res.result.course;
            if (courseInfo) {
              this.courseAllData = courseInfo;
              // if (this.platform == 'wxf1dae2ba24e9eaae') {
              Indicator.open('Loading...');
              this.networkForGetSignature();
              // }
              this.title = courseInfo.course_head;
              this.isCollected = courseInfo.is_collection == 1 ? true : false;
              if (
                courseInfo.course_status == 1 ||
                courseInfo.course_status == 2
              ) {
                this.networkForChatInfo();
              } else if (courseInfo.course_status == 3) {
                MessageBox.confirm(
                  '是否跳转到聊天历史记录页面',
                  '课程已结束'
                ).then(
                  (certain) => {
                    this.$router.push({
                      name: 'chatRoomHistory',
                      query: { id: this.course_info.uid },
                    });
                  },
                  (cancel) => {
                    console.log(cancel, 'action2');
                  }
                );
              }
            }
          })
          .catch((rej) => {
            this.$catchError(rej);
          });
      } else {
        getCourseMsgUnLogin(this.course_info)
          .then((res) => {
            let courseInfo = res.result.course;
            if (courseInfo) {
              this.courseAllData = courseInfo;
              // if (this.platform == 'wxf1dae2ba24e9eaae') {
              Indicator.open('Loading...');
              this.networkForGetSignature();
              // }
              this.title = courseInfo.course_head;
              if (
                courseInfo.course_status == 1 ||
                courseInfo.course_status == 2
              ) {
              } else if (courseInfo.course_status == 3) {
              }
            }
          })
          .catch((rej) => {
            this.$catchError(rej);
          });
      }
    },
    networkForChatInfo() {
      getChatRoomInfo(this.course_info)
        .then((res) => {
          bus.$emit('getChatInfo_sdk_id', res.result.data);
        })
        .catch((rej) => {
          this.$catchError(rej);
        });
    },
    collect() {
      if (this.haveLogin()) {
        if (this.isCollected) {
          cancelKeepTheCourse(this.course_info)
            .then((res) => {
              this.isCollected = false;
            })
            .catch((rej) => {
              this.$catchError(rej);
            });
        } else {
          keepTheCourse(this.course_info)
            .then((res) => {
              this.isCollected = true;
            })
            .catch((rej) => {
              this.$catchError(rej);
            });
        }
      } else {
        bus.$emit('login', 'show-view');
      }
    },
    reload() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.nav-right-btn {
  width: 40px;
  height: 40px;
}
.fixed-div {
  position: fixed;
  width: 100%;
}
.header {
  background: white;
  color: #323232;
}
.content {
  position: fixed;
  top: 40px;
  background: white;
  width: 100%;
  overflow-y: hidden;
  /* height: 100%; */
  height: calc(100% - 40px);
}
</style>
