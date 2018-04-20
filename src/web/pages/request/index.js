import axios from '@js/axios';
import _ from "lodash"
axios.getA({}).then(res=>{
  // 本地开启代理 代理配置查看 /config/index proxyTable
  console.log(res);
})