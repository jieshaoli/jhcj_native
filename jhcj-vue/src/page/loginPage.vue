<template>
  <div id="login-view"
       @click.stop="hide_view">
    <div class="form-view"
         @click.stop>
      <h2>请先登录，再使用该功能</h2>
      <div class="login-title"
           v-if="platform == 'wxf1dae2ba24e9eaae'">
        <span @click="selecet('msgCode')"
              :class="selected == 'msgCode' ? 'selected' : 'noselect'">验证码登录</span>
      </div>
      <div class="login-title"
           v-else>
        <span @click="selecet('msgCode')"
              :class="selected == 'msgCode' ? 'selected' : 'noselect'">验证码登录</span> |
        <span @click="selecet('secretCode')"
              :class="selected == 'secretCode' ? 'selected' : 'noselect'">密码登录</span>
      </div>
      <div v-if="selected == 'msgCode'"
           class="input-bg">
        <!-- 手机号 -->
        <input-group class="input-label"
                     type="number"
                     placeholder="手机号"
                     v-model="phone"
                     :btnTitle="btnTitle"
                     :disabled="disabled"
                     :error="errors.phone"
                     @btn-click="getVerifyCode" />
        <!-- 输入验证码 -->
        <input-group class="input-label"
                     type="number"
                     v-model="verifyCode"
                     placeholder="验证码"
                     :error="errors.code" />
      </div>
      <div v-else
           class="input-bg">
        <!-- 手机号 -->
        <input-group class="input-label"
                     type="number"
                     placeholder="手机号"
                     v-model="phone"
                     :error="errors.phone" />
        <!-- 输入验证码 -->
        <input-group class="input-label"
                     type="password"
                     v-model="verifyCode"
                     placeholder="密码"
                     :error="errors.code" />
      </div>
      <!-- 登录按钮 -->
      <div class="login-bg">
        <button class="login-btn"
                @click="networkForLogin"
                :disabled="isClick">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../common/bus';
import inputGroup from '../components/inputGroup';
import { Toast } from 'mint-ui';
import { loginMsgCode } from '../api/userApi';
import { mapState } from 'vuex';
import { Base64 } from 'js-base64';
import axios from 'axios';

