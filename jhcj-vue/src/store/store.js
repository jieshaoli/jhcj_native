import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  // modules: {
  //   user
  // },
  // getters
  state,
  actions,
  mutations,
  getters
});

export default store;
