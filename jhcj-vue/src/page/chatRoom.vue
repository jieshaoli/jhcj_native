<template>
  <div id="chat-room">
    <div class="fixed-div">
      <!-- <mt-header :title=title
                 class="header"
                 v-if="platform == '' || platform == 'app'">
        <mt-button class="nav-left-btn"
                   slot="left"
                   @click="reload">
          <img style="width:20px;height:20px"
               src="../assets/image/reload.png"
               alt="刷新">
        </mt-button>
        <mt-button class="nav-right-btn"
                   slot="right"
                   @click="collect">
          <img style="width:20px;height:20px"
               src="../assets/image/list.png"
               alt="历史列表"
               v-if="platform == 'wxf1dae2ba24e9eaae'">
          <img style="width:20px;height:20px"
               :src="isCollected ? require('../assets/image/collected.png') : require('../assets/image/collection.png')"
               alt="收藏"
               v-else />
        </mt-button>
      </mt-header> -->
      <div class="header">
        <!-- v-else -->
        <div class="left-btn"
             @click="reload"><img style="width:20px;height:20px"
               src="../assets/image/reload.png"
               alt="刷新"></div>
        <div class="nav-btn-group">
          <div class="nav-btn"
               id="living"
               @click="navClick('living')">
            <div class="nav-title">直播</div>
          </div>
          <div class="nav-btn"
               id="vip"
               @click="navClick('vip')">
            <div class="nav-title">VIP</div>
          </div>
        </div>
        <div class="right-btn"
             @click="collect">
          <img style="width:20px;height:20px"
               src="../assets/image/list.png"
               alt="历史列表">
        </div>
      </div>
    </div>
    <!-- <div class="content"
         v-if="platform == '' || platform == 'app'">
      <live-chat v-bind:course_info="course_info"
                 v-bind:teacher_id="teacherId"></live-chat>
    </div> -->
    <div class="content">
      <!-- v-else -->
      <free-text-living v-bind:course_info="course_info"
                        v-bind:teacher_id="teacherId"
                        v-show="currentShowId == 'living'"></free-text-living>
      <live-chat v-bind:course_info="course_info"
                 v-bind:teacher_id="teacherId"
                 v-bind:init_chat="isPayer"
                 v-show="currentShowId == 'vip'"></live-chat>
    </div>
  </div>
</template>

<script>
import liveChat from '../components/liveChat';
import freeTextLiving from '../components/freeTextLiving';
import {
  getCourseMsgUnLogin,
  getCourseMsgLogin,
  // getChatRoomInfo,
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
      title: '',
      course_info: {},
      courseAllData: {},
      isLogined: false,
      isCollected: false,
      platform: '',
      openId: '',
      signature: '',
      teacherId: -1,
      currentShowId: 'living',
      isPayer: false,
    };
  },
  components: {
    liveChat,
    freeTextLiving,
  },
  mounted() {
    // if (this.platform == '' || this.platform == 'app') {
    // } else if (this.platform == 'wxf1dae2ba24e9eaae') {
      $('#living').addClass('select-nav');
    // }
  },
  created() {
    var hrefStr = window.location.href;
    this.checkHref(hrefStr);
    this.haveLogin();
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
      });
      wx.error((res) => {
        console.log('wx error:', res);
      });
    },
    navClick(tag) {
      if (tag == 'vip') {
        if (!this.judgeToLogin()) {
          return;
        }
      }
      $('#' + this.currentShowId).removeClass('select-nav');
      this.currentShowId = tag;
      $('#' + this.currentShowId).addClass('select-nav');
    },
    judgeToLogin() {
      if (this.haveLogin()) {
        return true;
      } else {
        bus.$emit('login', 'show-view');
        return false;
      }
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
            if (hrefStr.indexOf('code') == -1) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              this.isLogined = false;
              this.$store.commit('CLEAR_USER');
            }
          }
        } else if (this.platform == 'app') {
          document.getElementsByTagName('title')[0].innerText = '君汇财经';
        }
        console.log('platform = ', this.platform);
      } else {
        this.isPayer = true;
        document.getElementsByTagName('title')[0].innerText = '君汇财经';
      }
    },
    isWXBrower() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
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
          }
          if (res.data) {
            if (res.data.result.length > 0) {
              this.signature = res.data.result;
              if (this.courseAllData && this.courseAllData != {}) {
                this.wxShare();
              }
            }
          }
        })
        .catch((rej) => {
          console.log('GetSignature', rej);
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
              this.teacherId = courseInfo.teacher_id;
              if (this.isWXBrower()) {
                if (
                  this.platform == 'wxf1dae2ba24e9eaae' &&
                  window.location.href.indexOf('code') == -1
                ) {
                  console.log('公众号分享出去');
                } else {
                  this.networkForGetSignature();
                }
              } else {
                console.log('非微信中打开');
              }

              this.title = courseInfo.course_head;
              this.isCollected = courseInfo.is_collection == 1 ? true : false;
              if (
                courseInfo.course_status == 1 ||
                courseInfo.course_status == 2
              ) {
                // this.networkForChatInfo();
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
              this.teacherId = courseInfo.teacher_id;
              if (this.isWXBrower()) {
                if (
                  this.platform == 'wxf1dae2ba24e9eaae' &&
                  window.location.href.indexOf('code') == -1
                ) {
                  console.log('公众号分享出去');
                } else {
                  this.networkForGetSignature();
                }
              } else {
                console.log('非微信中打开');
              }

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
    collect() {
      if (this.$haveLogin()) {
        if (this.platform == 'wxf1dae2ba24e9eaae') {
          this.$router.push({
            name: 'chatRoomList',
            query: { platform: 'wxf1dae2ba24e9eaae' },
          });
        } else {
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
  height: 40px;
}
.header {
  background: white;
  width: 100%;
  height: 100%;
  color: #323232;
  position: relative;
}
.header .left-btn {
  display: inline-block;
  position: absolute;
  left: 10px;
  top: 10px;
}
.header .right-btn {
  display: inline-block;
  position: absolute;
  top: 10px;
  right: 10px;
}
.header .nav-btn-group {
  display: inline-flex;
  position: absolute;
  width: calc(100% - 160px);
  height: 100%;
  left: 80px;
  justify-content: center;
}
.nav-btn-group .nav-btn {
  width: 50%;
  text-align: center;
  font-size: 20px;
  vertical-align: middle;
}
.nav-btn .nav-title {
  line-height: 40px;
  color: gray;
}
.nav-btn-group .select-nav {
  font-size: 22px;
}
.select-nav .nav-title {
  color: black;
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
