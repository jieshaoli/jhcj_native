<template>
  <div id="login-view"
       @click="hide_view">
    <div class="form-view"
         @click.stop>
      <h1>请先登录，再使用该功能</h1>
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
      <!-- 登录按钮 -->
      <div class="login-bg">
        <button class="login-btn"
                @click="handleLogin"
                :disabled="isClick">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../common/bus'
import inputGroup from '../components/inputGroup'
import { login, loginMsgCode } from '../api/directApi'
import { getUserBaseInfo } from '../api/tokenApi'
import { Toast } from 'mint-ui'

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
    }
  },
  created() {
    bus.$on('login', (msg) => {
      console.log(msg, 'loginPage.vue')
      if (msg == 'success-todo') {
        this.saveUserInfo();
      }
    })
    this.saveUserInfo();
  },
  methods: {
    hide_view() {
      bus.$emit('login', 'hide-view')
    },
    getVerifyCode(event) {
      //获取验证码
      if (this.validatePhone()) {
        this.validateBtn()
        loginMsgCode({ mobile_tel: this.phone })
          .then((res) => {
            Toast({
              message: '验证码发送成功',
              position: 'bottom',
              duration: 2000,
            })
          })
          .catch((rej) => {
            console.log(rej)
          })
      }
    },
    validatePhone() {
      //判断输入的手机号是否合法
      if (!this.phone) {
        this.errors = {
          phone: '手机号码不能为空',
        }
        return false
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: '请输入正确是手机号',
        }
        return false
      } else {
        this.errors = {}
        return true
      }
    },
    validateBtn() {
      //倒计时
      let time = 60
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer)
          this.disabled = false
          this.btnTitle = '获取验证码'
        } else {
          this.btnTitle = time + '秒后重试'
          this.disabled = true
          time--
        }
      }, 1000)
    },
    handleLogin() {
      this.errors = {}
      login({ userName: this.phone, code: this.verifyCode })
        .then((res) => {
          localStorage.setItem('access_token', res.result.access_token)
          localStorage.setItem('refresh_token', res.result.refresh_token)
          Toast({
            message: '登录成功',
            position: 'center',
            duration: 2000,
          })
          bus.$emit('login', 'success-todo')
        })
        .catch((rej) => {})
    },
    saveUserInfo() {
      getUserBaseInfo()
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.result.info))
        })
        .catch((rej) => {})
    },
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
<style lang="css" scoped>
#login-view {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
}
#login-view .form-view {
  margin: 60% auto;
  width: 80%;
  height: 50%;
  background: white;
  border-radius: 6px;
  padding: 10px 16px;
  position: relative;
}
.form-view h1 {
  font-size: 20px;
  margin-bottom: 30px;
}
.form-view .input-label {
  margin-top: 30px;
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
  font-size: 16px;
  color: white;
}
</style>
