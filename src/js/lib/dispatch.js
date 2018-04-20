import $ from 'zepto'
class Dispatch{
  constructor(){
    this.boundingBox = null
    this.handlers={}
    
  }

  on(type,handler){
    console.log(this.handlers);
    if(!this.handlers[type]){
      this.handlers[type] = [];
    }

    handler ? this.handlers[type].push(handler) : null
    return this;
  }

  fire(type,data){

    if(this.handlers[type] instanceof Array){
      var handlers = this.handlers[type]
      console.log(handlers);
      if(handlers.length >0){
        for(var i = 0; i < handlers.length; i++ ){
          handlers[i](data);
        }
      }
    }
  }

  renderUI(){}

  bindUI(){}

  syncUI(){}

  render(container){
    this.renderUI()
    this.bindUI()
    this.syncUI()
    $(container || document.body).append(this.boundingBox)
  }

  destructor(){

  }

  destory(){
    this.destructor()
    this.boundingBox.off()
    this.boundingBox.remove()
  }
}
export default Dispatch
