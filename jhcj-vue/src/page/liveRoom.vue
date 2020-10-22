<template>
  <div id="live-room">
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
          <img id="collectImg"
               style="width:20px;height:20px"
               :src="isCollected ? require('../assets/image/collected.png') : require('../assets/image/collection.png')" />
        </mt-button>
        <!-- <mt-button class="nav-right-btn"
                   slot="right"
                   @click="share">
          <img style="width:20px;height:20px"
               src="../assets/image/share.png"
               alt="" />
        </mt-button> -->
      </mt-header>
      <div id="live-div">
        <!-- <mt-swipe :auto="0"
                  :show-indicators="false"
                  class="swipe">
        </mt-swipe> -->
        <div class="swipe"
             id="videoBg"></div>
        <div id="mse"></div>
      </div>
      <div class="live-choose">
        <mt-navbar v-model="selected"
                   class="navbar">
          <mt-tab-item id="intro">
            简介
          </mt-tab-item>
          <mt-tab-item id="keys">
            要点
          </mt-tab-item>
          <mt-tab-item id="chat">
            交流
          </mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <div class="live-content">
      <mt-tab-container v-model="selected"
                        :swipeable=true>
        <mt-tab-container-item id="intro">
          <div class="content-box">
            <live-intro v-bind:liveIntroUrl="courseIntroUrl"></live-intro>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="keys">
          <div class="content-box">
            <live-keys v-bind:course_id="course_id"></live-keys>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="chat">
          <div class="content-box">
            <live-chat v-bind:course_info="course_info"></live-chat>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import liveChat from '../components/liveChat';
import liveKeys from '../components/liveKeys';
import liveIntro from '../components/liveIntro';
import { MessageBox, Toast } from 'mint-ui';
import bus from '../common/bus';
import {
  getCourseMsgUnLogin,
  getCourseMsgLogin,
  getChatRoomInfo,
  keepTheCourse,
  cancelKeepTheCourse,
} from '../api/courseApi';

import 'xgplayer';
import HlsPlayer from 'xgplayer-hls';
import FlvPlayer from 'xgplayer-flv';
import { _debounce, _throttling } from '../common/publicFunc.js';
// import func from '../../vue-temp/vue-editor-bridge';

