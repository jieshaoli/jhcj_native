const state = {
  user: {
    //sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) :
    user_id: "",
    user_name: "",
    user_photo: "",
    user_role: 2,
    user_phone: ""
  },
  access_token: "",
  refresh_token: "",
  test: {}
};

export default state;