export default {
  name: 'loginPage',
  components: {
    inputGroup,
  },
  data() {
    return {
      phone: '', //手机号
      verifyCode: '', //验证码
      btnTitle: '获取验证码',
      disabled: false, //是否可点击
      errors: {}, //验证提示信息
      todo: '',
      selected: 'msgCode',
      platform: 'app',
      openId: '',
    };
  },
  created() {
    let hrefStr = window.location.href;
    this.checkHref(hrefStr);
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) {
        return true;
      } else {
        return false;
      }
    },
    // ...mapState({
    //   ttest: 'test',
    // }),
  },
  mounted() {
    let view = document.getElementsByClassName('form-view')[0];
    if (view.style.height < 300) {
      view.style.height = 300 + 'px';
    }
  },
  methods: {
    checkHref(hrefStr) {
      console.log('hrefStr:', hrefStr);
      if (hrefStr.indexOf('platform') > -1) {
        this.platform = hrefStr.split('platform=')[1].split('&')[0];
        if (this.platform == 'wxf1dae2ba24e9eaae') {
          if (hrefStr.indexOf('code') > -1) {
            let severNeedCode = hrefStr.split('code=')[1].split('&')[0] + '';
            if (severNeedCode && severNeedCode.length > 0) {
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              };
              let params = new FormData();
              params.append('code', severNeedCode);
              console.log('code: ', severNeedCode);
              if (this.$haveLogin()) {
                console.log('公众号： 已登录了接着去拿openid');
                params.append('status', 1);
                axios
                  .post(
                    'http://z.1yuaninfo.com/index/chat/getUsersInfo',
                    params,
                    config
                  )
                  .then((res) => {
                    console.log('code 上传成功', res);
                    if (res.data.error_code) {
                      Toast({
                        title: res.data.msg,
                        position: 'center',
                        duration: 2000,
                      });
                    }
                    if (res.data) {
                      if (res.data.code == 200) {
                        if (res.data.result.length > 0) {
                          this.openId = Base64.decode(res.data.result);
                        }
                      }
                    }
                  })
                  .catch((rej) => {
                    console.log('code 上传失败', rej);
                    this.$catchError(rej);
                  });
              } else {
                console.log('未登录，转公众号内部打开，用code去登录');
                axios
                  .post(
                    'http://z.1yuaninfo.com/index/chat/getUsersInfo',
                    params,
                    config
                  )
                  .then((res) => {
                    console.log('code 上传成功', res);
                    if (res.data.error_code) {
                      Toast({
                        title: res.data.msg,
                        position: 'center',
                        duration: 2000,
                      });
                      if (res.data.error_code == -2) {
                        this.openId = res.data.openid;
                        bus.$emit('login', 'show-view');
                      }
                    }
                    if (res.data) {
                      if (res.data.code == 0) {
                        localStorage.setItem(
                          'access_token',
                          res.data.result.access_token
                        );
                        localStorage.setItem(
                          'refresh_token',
                          res.data.result.refresh_token
                        );
                        bus.$emit('login', 'success-todo');
                      }
                    }
                  })
                  .catch((rej) => {
                    console.log('code 上传失败', rej);
                    this.$catchError(rej);
                  });
              }
            } else {
              console.log('此时为公众号分享出去的，需要再次跳转');
              window.location.href =
                'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf1dae2ba24e9eaae&redirect_uri=http%3A%2F%2Fz.1yuaninfo.com%2Findex%2Fchat%2Froom.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
            }
          } else {
            console.log('此时为公众号分享出去的，需要再次跳转');
            window.location.href =
              'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf1dae2ba24e9eaae&redirect_uri=http%3A%2F%2Fz.1yuaninfo.com%2Findex%2Fchat%2Froom.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
          }
        }
      } else {
        console.log('没有platform, app');
      }
    },
    selecet(msg) {
      this.phone = '';
      this.verifyCode = '';
      if (msg === 'msgCode') {
        this.selected = 'msgCode';
      } else {
        this.selected = 'secretCode';
      }
    },
    hide_view() {
      bus.$emit('login', 'hide-view');
    },
    getVerifyCode(event) {
      //获取验证码
      if (this.validatePhone()) {
        this.disabled = true;
        this.validateBtn();
        if (this.platform == 'wxf1dae2ba24e9eaae') {
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
          let params = new FormData();
          params.append('user_tel', this.phone);
          axios
            .post('http://z.1yuaninfo.com/index/chat/send', params, config)
            .then((res) => {
              console.log('chat/send:res', res);
              if (res.data.error_code) {
                Toast({
                  title: res.data.msg,
                  position: 'center',
                  duration: 2000,
                });
              }
              if (res.data) {
                if (res.data.code == 0) {
                  Toast({
                    message: '验证码发送成功',
                    position: 'bottom',
                    duration: 2000,
                  });
                }
              }
            })
            .catch((rej) => {
              console.log('chat/send:rej', rej);
              this.$catchError(rej);
            });
        } else {
          loginMsgCode({ mobile_tel: this.phone })
            .then((res) => {
              Toast({
                message: '验证码发送成功',
                position: 'bottom',
                duration: 2000,
              });
            })
            .catch((rej) => {
              this.$catchError(rej);
            });
        }
      }
    },
    validatePhone() {
      //判断输入的手机号是否合法
      if (!this.phone) {
        this.errors = {
          phone: '手机号码不能为空',
        };
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: '请输入正确是手机号',
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
    validateBtn() {
      //倒计时
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.btnTitle = '获取验证码';
        } else {
          this.btnTitle = time + '秒后重试';
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    networkForLogin() {
      if (this.selected === 'msgCode') {
        if (this.platform == 'wxf1dae2ba24e9eaae') {
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
          let params = new FormData();
          params.append('user_tel', this.phone);
          params.append('codes', this.verifyCode);
          params.append('openid', this.openId);
          console.log('params', this.phone, this.verifyCode, this.openId);
          axios
            .post(
              'http://z.1yuaninfo.com/index/chat/registerAdd',
              params,
              config
            )
            .then((res) => {
              console.log('registerAdd', res);
              if (res.data.error_code) {
                Toast({
                  message: res.data.msg,
                  position: 'center',
                  duration: 2000,
                });
              }
              if (res.data) {
                if (res.data.code == 0) {
                  localStorage.setItem(
                    'access_token',
                    res.data.result.access_token
                  );
                  localStorage.setItem(
                    'refresh_token',
                    res.data.result.refresh_token
                  );

                  Toast({
                    message: '登录成功',
                    position: 'center',
                    duration: 2000,
                  });
                  this.phone = '';
                  this.verifyCode = '';
                  bus.$emit('login', 'success-todo');
                }
              }
            })
            .catch((rej) => {
              console.log('registerFail', rej);
            });
        } else {
          this.$store
            .dispatch('LoginCode', {
              userName: this.phone,
              code: this.verifyCode,
            })
            .then((resolve) => {
              Toast({
                message: '登录成功',
                position: 'center',
                duration: 2000,
              });
              bus.$emit('login', 'success-todo');
              this.phone = '';
              this.verifyCode = '';
            })
            .catch((reject) => {
              if (reject.data.message) {
                Toast(reject.data.message);
              }
            });
        }
      } else {
        this.$store
          .dispatch('LoginPassword', {
            userName: this.phone,
            userPassword: this.verifyCode,
          })
          .then((resolve) => {
            Toast({
              message: '登录成功',
              position: 'center',
              duration: 2000,
            });
            this.phone = '';
            this.verifyCode = '';
            bus.$emit('login', 'success-todo');
          })
          .catch((reject) => {
            if (reject.data.message) {
              Toast(reject.data.message);
            }
          });
      }
    },
  },
};
</script>
<style lang="css" scoped>
#login-view {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
}
#login-view .form-view {
  margin: 35% auto;
  width: 80%;
  height: 50%;
  background: white;
  border-radius: 6px;
  padding: 10px 16px;
  position: relative;
}
#login-view .login-title {
  padding: 0;
  margin-top: 5px;
}
.login-title .selected {
  font-size: 16px;
  color: red;
}
.login-title .noselect {
  font-size: 14px;
  color: black;
}
.form-view h1 {
  font-size: 20px;
  margin-bottom: 30px;
}
.form-view .input-bg {
  padding: 0 1px;
}
.form-view .input-label {
  margin-top: 30px;
  /* background: tomato; */
}
.form-view .login-bg {
  height: 50px;
  width: 90%;
  position: absolute;
  bottom: 20px;
}
.form-view .login-btn {
  width: 100%;
  height: 100%;
  background: #e3191a;
  border-radius: 6px;
  border-width: 0px;
  font-size: 16px;
  color: white;
}
</style>
