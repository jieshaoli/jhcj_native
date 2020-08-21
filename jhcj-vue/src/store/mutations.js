const mutations = {
  SET_ACCESS_TOKEN(state, msg) {
    state.access_token = msg;
  },
  SET_REFRESH_TOKEN(state, msg) {
    state.refresh_token = msg;
  },
  SET_USER(state, msg) {
    state.user.user_id = msg.id;
    state.user.user_name = msg.user_nickname;
    state.user.user_photo = msg.user_picture;
    state.user.user_role = 2;
  },
  SET_TEST(state, msg) {
    state.test = msg;
  }
}

export default mutations;
