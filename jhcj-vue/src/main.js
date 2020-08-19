// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import  VConsole  from  'vconsole'
import 'mint-ui/lib/style.css'
import './assets/css/litewebchat.css'

let vConsole = new VConsole();

Vue.use(Mint);
Vue.config.productionTip = false
// Vue.config.prototype.$http = axios
/* eslint-disable no-new */
Vue.filter('showTime', function (value) {
  let datetime = Number(value);
  if (datetime == undefined || datetime == '' || datetime == null) {
    return 'wrong time';
  }else{
    var nDate = new Date(datetime);
    let yyyy = nDate.getFullYear();
    let MM = nDate.getMonth()+1 > 10 ? nDate.getMonth()+1 : '0'+(nDate.getMonth()+1);
    let DD = nDate.getDate() > 10 ? nDate.getDate() : '0' + nDate.getDate();
    let h = nDate.getHours() > 10 ? nDate.getHours() : '0'+nDate.getHours();
    let m = nDate.getMinutes() > 10 ? nDate.getMinutes() : '0' + nDate.getMinutes();
    let s = nDate.getSeconds() > 10 ? nDate.getSeconds() : '0' + nDate.getSeconds();
    return h + ':' + m;
  }
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
