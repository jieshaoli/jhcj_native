import Vue from "vue";
import { Toast } from "mint-ui";
import bus from "../common/bus.js";

export default {
  install(Vue, options) {
    Vue.prototype.$catchError = function(rej) {
      console.log("catch:", rej);
      try {
        let code = rej.data.code;
        if (
          code === 10000 ||
          code === 10001 ||
          code === 10004 ||
          code === 10005 ||
          code === 10006
        ) {
          bus.$emit("login", "show-view");
        }
        if (rej.data.message) {
          Toast({
            message: rej.data.message,
            position: "middle",
            duration: 1500
          });
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    Vue.prototype.$haveLogin = function() {
      let access_token = localStorage.getItem("access_token");
      if (
        access_token != null &&
        access_token != undefined &&
        access_token.length > 1
      ) {
        return true;
      } else {
        return false;
      }
    };
  }
};
