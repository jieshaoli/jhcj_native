import { codeLogin, passwordLogin } from "../api/userApi";

const user = {
  state: () => ({
    user: {
      user_id: "",
      user_name: "",
      user_photo: "",
      user_role: "",
      user_phone: ""
    },
    access_token: "",
    refresh_token: "",
    test:{}
  }),
  mutations: {
    SET_ID(state, msg) {
      state.user_id = msg;
    },
    SET_NAME(state, msg) {
      state.user_name = msg;
    },
    SET_PHOTO(state, msg) {
      state.user_photo = msg;
    },
    SET_ROLE(state, msg) {
      state.user_role = msg;
    },
    SET_ACCESS_TOKEN(state, msg) {
      state.access_token = msg;
    },
    SET_REFRESH_TOKEN(state, msg) {
      state.refresh_token = msg;
    },
    SET_TEST(state, msg) {
      state.test = msg;
    }
  },
  actions: {
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
  }
};

export default user;
