<template>
  <div class='flex-v'>
    <div class="flex-h flex-center header">
        <img class="headBack" @click="goBack()" src="../assets/image/back.png" alt="">
        <div class="headerCom flex-h flex-vh-center">
            <img @click="reducegetDataListFun()" src="../assets/image/reduce.png" alt="" style="width: 15px;height: 15px;">
            <div class="headerNum" @click="dataCount > 1 ? popupVisible = true:''">{{course_info.page}}/{{dataCount}}</div>
            <img @click="addgetDataListFun()" src="../assets/image/add.png" alt="" style="width: 15px;height: 15px;">
        </div>
    </div>
    <div>
        <mt-navbar v-model="selected" @click.native='handleConfirm()'>
          <mt-tab-item id="0">查看全部</mt-tab-item>
          <mt-tab-item id="1">只看老师</mt-tab-item>
          <mt-tab-item id="2">只看我</mt-tab-item>
          <div class="minttabsline"></div>
        </mt-navbar>
    </div>
    <div class="comtent">
      <largerPicture v-show="isShow" :isShowimage_url=isShowimage_url @imgBgHidechild="imgBgHidechild" ></largerPicture>
      <ul class="lite-chatbox">
        <li v-for="(item, index) in chat_data"
            :key="index">
          <div class="cright cmsg"
              v-if="item.content.content.user.user_id == userInfo.user_id">
            <img class="headIcon radius"
                ondragstart="return false;"
                oncontextmenu="return false;"
                :src="item.content.content.user.user_photo" />
            <span class="time">{{ item.content.content.info_time | showTime }}</span>
            <span class="name">{{ item.content.content.user.user_name }}</span><br>
            <span class="content">{{ item.content.content.info.content }}</span>
          </div>
          <div class="cleft cmsg"
              v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 1">
            <img class="headIcon radius"
                ondragstart="return false;"
                oncontextmenu="return false;"
                :src="item.content.content.user.user_photo" />
            <div class="telFlag" :style="{display:(item.content.content.user.user_role == 1 ? 'block' :'none')}">老师</div>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.content.content.info_time | showTime }}</span><br>
            <span class="content" :style="{background:(item.content.content.user.user_role == 1 ? '#FB4546' :'#fff'),color:(item.content.content.user.user_role == 1 ? '#fff' :'#666')}">{{ item.content.content.info.content }}</span>
          </div>
          <div class="cleft cmsg"
              v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 2">
            <img class="headIcon radius"
                ondragstart="return false;"
                oncontextmenu="return false;"
                :src="item.content.content.user.user_photo" />
            <div class="telFlag" :style="{display:(item.content.content.user.user_role == 1 ? 'block' :'none')}">老师</div>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.content.content.info_time | showTime }}</span><br>
            <span class="content" :style="{background:(item.content.content.user.user_role == 1 ? '#FB4546' :'#fff'),color:(item.content.content.user.user_role == 1 ? '#fff' :'#666')}"><img @click="imgBgHide(item.content.content.info.image_url)" :src="item.content.content.info.image_url" /></span>
          </div>
          <div class="cleft cmsg"
              v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 3">
            <img class="headIcon radius"
                ondragstart="return false;"
                oncontextmenu="return false;"
                :src="item.content.content.user.user_photo" />
            <div class="telFlag" :style="{display:(item.content.content.user.user_role == 1 ? 'block' :'none')}">老师</div>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.content.content.info_time | showTime }}</span><br>
            <span class="content" :style="{background:(item.content.content.user.user_role == 1 ? '#FB4546' :'#fff'),color:(item.content.content.user.user_role == 1 ? '#fff' :'#666')}">这是播放音频的</span>
          </div>
          <div class="cleft cmsg"
              v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 4">
            <img class="headIcon radius"
                ondragstart="return false;"
                oncontextmenu="return false;"
                :src="item.content.content.user.user_photo" />
            <div class="telFlag" :style="{display:(item.content.content.user.user_role == 1 ? 'block' :'none')}">老师</div>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.content.content.info_time | showTime }}</span><br>
            <span class="content" :style="{background:(item.content.content.user.user_role == 1 ? '#FB4546' :'#fff'),color:(item.content.content.user.user_role == 1 ? '#fff' :'#666')}">{{ item.content.content.info.content }}<br /><img @click="imgBgHide(item.content.content.info.image_url)" :src="item.content.content.info.image_url" /></span>
          </div>
          <div class="cleft cmsg"
              v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 5">
            <img class="headIcon radius"
                ondragstart="return false;"
                oncontextmenu="return false;"
                :src="item.content.content.user.user_photo" />
            <div class="telFlag" :style="{display:(item.content.content.user.user_role == 1 ? 'block' :'none')}">老师</div>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.content.content.info_time | showTime }}</span><br>
            <span class="content" :style="{background:(item.content.content.user.user_role == 1 ? '#FB4546' :'#fff'),color:(item.content.content.user.user_role == 1 ? '#fff' :'#666')}">
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
            <div class="telFlag" :style="{display:(item.content.content.user.user_role == 1 ? 'block' :'none')}">老师</div>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.content.content.info_time | showTime }}</span><br>
            <span class="content" :style="{background:(item.content.content.user.user_role == 1 ? '#FB4546' :'#fff'),color:(item.content.content.user.user_role == 1 ? '#fff' :'#666')}">
              <div class="questionDiv">
                <span class="questionName">【问】{{ item.content.content.info.qa_name }}</span>
                <span class="questionTime">{{ item.content.content.info.qa_time | showTime }}</span><br />
                <span class="questionContent">{{ item.content.content.info.qa_content }}</span>
              </div>
              【答】<img @click="imgBgHide(item.content.content.info.image_url)" :src="item.content.content.info.image_url" />
            </span>
          </div>
          <div class="cleft cmsg"
              v-else-if="item.content.content.user.user_id != userInfo.user_id && item.content.content.info_type == 7">
            <img class="headIcon radius"
                ondragstart="return false;"
                oncontextmenu="return false;"
                :src="item.content.content.user.user_photo" />
            <div class="telFlag" :style="{display:(item.content.content.user.user_role == 1 ? 'block' :'none')}">老师</div>
            <span class="name">{{ item.content.content.user.user_name }}</span>
            <span class="time">{{ item.content.content.info_time | showTime }}</span><br>
            <span class="content" :style="{background:(item.content.content.user.user_role == 1 ? '#FB4546' :'#fff'),color:(item.content.content.user.user_role == 1 ? '#fff' :'#666')}">
              <div class="questionDiv">
                <span class="questionName">【问】{{ item.content.content.info.qa_name }}</span>
                <span class="questionTime">{{ item.content.content.info.qa_time | showTime }}</span><br />
                <span class="questionContent">{{ item.content.content.info.qa_content }}</span>
              </div>
              【答】{{ item.content.content.info.content }}<br /><img @click="imgBgHide(item.content.content.info.image_url)" :src="item.content.content.info.image_url" />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
        <!-- 此处slots为动态传入的值，通过computed来处理，数据通过vuex管理，由于数据为对象数组，需设置 value-key 属性来指定显示的字段名 -->
        <mt-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="5" :show-toolbar="false"  ref="picker" value-key="cName">
          <!-- <mt-button @click="handleConfirm" class="sure">确认</mt-button> -->
        </mt-picker>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import largerPicture from '../components/largerPicture';
  import { getChatHistory } from '../api/courseApi';
  import { mapGetters } from 'vuex';
  import { Base64 } from 'js-base64';
  export default {
    name: 'chatRoomHistory',
    data () {
      return {
        selected: '0',
        number: 1,
        dataCount: 1,
        course_info: {
          page: '',
          type: 0,
          uid: '',
          playback: true
        },
        chat_data: [],
        popupVisible: false,
        dateSlots: [{values: [1]}],

        isShow: false,
      isShowimage_url: '',
      };
    },

    components: {
      largerPicture
    },

    created() {
      let id = window.location.href.split('id=')[1].split('&')[0];
      this.course_info.uid = id;
    },

    mounted() {
      // this.getDataListFun();
      // document.getElementById('live-chat').style="display:none";
    },

    computed: {
      ...mapGetters({
        userInfo: 'user',
      }),
    },

    methods: {
      goBack() {
        this.$router.go(-1);
      },
      imgBgHidechild(val){
        this.isShow = val;
      },
      imgBgHide(val){
        this.isShow = !this.isShow;
        this.isShowimage_url = val;
      },
      onDateChange (picker, values) {
        this.popupVisible = false;
        this.course_info.page = values[0];
        console.log('qweqw',values[0]);
        this.getDataListFun();
      },
      handleConfirm () {
       this.course_info.page = 1;
       this.course_info.type = this.selected;
       this.getDataListFun();
      },
      reducegetDataListFun() {
        if(this.course_info.page > 1) {
          this.course_info.page--;
          this.getDataListFun();
        }
      },
      addgetDataListFun() {
        if(this.course_info.page < this.dataCount && this.dataCount > 1) {
          this.course_info.page++;
          this.getDataListFun()
        }
      },
      getDataListFun() {
        getChatHistory(this.course_info)
        .then((res) => {
          this.chat_data = [];
          if(res.result.count == 0){
            this.dataCount = 0;
            this.course_info.page = 0;
          }else {
            this.dataCount = Math.ceil(res.result.count/20);
          }
          let data = res.result.data;
          // console.log(JSON.parse(Base64.decode(data[3].content)).content.user.user_role);
          this.dateSlots[0].values = [];
          for (let num = 1; num <= this.dataCount; num++) {
            this.dateSlots[0].values.push(num);
          }
          // console.log(this.dateSlots[0].values)
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
              console.log(this.chat_data)
            }
            this.canLoadMore = true;
          } else {
            this.canLoadMore = false;
          }
          // this.$refs.loadmore.onTopLoaded();
        })
        .catch((rej) => {
          // this.$refs.loadmore.onTopLoaded();
          this.catchError(rej);
        });
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
  }
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
html,body {
  overflow: hidden;
}
.flex-h {
    display: -webkit-box;
    /* android 2.1-3.0, ios 3.2-4.3 */
    display: -webkit-flex;
    /* Chrome 21+ */
    display: -ms-flexbox;
    /* WP IE 10 */
    display: flex;
    /* android 4.4 */
}

