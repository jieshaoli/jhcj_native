const mutations = {
  SET_ACCESS_TOKEN(state, msg) {
    state.access_token = msg;
  },
  SET_REFRESH_TOKEN(state, msg) {
    state.refresh_token = msg;
  },
  SET_USER(state, msg) {
    state.user.user_id = msg.info.id;
    state.user.user_name = msg.info.user_nickname;
    state.user.user_photo = msg.info.user_picture;
    state.user.user_role = 2;
    state.user.user_phone = msg.sign_mobile;
  },
  SET_TEST(state, msg) {
    state.test = msg;
  },
  CLEAR_USER(state) {
    state.user.user_id = "";
    state.user_id = "";
    state.user_name = "";
    state.user_photo = ""
    state.user_role = 2;
    state.user_phone = "";
  }
}

export default mutations;