let player = undefined;
export default {
  name: 'liveRoom',
  data() {
    return {
      course_info: {},
      title: '直播课',
      selected: 'intro',
      hlsUrl: '',
      flvUrl: '',
      liveDefaultImg: '',
      courseIntroUrl: '',
      course_id: '',
      isLogined: false,
      isCollected: false,
      platform: '',
      playerInit: false,
    };
  },
  components: {
    liveIntro,
    liveKeys,
    liveChat,
  },
  created() {
    var hrefStr = window.location.href;
    this.checkHref(hrefStr);

    this.haveLogin();
    bus.$on('login', (msg) => {
      if (msg == 'success-todo') {
        if (this.isLogined == false) {
          this.isLogined = true;
          this.networkForLiveInfo();
        }
      }
    });
    this.networkForLiveInfo();
  },
  mounted() {
    let liveContent = document.getElementsByClassName('live-content')[0];
    let contentBoxes = document.getElementsByClassName('content-box');
    for (let index = 0; index < contentBoxes.length; index++) {
      let contentBox = contentBoxes[index];
      contentBox.style.height = liveContent.offsetHeight + 'px';
    }
  },
  /**
   *
mozilla/5.0 (iphone; cpu iphone os 13_1_3 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/13.0.1 mobile/15e148 safari/604.1" – "userPla" – "macintel"
mozilla/5.0 (iphone; cpu iphone os 13_2_3 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/13.0.3 mobile/15e148 safari/604.1 userPla macintel
mozilla/5.0 (macintosh; intel mac os x 10_15_6) applewebkit/537.36 (khtml, like gecko) chrome/85.0.4183.121 safari/537.36 userPla macintel
mozilla/5.0 (windows nt 10.0; win64; x64; rv:81.0) gecko/20100101 firefox/81.0 userPla win32
userAgent: mozilla/5.0 (linux; android 9; rvl-al09 build/huaweirvl-al09; wv) applewebkit/537.36 (khtml, like gecko) version/4.0 chrome/77.0.3865.120 mqqbrowser/6.2 tbs/045331 mobile safari/537.36 mmwebid/4680 micromessenger/7.0.19.1760(0x27001339) process/tools wechat/arm64 nettype/wifi language/zh_cn abi/arm64 userPla linux aarch64
userAgent: mozilla/5.0 (iphone; cpu iphone os 13_5_1 like mac os x) applewebkit/605.1.15 (khtml, like gecko) mobile/15e148 micromessenger/7.0.15(0x17000f31) nettype/wifi language/zh_cn userPla iphone
   */
  methods: {
    initLivePlayer() {
      let boxDiv = document.getElementById('mse');
      if (this.ifAppleBrowser() == 'apple') {
        console.log('hls player');
        player = new HlsPlayer({
          id: 'mse',
          url: this.hlsUrl,
          isLive: true,
          preloadTime: 30,
          minCachedTime: 5,
          cors: true,
          closeVideoClick: true,
          playsinline: true,
          width: boxDiv.width,
          height: boxDiv.height,
          'x5-video-player-type': 'h5',
          poster: this.liveDefaultImg,
        });
      } else {
        console.log('flv player');
        player = new FlvPlayer({
          id: 'mse',
          url: this.flvUrl,
          isLive: true,
          preloadTime: 30,
          minCachedTime: 5,
          cors: true,
          closeVideoClick: true,
          playsinline: true,
          width: boxDiv.width,
          height: boxDiv.height,
          'x5-video-player-type': 'h5',
          poster: this.liveDefaultImg,
        });
        this.playerInit = true;
      }

      player.once('ready', () => {
        console.log('ready');
      });
      // 视频生成结束
      player.once('complete', () => {
        console.log('complete');
      });
      // 实例已销毁
      player.once('destroy', () => {
        console.log('destroy');
      });
    },
    ifAppleBrowser() {
      var ualower = navigator.userAgent.toLocaleLowerCase();
      var planfrom = navigator.platform.toLocaleLowerCase();
      console.log('userAgent:', ualower, 'userPla', planfrom);
      let type = 'apple';
      if (planfrom.indexOf('iphone') > -1 && ualower.indexOf('iphone') > -1) {
        type = 'apple';
      }
      // else if(planfrom.indexOf('mac') > -1 && ualower.indexOf('iphone') > -1) {
      //   type = 'apple';
      // }
      else {
        type = 'else';
      }
      return type;
    },
    initRongYun() {},
    collect() {
      if (this.haveLogin()) {
        this.networkForIfKeepCourse();
      } else {
        bus.$emit('login', 'show-view');
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
        let id = window.location.href.split('id=')[1].split('&')[0];
        this.course_info = {
          type: 2,
          uid: id,
        };
        console.log('liveRoom id = ', id);
      } else {
        MessageBox.alert('课程出现错误,请输入正确网址', '出错');
      }
      // if (hrefStr.indexOf('platform') > -1) {
      //   this.platform = hrefStr.split('platform=')[1].split('&')[0];
      //   console.log('platform = ', this.platform);
      //   if (this.platform) {
      //     if (this.platform == 'wxf1dae2ba24e9eaae') {
      //       document.getElementsByTagName('title')[0].innerText = '服务笔记';
      //     }
      //   } else {
      //     document.getElementsByTagName('title')[0].innerText = '君汇财经';
      //   }
      // } else {
      //   document.getElementsByTagName('title')[0].innerText = '君汇财经';
      // }
    },
    networkForLiveInfo() {
      if (this.isLogined) {
        getCourseMsgLogin(this.course_info)
          .then((res) => {
            let courseInfo = res.result.course;
            if (courseInfo) {
              this.title = courseInfo.course_head;
              this.isCollected = courseInfo.is_collection == 1 ? true : false;
              this.hlsUrl = courseInfo.hls_pull_url;
              this.flvUrl = courseInfo.http_pull_url;
              this.liveDefaultImg = courseInfo.course_picture;
              this.courseIntroUrl = courseInfo.synopsis_url;
              if (
                this.liveDefaultImg.length > 1 &&
                typeof this.liveDefaultImg == 'string'
              ) {
                var bg = document.getElementById('videoBg');
                bg.style.backgroundImage = 'url(' + this.liveDefaultImg + ')';
              }
              if (!this.playerInit) {
                if (this.hlsUrl.length > 1 && this.flvUrl.length > 1) {
                  setTimeout(() => {
                    this.initLivePlayer();
                  }, 500);
                }
              }
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
                    window.location.href = 'https://www.baidu.com';
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
              this.title = courseInfo.course_head;
              this.hlsUrl = courseInfo.hls_pull_url;
              this.flvUrl = courseInfo.http_pull_url;
              this.liveDefaultImg = courseInfo.course_picture;
              this.courseIntroUrl = courseInfo.synopsis_url;
              if (
                this.liveDefaultImg.length > 1 &&
                typeof this.liveDefaultImg == 'string'
              ) {
                var bg = document.getElementById('videoBg');
                bg.style.backgroundImage = 'url(' + this.liveDefaultImg + ')';
              }
              if (this.hlsUrl.length > 1 && this.flvUrl.length > 1) {
                setTimeout(() => {
                  this.initLivePlayer();
                }, 500);
              }
              if (
                courseInfo.course_status == 1 ||
                courseInfo.course_status == 2
              ) {
                this.networkForChatInfo();
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
    networkForIfKeepCourse: _throttling(function () {
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
    }, 1500),
    reload() {
      location.reload();
    },
  },
  beforeDestroy() {
    player.destroy(true);
  },
  destroyed() {
    player.destroy(true);
  },
};
</script>

<style lang="css" scoped>
#live-room {
  display: flex;
  flex-direction: column;
  align-items: center;
}
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
#live-div {
  top: 40px;
  width: 100%;
  height: 211px;
  z-index: 1;
}
.live-choose {
  width: 100%;
  top: 251px;
  z-index: 1;
  box-sizing: border-box;
}
#live-div .swipe {
  width: 100%;
  height: 211px;
  position: absolute;
  z-index: 1;
  background-color: lightgray;
  background-image: url(../assets/image/logo_empty.png);
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
}
#live-div #mse {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 211px;
  box-sizing: border-box;
}
.live-choose .navbar {
  background: white;
  width: 100%;
  height: 50px;
  border-bottom: 0.5px solid #eee;
}
/* .navbar /deep/ .is-selected {
  text-decoration: none;
  border-bottom: none;
} */
.navbar /deep/ .mint-tab-item {
  text-decoration: none;
}
.is-selected >>> .mint-tab-item-label {
  color: #323232;
  font-size: 17pt;
}
.navbar /deep/ .mint-tab-item-label {
  color: #989898;
  font-size: 15pt;
  text-align: center;
}

#live-room .live-content {
  position: fixed;
  top: 305px;
  /* margin-top: 300px; */
  width: 100%;
  background: white;
  height: calc(100% - 305px);
}
#live-room .content-box {
  width: 100%;
  overflow-y: hidden;
}
</style>
