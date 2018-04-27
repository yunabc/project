import _ from 'lodash'
import "./index.styl"
import $ from '@zepto'
import {isAndroid,isIos} from '@utils'
import BScroll from 'better-scroll'
// fixed ios兼容有问题 用position absolute 代替。
const wrapper = document.querySelector('.contentWrap')
const scroll = new BScroll(wrapper)
console.log(isIos)
if(isIos){
  var interval = setInterval(function() {
      document.body.scrollTop = document.body.scrollHeight
  }, 100)
}

