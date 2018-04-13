import './index.styl'
import { isArray } from "lodash"
import _ from "lodash"
import axios from '@js/axios'
import $ from 'zepto';
import FastClick from 'fastclick'
FastClick.attach(document.body)
// import '@css/common/common.styl';

$('.btn1').click(function(){
  alert(1)
})

function aaa () {
  console.log('this is aaa');
}

function bbb () {
  console.log('this is bbb');
  setTimeout(()=>{
    console.log('this is setTimeout bbb'); 
  })
}

aaa(bbb());


function *like() {
  yield 5;
  console.log('test');
}

let it = like();

console.log(it.next());


async function like2 (){
  await 5
  console.log('test2');
}
let it2 = like2();
console.log(it2)
it2.then(res=>{
  console.log(res);
})
console.log(isArray(['aaa']));
console.log(isArray({}));
console.log(isArray('aaaa'));