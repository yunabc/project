import $ from '@zepto';
import Pop from '@js/lib/window'
import './index.styl'

import axios from '@js/axios';
import _ from "lodash"
function aaa(){
  console.log(arguments)
}

aaa({a:1,b:2})



var popWin = new Pop();


// 事件回调可以提前绑定，也可以调用时绑定回调
popWin.on('alert',()=>{
  alert('alert handler')
}).on('close',()=>{
  alert('close handler')
}).on('confirm',()=>{
  alert('confirm handler')
}).on('cancle',()=>{
  alert('cancle handler')
}).on('prompt',()=>{
  alert('prompt handler')
})

$('.alert').click(()=>{

  // popWin.alert({
  //   content:'alert! alert! alert! alert! alert! alert! alert! alert! alert! alert! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! ',
  //   title:'alert',
  //   text4AlertBtn:'确定1',
      

  // })
  popWin.alert('你好 test alert new arguments type',()=>{
    alert('我是alert回调函数2')
  })
})

$('.confirm').click(()=>{

  popWin.confirm({
    content:'confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! confirm! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! ',
    title:'alert',
    text4ConfirmBtn:'确定2',
    text4CancleBtn:'取消1',
  })
})

$('.prompt').click(()=>{

  popWin.prompt({
    content:'prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! prompt! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! ',
    title:'alert',
    text4CancleBtn:'取消2',
    text4PromptBtn:'确定3',

  })
})

