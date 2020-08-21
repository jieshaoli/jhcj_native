<template>
  <div id="live-room">
    <div class="fixed-div">
      <mt-header :title=title
                 class="header">
        <router-link to="/"
                     slot="left">
          <mt-button icon="back"
                     @click="backPage">
          </mt-button>
        </router-link>
        <mt-button class="nav-right-btn"
                   slot="right"
                   @click="collect">
          <img style="width:20px;height:20px"
               src="../assets/image/collection.png"
               alt="" />
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
        <div class="swipe"></div>
        <div id="mse"></div>
      </div>
      <div class="live-choose">
        <mt-navbar v-model="selected"
                   class="navbar">
          <mt-tab-item id="简介">
            简介
          </mt-tab-item>
          <mt-tab-item id="要点">
            要点
          </mt-tab-item>
          <mt-tab-item id="交流">
            交流
          </mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <div class="content">
      <mt-tab-container v-model="selected"
                        :swipeable=true>
        <mt-tab-container-item id="简介">
          <div class="content-box">
            <live-intro v-bind:liveIntroUrl="courseIntroUrl"></live-intro>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="要点">
          <div class="content-box">
            <live-keys></live-keys>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="交流">
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
import bus from '../common/bus';
import { getCourseMsg } from '../api/courseApi';

import 'xgplayer';
import HlsPlayer from 'xgplayer-hls';
import FlvPlayer from 'xgplayer-flv';

let player = undefined;
export default {
  name: 'liveRoom',
  data() {
    return {
      course_info: {},
      title: '直播课',
      selected: '简介',
      hlsUrl: '',
      flvUrl: '',
      liveDefaultImg: '',
      courseIntroUrl: '',
    };
  },
  components: {
    liveIntro,
    liveKeys,
    liveChat,
  },
  methods: {
    initLivePlayer() {
      let boxDiv = document.getElementById('mse');
      //http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4
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
      console.log(ualower);
      if (
        (ualower.indexOf('iphone os') > -1 || ualower.indexOf('mac os') > -1) &&
        ualower.indexOf('mobile') > -1
      ) {
        return 'apple';
      } else {
        return 'else';
      }
    },
    initRongYun() {},
    backPage() {
      console.log('aaaaa');
    },
    collect() {
      if (this.haveLogin()) {
        let access_token = localStorage.getItem('access_token');
        console.log(access_token, '有token');
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
        return true;
      } else {
        return false;
      }
    },
    networkForLiveInfo() {
      if (this.haveLogin()) {
        getCourseMsg(this.course_info)
          .then((res) => {
            let courseInfo = res.result.course;
            if (courseInfo) {
              this.title = courseInfo.course_head;
              this.hlsUrl = courseInfo.hls_pull_url;
              this.flvUrl = courseInfo.http_pull_url;
              this.liveDefaultImg = courseInfo.course_picture;
              this.courseIntroUrl = courseInfo.synopsis_url;
              if (this.hlsUrl.length > 1 && this.flvUrl.length > 1) {
                // setTimeout(() => {
                //   this.initLivePlayer()
                // }, 500)
              }
            }
          })
          .catch((rej) => {});
      }
    },
  },
  created() {
    var hrefStr = window.location.href;
    if (hrefStr.indexOf('id') > -1) {
      let id = window.location.href.split('id=')[1].split('&')[0];
      this.course_info = {
        type: 2,
        uid: id,
      };
      console.log('liveRoom id = ', id);
      this.networkForLiveInfo();
    }
  },
  mounted() {},
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

#live-room .content {
  position: fixed;
  top: 305px;
  /* margin-top: 300px; */
  width: 100%;
  background: white;
  height: 100%;
}
#live-room .content-box {
  width: 100%;
  overflow-y: hidden;
  /* height: 100%; */
  height: calc(100vh - 305px);
}
</style>
