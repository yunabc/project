import './window.styl'
import { isObject } from 'lodash'
import Dispatch from '../dispatch'
import $ from '@zepto'

import windowTpl from './template/window.pug'
console.log(windowTpl);
class Window extends Dispatch {
  constructor(){
    super()
    this.cfg = {

      // 弹窗title content
      title:'系统消息',
      content:'',

      // 对应回调函数
      handler4AlertBtn:null,
      handler4CloseBtn:null,
      handler4ConfirmBtn:null,
      handler4CancleBtn:null,
      handler4PromptBtn:null,

      // 按钮文案
      text4AlertBtn:'确定',
      text4ConfirmBtn:'确定',
      text4CancleBtn:'取消',
      text4PromptBtn:'确定',

      // 遮罩层
      hasMask:true,
    }
  }
  
  alert(){
    let cfg; 
    if(isObject(arguments[0])){
      cfg = arguments[0]
    }else{
      cfg = {content:arguments[0],handler4AlertBtn:arguments[1]}
    }
    $.extend(this.cfg,cfg,{winType:'alert'})

    this.render()

    return this
  }

  confirm(){
    let cfg; 
    if(isObject(arguments[0])){
      cfg = arguments[0]
    }else{
      cfg = {content:arguments[0],handler4ConfirmBtn:arguments[1]}
    }
    $.extend(this.cfg,cfg,{winType:'confirm'})
    this.render()

    return this
  }

  prompt(){
    let cfg; 
    if(isObject(arguments[0])){
      cfg = arguments[0]
    }else{
      cfg = {content:arguments[0],handler4PromptBtn:arguments[1]}
    }
    $.extend(this.cfg,cfg,{winType:'prompt'})
    this.render()
    this._promptInput.focus();
    return this
  }

  renderUI(){
    let html = windowTpl(this.cfg)

    this.boundingBox = $(html)
    console.log(this.boundingBox)
    this._mask = $(this.boundingBox.get(0));
    this._window = $(this.boundingBox.get(1));
    this._promptInput = this.boundingBox.find('.window_promptInput')
    setTimeout(()=>{
      this._mask.addClass('show')
      this._window.addClass('show')
    },100)
    console.log(this._mask)

  }

  bindUI(){
    this.on('alert',this.cfg.handler4AlertBtn)
    this.on('colse',this.cfg.handler4CloseBtn)
    this.on('confirm',this.cfg.handler4ConfirmBtn)
    this.on('prompt',this.cfg.handler4PromptBtn)
    this.on('cancle',this.cfg.handler4CancleBtn)

    this.boundingBox.delegate('.yesBtn','click',(e)=>{
      this.fire("alert")
      this.destory()  
    }).delegate('.window_closeBtn','click',()=>{
      this.fire('close')
      this.destory()
    }).delegate('.confirmBtn','click',()=>{
      this.fire('confirm')
      this.destory()
    }).delegate('.cancleBtn','click',()=>{
      this.fire('cancle')
      this.destory()
    }).delegate('.promptBtn','click',()=>{
      alert(111);
      this.fire('prompt')
      this.destory()
    })

  }

  destructor(){
    this._mask && this._mask.removeClass('show')
    this._window.removeClass('show')
  }

  destory(){
    this.destructor()
    setTimeout(res=>{
      this.boundingBox.off()
      this.boundingBox.remove()
    },1000)
  }
}

export default Window