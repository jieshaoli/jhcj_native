import Vue from 'vue';

//使用Event Bus
const bus = new Vue();
/*
bus.$emit('login',(msg))
msg:
show-view
hide-view
success-todo
*/
/*
bus.$emit('addUser') //响应式自动更新了
*/
export default bus;
