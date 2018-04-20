import axios from 'axios'
import qs from 'qs'


var domain = {
  prefixA:'http://192.168.31.250:8080',
  // prefixB:'www.bbb.com'
}


var instanceA = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? domain.prefixA : '',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});


// 添加请求拦截器
instanceA.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instanceA.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


var request = {
  getA(opt){
   return instanceA.post('/api/v1/insure/compandprdtypes',opt)
  },
  getB(opt){
   return instanceA.get('/api/v1/insure/compandprdtypes',opt)
  }
}


export default request;


// aaa.js