.flex-v {
    display: -webkit-box;
    /* android 2.1-3.0, ios 3.2-4.3 */
    display: -webkit-flex;
    /* Chrome 21+ */
    display: -ms-flexbox;
    /* WP IE 10 */
    display: flex;
    /* android 4.4 */
    -webkit-box-orient: vertical;
    /* android 2.1-3.0, ios 3.2-4.3 */
    -webkit-flex-direction: column;
    /* Chrome 21+ */
    -ms-flex-direction: column;
    /* WP IE 10 */
    flex-direction: column;
    /* android 4.4 */
}

.flex-center {
    -webkit-box-pack: center;
    /* android 2.1-3.0, ios 3.2-4.3 */
    -webkit-justify-content: center;
    /* Chrome 21+ */
    -ms-flex-pack: center;
    /* WP IE 10 */
    justify-content: center;
    /* android 4.4 */
    -webkit-box-align: center;
    /* android 2.1-3.0, ios 3.2-4.3 */
    -webkit-align-items: center;
    /* Chrome 21+ */
    -ms-flex-align: center;
    /* WP IE 10 */
    align-items: center;
    /* android 4.4 */
}

.flex-vh-center {
    -webkit-box-align: center;
    /* android 2.1-3.0, ios 3.2-4.3 */
    -webkit-align-items: center;
    /* Chrome 21+ */
    -ms-flex-align: center;
    /* WP IE 10 */
    align-items: center;
    /* android 4.4 */
}

