import { login, getUserBaseInfo } from "../api/userApi";
const actions = {
  addTest({ commit }, msg) {
    commit("SET_TEST", msg);
  },
  Login({ commit }, info) {
    return new Promise((resolve, reject) => {
      login(info)
        .then(res => {
          const tokenStr = res.result.access_token;
          const refreshStr = res.result.refresh_token;
          commit("SET_ACCESS_TOKEN", tokenStr);
          commit("SET_REFRESH_TOKEN", refreshStr);
          resolve(res);
        })
        .catch(rej => {
          reject(rej);
        });
    });
  },
  AddUser({ commit }) {
    return new Promise((resolve, reject) => {
      getUserBaseInfo()
        .then(res => {
          commit("SET_USER", res.result.info);
          resolve(res);
        })
        .catch(rej => {
          reject(rej);
        });
    });
  }
};

export default actions;
