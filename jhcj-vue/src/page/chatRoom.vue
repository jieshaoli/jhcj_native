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
  getCourseMsg,
  keepTheCourse,
  cancelKeepTheCourse,
} from '../api/courseApi';
import bus from '../common/bus';
import { Toast } from 'mint-ui';

export default {
  name: 'chatRoom',
  data() {
    return {
      title: '文字直播课',
      course_info: {},
      isCollected: false,
    };
  },
  components: {
    liveChat,
  },
  created() {
    var hrefStr = window.location.href;
    if (hrefStr.indexOf('id') > -1) {
      let id = window.location.href.split('id=')[1].split('&')[0];
      this.course_info = {
        type: 1,
        uid: id,
      };
      console.log('chatRoom id = ', id);
      this.networkForCourseInfo();
    }
  },
  methods: {
    networkForCourseInfo() {
      getCourseMsg(this.course_info)
        .then((res) => {
          let courseInfo = res.result.course;
          if (courseInfo) {
            this.title = courseInfo.course_head;
          }
        })
        .catch((rej) => {
          this.catchError(rej);
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
              this.catchError(rej);
            });
        } else {
          keepTheCourse(this.course_info)
            .then((res) => {
              this.isCollected = true;
            })
            .catch((rej) => {
              this.catchError(rej);
            });
        }
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
    reload() {
      location.reload();
    },
    catchError(rej) {
      console.log('catch:', rej);
      try {
        if (rej.data.message) {
          Toast(rej.data.message);
        }
      } catch (error) {
        console.log('error:', error);
      }
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
