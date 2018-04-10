import './index.styl'
import { isArray } from "lodash"

// import '@css/common/common.styl';

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