import _ from 'lodash'
import './css/common.css'
import './css/button.css'
import './css/demo.css'
import './css/form.css'
import './css/reset.css'
import './css/validate.css'
import $ from '@js/lib/validate/zepto-validate'



$(function(){
    $.mvalidateExtend({
        phone:{
            required : true,   
            pattern : /^0?1[3|4|5|8][0-9]\d{8}$/,
            each:function(){
               
            },
            descriptions:{
                required : '<div class="field-invalidmsg">请输入手机号码</div>',
                pattern : '<div class="field-invalidmsg">您输入的手机号码格式不正确</div>',
                valid : '<div class="field-validmsg">正确</div>'
            }
        }
    });
    $("#form1").mvalidate({
        type:1,
        onKeyup:true,
        sendForm:true,
        firstInvalidFocus:false,
        valid:function(event,options){
            //点击提交按钮时,表单通过验证触发函数
            alert("验证通过！接下来可以做你想做的事情啦！");
             event.preventDefault();
        },
        invalid:function(event, status, options){
            //点击提交按钮时,表单未通过验证触发函数
        },
        eachField:function(event,status,options){
            //点击提交按钮时,表单每个输入域触发这个函数 this 执向当前表单输入域，是jquery对象
        },
        eachValidField:function(val){},
        eachInvalidField:function(event, status, options){},
        conditional:{
            confirmpwd:function(){
                return $("#pwd").val()==$("#confirmpwd").val();
            }
        },
        descriptions:{
            username:{
                required : '请输入用户名'
            },
            age : {
                required : '请输入年龄',
                pattern : '你输入的年龄格式不正确'
            },
            password:{
                 required : '请输入密码'
            },
            confirmpassword:{
                required : '请再次输入密码',
                conditional : '两次密码不一样'
            },
            address:{
                required : '请选择地址'
            },
            intro:{
                required : '请输入个人介绍'
            },
            favourite:{
                required : '请选择个人爱好'
            },
            sex:{
                required : '请选择性别'
            }
        }
    });
    console.log($("#form2").mvalidate({
        type:2,
        onKeyup:true,
        sendForm:true,
        firstInvalidFocus:true,
        valid:function(event,options){
            //点击提交按钮时,表单通过验证触发函数
            alert("验证通过！接下来可以做你想做的事情啦！");
            event.preventDefault();
        },
        invalid:function(event, status, options){
            //点击提交按钮时,表单未通过验证触发函数
        },
        eachField:function(event,status,options){
            //点击提交按钮时,表单每个输入域触发这个函数 this 执向当前表单输入域，是jquery对象
        },
        eachValidField:function(val){},
        eachInvalidField:function(event, status, options){},
        conditional:{
            pwd2:function(val,options){
                $("#confirmpwd2").trigger("keyup."+options.namespace);
                return true;
            },
            confirmpwd2:function(val){
                var flag;
                return (val==$("#pwd2").val()) ? true :false; 
            },
        },
        descriptions:{
            username:{
                required : '<div class="field-invalidmsg">请输入用户名</div>',
                valid : '<div class="field-validmsg">验证通过</div>'
            },
            age : {
                required : '<div class="field-invalidmsg">请输入年龄</div>',
                pattern : '<div class="field-invalidmsg">你输入的格式不正确</div>',
                valid : '<div class="field-validmsg">验证通过</div>'
            },
            password:{
                 required : '<div class="field-invalidmsg">请输入密码</div>',
                 conditional : '<div class="field-validmsg">验证通过</div>',
                 valid : '<div class="field-validmsg">验证通过</div>'
            },
            confirmpassword:{
                required : '<div class="field-invalidmsg">请再次输入密码</div>',
                conditional : '<div class="field-invalidmsg">两次密码不一样</div>',
                valid : '<div class="field-validmsg">验证通过</div>'
            },
            address:{
                required : '<div class="field-invalidmsg">请选择地址</div>',
                valid : '<div class="field-validmsg">验证通过</div>'
            },
            intro:{
                required : '<div class="field-invalidmsg">请输入个人介绍</div>',
                valid : '<div class="field-validmsg">验证通过</div>'
            },
            favourite:{
                required : '<div class="field-invalidmsg">请选择个人爱好</div>',
                valid : '<div class="field-validmsg">验证通过</div>'
            },
            sex:{
                required : '<div class="field-invalidmsg">请输入性别</div>',
                valid : '<div class="field-validmsg">验证通过</div>'
            }
        }
    }));
})
