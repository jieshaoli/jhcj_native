<template>
  <div id="app">
    <div id="main-page">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <login-page v-show="show_login"></login-page>
  </div>
</template>

<script>
import bus from './common/bus'
import loginPage from './page/loginPage'

export default {
  name: 'App',
  data() {
    return {
      show_login: false,
    }
  },
  components: {
    loginPage,
  },
  methods: {
    hide_view() {
      this.show_login = flase
      let view = document.getElementById('hide_view')
    },
  },
  created() {
    bus.$on('login', (msg) => {
      console.log(msg, 'show-login')
      if (msg == 'show-view') {
        this.show_login = true;
      }else if (msg == 'hide-view' || msg == 'success-todo') {
        this.show_login = false;
      }
    })
  },
}
</script>

<style scoped>
html,
body {
  overflow-x: hidden;
}
#main-page {
  /* z-index: 1; */
  position: relative;
}
</style>
