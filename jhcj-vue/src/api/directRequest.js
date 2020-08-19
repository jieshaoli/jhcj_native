import axios from "axios";
import _setting from '../common/setting'


const ax = axios.create({
  baseURL: _setting.API_PATH,
  timeout: 6000
  // withCredentials: true
});

ax.interceptors.request.use(config => {
  config.headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  };
  return config;
},error => {
  return Promise.reject(error);
});

ax.interceptors.response.use(response => {
  if (response.status === 200 || response.status === 201) {
    console.log('success:',response);
    return response.data;
  }else{
    console.log('else:',response);
    return Promise.reject(response);
  }
},error => {
  console.log('error:',error);
  return Promise.reject(error)
});

export default ax;
