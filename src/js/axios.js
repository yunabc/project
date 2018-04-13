import axios from 'axios'

var domain = {
  prefixA:'www.aaa.com',
  prefixB:'www.bbb.com'
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


var instanceA = axios.create({
  baseURL: domain.prefixA,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
var instanceB = axios.create({
  baseURL: domain.prefixB,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

var request = {
  getA(opt){
   return instanceA.get('/api/a',opt)
  }
  getB(){
    return instanceB.get('/api/b')
  }
}
export default request;


// aaa.js
