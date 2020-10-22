<template>
  <div class='flex-v h100'>
      <div v-show="logoFlag" class="mainlistBox flex-h flex-between" v-for="item in arrLists" :key="item.id" @click="handleClick(item.uid)">
          <div class="flex-h">
              <img class="listsImg" :src="item.course_picture" alt="">
              <div class="flex-v">
                  <div class="listsTime">{{item.time_period}}</div>
                  <div class="listsTitle">{{item.course_head}}</div>
                  <div class="listsTeacher flex-h flex-vh-center"><span>{{item.teacher.teacher_name}}·{{item.teacher.teacher_label}}</span><img class="liststeacherIcon" :src="item.teacher.teacher_picture" alt=""></div>
              </div>
          </div>
          <div class="listsType">{{item.type_id}}</div>
      </div>
      <div v-show="!logoFlag" class="nodateLogo flex-h flex-center">
        <img src="../assets/image/logo_empty.png" alt="">
      </div>
  </div>
</template>

<script>
  import bus from '../common/bus';
  import { getChatHistoryList } from '../api/courseApi';
  export default {
    name: 'chatRoomList', // 聊天室列表
    data () {
      return {
        listobj:{
          page: 1, // 页数默认为1默认是10条
          count: 10, // 每页页数不传默认十条
          platform: 'wxf1dae2ba24e9eaae',
        },
        arrLists: [
            // {
            //     course_desc: "20201014-live-test",
            //     course_end_time: "1602691202130",
            //     course_head: "20201014-live-test",
            //     course_picture: "http://qiniu.1yuaninfo.com/2020/10/6df7a202010141504054266.png",
            //     course_resource_url: "http://qiniu.1yuaninfo.com/recordings/z1.junhuiapp.3j8d1OVmlx/0_1602691202.m3u8",
            //     course_start_time: "1602659185574",
            //     teacher: {
            //       teacher_label: "资深股资深股票分析师",
            //       teacher_name: "牛爱多",
            //       teacher_picture: "http://qiniu.1yuaninfo.com/2020/09/de3ca202009101623275144.png",
            //     },
            //     teacher_label: "资深股票分析师",
            //     teacher_name: "牛爱多",
            //     teacher_picture: "http://qiniu.1yuaninfo.com/2020/09/de3ca202009101623275144.png",
            //     time_period: "10-14 15:06",
            //     type_id: 2,
            //     uid: "co1602659185142837410",
            // },
        ],
        logoFlag: true, // 无数据展示logo
      };
    },

    components: {},

    created() {},

    mounted() {
      this.getDataListFun();
    },

    computed: {},

    methods: {
      getDataListFun() {
        getChatHistoryList(this.listobj)
        .then((res) => {
          console.log(res);
          if(res.result.count > 0) {
            console.log('object')
            this.arrLists = res.result.data;
            this.arrLists.forEach(item => {
              item.type_id = '聊天室';
            })
          } else {
            this.logoFlag = false;
          }
        })
        .catch((rej) => {
          // this.$refs.loadmore.onTopLoaded();
          this.$catchError(rej);
        });
      },
      handleClick(uidval) {
        let access_token = localStorage.getItem('access_token');
        if(access_token){
          this.$router.push({
            name: 'chatRoomHistory',
            query: { id: uidval}
          })
        }else{ // 无access_token去登录
          bus.$emit('login', 'show-view');
          return false;
        }
      },
    },
  }
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
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
.h100 {
  height: 100%;
}

.mainlistBox {
    padding: 15px 20px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    margin-top: 10px;
}
.listsImg {
    width: 65px;
    height: 65px;
    border-radius: 6px;
    margin-right: 15px;
}
.listsTime {
    font-size: 12px;
    color: rgba(50, 50, 50, 1);
    font-weight: 500;
}
.listsTitle {
    font-size: 14px;
    color: rgba(50, 50, 50, 1);
    font-weight: 500;
}
.listsTeacher {
    position: relative;
    font-size: 12px;
}
.liststeacherIcon {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 0;
    left: 0;
    border-radius: 50%;
}
.listsTeacher span{
    margin-left: 10px;
    padding: 2.5px 10px 2.5px 20px;
    border-radius: 20px;
    background: #F6F6F6;
}
.listsType {
    width: auto;
    height: fit-content;
    font-size: 12px;
    color: #E3191A;
    border-radius: 3px;
    border: 1px solid #E3191A;
}
.nodateLogo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
.nodateLogo img {
  width: 60px;
  height: 60px;
}
</style>
