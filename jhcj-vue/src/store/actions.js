import { codeLogin, passwordLogin, getUserBaseInfo } from "../api/userApi";
const actions = {
  addTest({ commit }, msg) {
    commit("SET_TEST", msg);
  },
  LoginCode({ commit }, info) {
    return new Promise((resolve, reject) => {
      codeLogin(info)
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
  LoginPassword({ commit }, info) {
    return new Promise((resolve, reject) => {
      passwordLogin(info).then(res => {
        const tokenStr = res.result.access_token;
        const refreshStr = res.result.refresh_token;
        commit("SET_ACCESS_TOKEN", tokenStr);
        commit("SET_REFRESH_TOKEN", refreshStr);
        resolve(res);
      }).catch(rej =>{
        reject(rej);
      })
    })
  },
  AddUser({ commit }) {
    return new Promise((resolve, reject) => {
      getUserBaseInfo()
        .then(res => {
          commit("SET_USER", res.result);
          resolve(res);
        })
        .catch(rej => {
          reject(rej);
        });
    });
  },
  ClearUser({ commit }) {
    return new Promise((resolve, reject) => {
      commit("CLEAR_USER");
    })
  }
};

export default actions;
