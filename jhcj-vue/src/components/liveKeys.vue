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

export default {
  name: 'liveKeys',
  props: {
    course_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      keysInfo: [],
    };
  },
  created() {
    for (var i in [1, 2, 3, 4, 5, 6]) {
      let element = {
        ctime: new Date().getTime() + '',
        contentStr:
          '龙头股通常在大盘下跌末期端，市场恐慌时，逆市涨停，提前见底，或者先于大盘启动，并且经受大盘一轮下跌考验。再如12月2日出现的新龙头太原刚玉，它符合刚讲的龙头战法。',
      };
      this.keysInfo.push(element);
    }
    bus.$on('login', (msg) => {
      if (msg == 'success-todo') {
        this.keysInfo = [];
        this.networkForKeyPoints();
      }
    });
    bus.$on('liveKeyPoints', (msg) => {
      console.log(JSON.stringify(msg));
      let element = {
        ctime: msg.info_time,
        contentStr: msg.info.content,
      };
      this.keysInfo.push(element);
    });
    if (this.haveLogin()) {
      this.networkForKeyPoints();
    }
  },
  methods: {
    networkForKeyPoints() {
      getLiveKeyPoints({ course_id: this.course_id })
        .then((res) => {
          let data = res.result.data;
          data.forEach((info) => {
            let element = {
              ctime: info.info_time,
              contentStr: info.info.content,
            };
            this.keysInfo.push(element);
          });
        })
        .catch((rej) => {});
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
