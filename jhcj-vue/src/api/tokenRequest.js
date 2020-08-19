import axios from "axios";
import _setting from "../common/setting";

var accessToken = "";
accessToken = localStorage.getItem("access_token");
const ax = axios.create({
  baseURL: _setting.API_PATH,
  timeout: 6000
  // withCredentials: true
});

ax.interceptors.request.use(
  config => {
    if (accessToken == "") {
      accessToken = localStorage.getItem("access_token");
    }
    // if (ax.ifToken) {

    // }
    console.log(ax.ifToken,'========');
    console.log(accessToken,'accessToken');
    if (accessToken != "" && accessToken.length > 4) {
      config.headers = {
        // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorizations: "Bearerapp " + accessToken
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
    console.log(response, "response:" + response.request.responseURL);
    if (response.status === 200 || response.status === 201) {
      // if (
      //   response.request.responseURL.indexOf("/app/v1/login/userLoginCode") > -1
      // ) {
      //   localStorage.setItem("access_token", response.data.result.access_token);
      //   localStorage.setItem(
      //     "refresh_token",
      //     response.data.result.refresh_token
      //   );
      //   accessToken = response.data.result.access_token;
      // }
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default ax;
