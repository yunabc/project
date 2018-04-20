项目使用方法
1.安装node 方法自行百度




2.克隆项目到本地git clone https://gitee.com/yun_00/baidaibang.git
3.yarn install 安装所有依赖

npm run dev 跑起本地开发环境
ctrl+c 关闭服务
npm run build 打包项目



本项目使用了pug模板,样式预处理工具用的stylus可以先学习一下。es6语法支持，promise，generator/yeild,async/await等可以自由发挥, 安装项目依赖可以直接用yarn(使用方法百度),布局方式用的vw，用rem的化需要注释px2viewport,推荐用vw（紧随潮流）。 
大家学习一下export import 导入导出，方便代码复用。

引入第三方库可以部分引入 区别如下
import { isArray } from "lodash"  // 只是一个方法  打包的时候只有这个方法
import _ from "lodash" // 整个库文件 会打包整个文件


写了个简单的弹窗组件，/src/web/pages/testWindow 就是测试demo 样式超级丑，按照我们常用的可以再自行封装，修改样式。当然也可以看看 es6的继承是怎么用的

为了避免重复创建index.pug，默认不创建index.pug，以/src/web/common/layout.pug为模板，当整个模板不能满足你需求的时候再自行创建index.pug

/src/web/pages/compile.config.json 是各个页面的配置文件，创建新页面的时候可以不在文件夹里创建index.pug但是必须在这个json文件里写一个与这个页面相关的配置。


手机查看开发中的页面（前提是手机和电脑是同一个路由，台式的就自行解决吧）  本机ip + :端口号(默认3000) + 开发页面  例如： 192.168.31.109:3000/brand.html


默认建立页面位置  /src/web/pages/  创建的要做的页面文件夹  例如 brand 在brand 文件夹下建立 index.js(此为js入口),index.pug(此为页面入口),至于样式可以随意起名字当然也可以叫index.styl



























js原生交互规则

登录：
window.locJs.login（）
不传参数遇到登录方法就跳转


分享
window.locJs.share（）
 var share_data = {
                    shareurl:planBook.sharedata.shareurl,
                    sharetitle:planBook.sharedata.sharetitle,
                    sharesecondtitle:planBook.sharedata.sharesecondtitle,
                    sharephoto:planBook.sharedata.sharephoto
                };
实名认证(现在已经改成资格认证)

window.locJs.nametrue（）




关闭web页面返回到刚进来的app页面
window.locJs.finishpage（）

h5跳转产品详情（传productcode）

window.locJs.toproinfo（）
var pro_data = {
                    productcode:"1000000000001"
                };

//其他需要跳转的以后再重新定义
