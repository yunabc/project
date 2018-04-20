import './index.styl'
import axios from '@js/axios'
// import wx from 'weixin-js-sdk'
import $ from 'zepto';
import fastclick from 'fastclick'
import BScroll from 'better-scroll'
import Pop from '@js/lib/window'

let str = `<p>这是一个测试</p >
<p>测试<strong>加粗</strong>测试<strong>加粗</strong>测试<a href=" " target="_blank">连接</a ></p >
<p>测试 空格</p >
<p>测试<a href="http://www.baidu.com" target="_blank">连接</a >测试<a href="http://www.baidu.com/" target="_blank">连接</a ></p >`;

function htmlToJson(str) {
    let regexp = {
        checkHtml: /<[^>]+>/g,
        tagP: /\<p[^>]*>((?:(?!<\/p>)[\s\S])*)\<\/p\>/g,
        tagA: /\<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)\<\/a\>/g,
        tagStrong: /\<strong[^>]*>((?:(?!<\/strong>)[\s\S])*)\<\/strong\>/g
    };
    let resultP, resultA, resultStrong;
    let ops = [];
    while ((resultP = regexp.tagP.exec(str)) != null) {
        //处理p标签
        if (!regexp.checkHtml.test(resultP[1])) {
            ops.push({
                "insert": resultP[1]
            });
        }
        //处理a标签
        if (resultP[1].indexOf('</a >') !== -1) {
            console.log(resultP)
            while ((resultA = regexp.tagA.exec(resultP[1])) != null) {
                console.log(resultA)
                ops.push({
                    "attributes": {
                        "link": resultA[1]
                    },
                    "insert": resultA[2]
                });
            }
        }
        //处理strong标签
        if (resultP[1].indexOf('</strong>') !== -1) {
            while ((resultStrong = regexp.tagStrong.exec(resultP[1])) != null) {
                ops.push({
                    "attributes": {
                        "bold": true
                    },
                    "insert": resultStrong[1]
                })

            }

        }
        ops.push({
            "insert": "\n"
        });
    }
    console.log(ops)
}
htmlToJson(str)

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




console.log('Pop',Pop);
var popWin = new Pop();

popWin.confirm({
  handler4CloseBtn:()=>{alert('you click the close btn')},
  handler4AlertBtn:()=>{alert('you click the alert btn')},
  handler4ConfirmBtn:()=>{alert('you click the confirm btn')},
  handler4CancleBtn:()=>{alert('you click the cancle  btn')},
  content:'welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! welcome! ',
  title:'alert',
  yBtnText:'确定',

}).on('alert',()=>{
  alert('second alert handler')
}).on('close',()=>{
  alert('second close handler')
}).on('confirm',()=>{
  alert('second confirm handler')
}).on('cancle',()=>{
  alert('second cancle handler')
})



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