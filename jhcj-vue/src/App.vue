<template>
  <div id="app">
    <div id="main-page">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <login-page v-show="show_login"></login-page>
  </div>
</template>

<script>
import bus from './common/bus';
import loginPage from './page/loginPage';

export default {
  name: 'App',
  data() {
    return {
      show_login: false,
    };
  },
  components: {
    loginPage,
  },
  methods: {
    // hide_view() {
    //   this.show_login = flase
    //   let view = document.getElementById('hide_view')
    // },
    networkForSaveUser() {
      let params = {};
      if (window.location.href.indexOf('platform') > -1) {
        let platform = window.location.href.split('platform=')[1].split('&')[0];
        params = { platform: platform };
      }
      this.$store
        .dispatch('AddUser', params)
        .then((resolve) => {
          console.log('SET_USER', resolve);
        })
        .catch((reject) => {
          this.$catchError(reject);
        });
    },
  },
  created() {
    bus.$on('login', (msg) => {
      console.log(msg, 'show-login');
      if (msg == 'show-view') {
        this.show_login = true;
      } else if (msg == 'hide-view') {
        this.show_login = false;
      } else if (msg == 'success-todo') {
        this.show_login = false;
        this.networkForSaveUser();
      }
    });
  },
};
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
