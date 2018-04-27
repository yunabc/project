import _ from 'lodash'
import listTpl from './list.pug'
import imgList from './imgList'
import './index.styl'

var body = document.querySelector("body");
var img = imgList.img;
var company = [
  "安邦人寿",
  "安联保险集团",
  "安心互联网保险",
  "长城人寿",
  "大都会人寿",
  "富德生命人寿",
  "复星联合健康保险",
  "国华人寿",
  "和谐健康保险",
  "弘康人寿",
  "华安保险",
  "平安保险",
  "人保",
  "瑞康",
  "泰康",
  "泰康养老",
  "泰康在线",
  "太平洋",
  "兴泰",
  "易安保险",
  "中意保险",
  "众赢人寿"
]

let data = [
  // {
  //   img:'./img/aaa.png',
  //   company:'平安保险'
  // },
];

for(let i = 0; i<img.length;i++){
  var obj={}
  obj.img=img[i];
  obj.company=company[i];
  data.push(obj)
  console.log('aaa1')
  console.log('aaa2')
}
console.log(data);
var html = listTpl({data:data})
body.innerHTML=html