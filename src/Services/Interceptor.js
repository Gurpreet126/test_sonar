import axios from "axios";
import { store } from "../Store/Store";
import { authlogin } from "../Store/Authlogin";

// const EndPoint = process.env.REACT_APP_BASEURL;
const EndPoint = "http://192.168.1.121:3001";

const Api = axios.create({ timeout: 1000000, baseURL: EndPoint });

Api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// Api.defaults.headers.post["Cache-Control"] = "no-cache";
Api.interceptors.request.use(
  (config) => {
    if (store?.getState()?.Authlogin?.data?.token) {
      const token = `Bearer ${store?.getState()?.Authlogin?.data?.token}`;
      config.headers = {
        Authorization: token,
      };
      config.params = { ...config.params, timestamp: Date.now() };
    }
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);
// Add a response interceptor
Api.interceptors.response.use(
  (response) => {
    if (response.data.status === 401) {
      store.dispatch(authlogin(null));
    } else {
      return response;
    }
  },
  (error) => {
    if (error.response.data.status === 401) {
      store.dispatch(authlogin(null));
    }
    return Promise.reject(error);
  }
);
export default Api;
