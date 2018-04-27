import _ from 'lodash'
import axios from '@js/axios';
axios.getA({}).then(res=>{
  // 本地开启代理 代理配置查看 /config/index proxyTable
  console.log(res);
})