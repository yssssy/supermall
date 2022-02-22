import axios from 'axios'

export function request(config){
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout:5000
  })

  //2.拦截器的使用
  //axios.interceptors全局拦截
  instance.interceptors.request.use(config => {     //请求拦截
     // console.log(config)
    // 1.比如config中一些信息不符合服务器的要求

    // 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标

    // 3.某些网络请求(比如登录(token)),必须携带一些特殊的信息
    return config         //把config返回去
  },err => {

  })

  instance.interceptors.response.use(res => {     //响应拦截
    return res.data       //把res.data返回去
  },err => {

  })

  //3.发送真正得网络请求
  return instance(config)
}