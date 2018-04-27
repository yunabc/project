import _ from 'lodash'
import $ from '@zepto';
import BScroll from 'better-scroll'
import './index.styl'
// import axios from '@js/axios'
import wx from 'weixin-js-sdk'
import fastclick from 'fastclick'
import Pop from '@js/lib/window'


var container = document.querySelector('.box-wrap')
console('adsfasfadf')

container.scrollIntoView(false)
container.scrollIntoView(false)
container.scrollIntoView(false)
// var listenerBackHandler = {  
//     param: {  
//         isRun: false, //防止微信返回立即执行popstate事件  
//     },  
//     listenerBack: function () {  
//         var state = {  
//             title: "title",  
//             url: "#"  
//         };  
//         window.history.pushState(state, "title", "#");  

//         window.addEventListener("popstate", function (e) {  
//             alert('我监听到了浏览器的返回按钮事件啦')
//             if (listenerBackHandler.param.isRun) { 

//               alert('页面加载完，跳转')
//                 window.location.href = "brand.html"; //返回到主页  
//             }  
//         }, false);  
//     },  
//     //初始化返回事件  
//     initBack: function () {  
//         window.addEventListener('pageshow', function () {  
//             listenerBackHandler.param.isRun = false;  
//             setTimeout(function () { listenerBackHandler.param.isRun = true; }, 1000); //延迟1秒 防止微信返回立即执行popstate事件  
//             listenerBackHandler.listenerBack();  
//         });  
//     }  
// } 
// listenerBackHandler.initBack(); 




// console.log('Pop',Pop);
// var popWin = new Pop();

// popWin.confirm({
//   handler4CloseBtn:()=>{alert('you click the close btn')},
//   handler4AlertBtn:()=>{alert('you click the alert btn')},
//   handler4ConfirmBtn:()=>{alert('you click the confirm btn')},
//   handler4CancleBtn:()=>{alert('you click the cancle  btn')},
//   content:'welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! ',
//   title:'alert',
//   yBtnText:'确定',

// }).on('alert',()=>{
//   alert('second alert handler')
// }).on('close',()=>{
//   alert('second close handler')
// }).on('confirm',()=>{
//   alert('second confirm handler')
// }).on('cancle',()=>{
//   alert('second cancle handler')
// })



// const wrapper = document.querySelector('.wrap');
// console.log(wrapper);
// const scroll = new BScroll(wrapper)



// FastClick.attach(document.body)

// $('.btn1').click(function(){
//   alert(1)
// })

// function aaa () {
//   console.log('this is aaa');
// }

// function bbb () {
//   console.log('this is bbb');
//   setTimeout(()=>{
//     console.log('this is setTimeout bbb'); 
//   })
// }

// aaa(bbb());


// function *like() {
//   yield 5;
//   console.log('test');
// }

// let it = like();

// console.log(it.next());


// async function like2 (){
//   await 5
//   console.log('test2');
// }
// let it2 = like2();
// console.log(it2)
// it2.then(res=>{
//   console.log(res);
// })
// console.log(isArray(['aaa']));
// console.log(isArray({}));
// console.log(isArray('aaaa'));