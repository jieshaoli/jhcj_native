<template>
  <div id="live-keys">
    <ul>
      <li v-for="(info, index) in keysInfo"
          :key="index">
        <div class="cell-bg">
          <span class="time">{{info.ctime | showTime}}</span>
          <div class="point-line">
            <img src="../assets/image/redPoint.png"
                 alt=""
                 class="red-points">
            <div class="verticle-line"></div>
          </div>
          <!-- <i class="node-icon"></i> -->
          <div class="content-bg">
            <p>{{info.contentStr}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getLiveKeyPoints } from '@/api/courseApi.js';
import bus from '../common/bus';
import { Toast } from 'mint-ui';

export default {
  name: 'liveKeys',
  // props: {
  //   course_id: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      keysInfo: [],
      currentPage: 1,
      chat_id: '',
    };
  },
  created() {
    bus.$on('liveKeyPoints', (msg) => {
      console.log(JSON.stringify(msg));
      let element = {
        ctime: msg.info_time,
        contentStr: msg.info.content,
      };
      this.keysInfo.unshift(element);
    });
    bus.$on('getChatInfo_sdk_id', (msg) => {
      this.chat_token = msg.token;
      this.chat_id = msg.sdk_id;
      if (this.chat_id && this.chat_id.length > 0) {
        this.networkForKeyPoints();
      }
    });
    if (this.haveLogin()) {
      if (this.chat_id && this.chat_id.length > 0) {
        this.networkForKeyPoints();
      }
    }
  },
  methods: {
    networkForKeyPoints() {
      this.keysInfo = [];
      console.log('keypoints:', this.chat_id);
      getLiveKeyPoints({course_id: this.chat_id, page: this.currentPage})
        .then((res) => {
          let data = res.result.data;
          data.forEach((info) => {
            let msg = Base64.decode(info);
            let msgInfo = JSON.parse(msg);
            let element = {
              ctime: msgInfo.info_time,
              contentStr: msgInfo.info.content,
            };
            this.keysInfo.push(element);
          });
        })
        .catch((rej) => {
          this.$catchError(rej);
        });
    },
    haveLogin() {
      let access_token = localStorage.getItem('access_token');
      console.log(access_token,'access_token');
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
  },
};
</script>
<style lang="css" scoped>
#live-keys {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.cell-bg {
  float: left;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
}
.time {
  margin-left: 16px;
  margin-top: 16px;
  color: #656565;
  font-size: 15pt;
  width: 45px;
  height: 30px;
}
.point-line {
  margin-left: 15px;
  width: 10px;
}
.point-line .verticle-line {
  margin-left: 4px;
  width: 1px;
  height: 100%;
  background: #eeeeee;
  z-index: 0;
}
.point-line .red-points {
  margin-top: 26px;
  width: 8px;
  height: 8px;
  z-index: 1;
}
.content-bg {
  margin: 16px 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  padding: 8px 15px;
  background: white;
  position: relative;
}
.content-bg::before,
.content-bg::after {
  content: '';
  display: block;
  position: absolute;
  top: 8px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}
.content-bg:before {
  left: -11px;
  border-right-color: white;
  z-index: 1;
}
.content-bg:after {
  left: -13px;
  border-right-color: #ddd;
  z-index: 0;
}
</style>
