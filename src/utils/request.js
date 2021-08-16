import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '',
  timeout: 5000,
})

//请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
