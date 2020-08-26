import axios from "axios";
import _setting from "../common/setting";

let access_token = "";
const ax = axios.create({
  baseURL: _setting.API_PATH,
  timeout: 5000
});

ax.interceptors.request.use(
  config => {
    let need = config.needToken;
    if (need) {
      if (access_token === "") {
        access_token = localStorage.getItem("access_token");
      }
      if (access_token !== "") {
        config.headers = {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Authorizations: "Bearerapp " + access_token
        };
      }
    } else {
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
ax.interceptors.response.use(
  response => {
    console.log(response.request.responseURL);
    let status = response.status;
    let code = response.data.code;
    if ((status === 200 || status === 201) && code === 0) {
      if (
        response.request.responseURL.indexOf("/app/v1/login/userLoginCode") > -1
      ) {
        localStorage.setItem("access_token", response.data.result.access_token);
        localStorage.setItem(
          "refresh_token",
          response.data.result.refresh_token
        );
        access_token = response.data.result.access_token;
      }
      console.log("success:", response);
      return response.data;
    } else {
      console.log("else:", response);
      if (code === 10000 || code === 10001 || code === 10004 || code === 10005 || code === 10006) {
        localStorage.removeItem("access_token");
        access_token = '';
      }
      return Promise.reject(response);
    }
  },
  error => {
    console.log("error:", error);
    return Promise.reject(error);
  }
);

export default ax;
