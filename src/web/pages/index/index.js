import './index.styl'
import { isArray } from "lodash"
import $ from 'zepto';
import FastClick from 'fastclick';
FastClick.attach(document.body);
// import '@css/common/common.styl';

$('.btn1').click(function(){
  alert(1)
})

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