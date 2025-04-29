import axios from "axios";
// 创建实例
const service = axios.create({
  baseURL: "/api", // 基础路径，开发时是 mock，生产时根据需要改
  timeout: 5000, // 超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等公共参数
    // config.headers['Authorization'] = 'Bearer token'
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