.flex-between {
    /*! autoprefixer: off */
    -webkit-box-pack: justify;
    /* android 2.1-3.0, ios 3.2-4.3 */
    -webkit-justify-content: space-between;
    /* Chrome 21+ */
    -ms-flex-pack: justify;
    /* WP IE 10 */
    justify-content: space-between;
}

.padt10 {
    padding-top: 10px;
}

.padb10 {
    padding-bottom: 10px;
}

.marl5 {
    margin-right: 5px;
}

.marb10 {
    margin-bottom: 10px;
}

.w100 {
    width: 100%;
}

.header {
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
}

.headBack {
    position: fixed;
    top: 14px;
    left: 16px;
    width: 9px;
    height: 18px;
    z-index: 9999;
}

.headerCom {
    height: 45px;
    line-height: 45px;
    text-align: center;
}

.headerNum {
    width: 100px;
    color: rgba(238, 10, 36, 1);
}

.mainlistBox {
    padding: 15px 20px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    margin-top: 10px;
}
.selected {
    width: fit-content;
    height: fit-content;
    font-size: 12px;
    color: #E3191A;
    border-radius: 3px;
    border: 1px solid #E3191A;
}

.comtent{
  overflow-y: scroll;
  height: calc(100vh - 100px);
  /* padding-bottom: 30px; */
}
.mint-navbar .mint-tab-item {
  color: #646566;
}
.mint-navbar .mint-tab-item.is-selected {
  text-decoration: none;
  position: relative;
  border-bottom: none;
  margin-bottom: 0;
  color: #323233;
  font-weight: 500;
}
.mint-navbar .mint-tab-item.is-selected ::after{
  content: " ";
  width: 15px;
  height: 2px;
  background: #ee0a24;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.mint-popup {
  width: 100%;
}

.mint-popup >>> .picker-slot {
  min-width: 100%;
}

.img-bg {
    width:100%;
    height:100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index:9999;
    background:rgba(0,0,0,.4);
}
.img-bg img{
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width:95%;
    height:auto;
    max-width:95%;
  }

.telFlag {
  position: absolute;
  top: 45px;
  left: 5px;
  font-size: 12px;
}
</style>
