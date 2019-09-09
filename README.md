## 1.从远程库克隆
* 由于项目刚开始在学校机房创建并上传到git上面，所以需要从git克隆到本地
* 使用`git clone git@github.com:FoSuCloud/musicapp.git`就可以克隆到本地了
* 另外新增的api目录下的` .gitkeep `文件为空，作用是`告诉git保留该空目录`,因为git是不允许保留空目录的

## 2.移动端300毫秒延迟
* 在移动端中，为了校验用户是不是在双击，会有300毫秒的延迟，为了可以立即响应用户的点击事件，可以使用`fastclick`
* `在main.js中设置fastclick.attach(document.body)`可以让全局的body页面内容都不再有300毫秒的点击延迟

## 3.babel-polyfill
* `babel默认只转换新的句法(syntax)而不转换新的方法(api)`,为了能够让新的API被使用，我们就需要使用`babel-polyfill`

## 4.alias别名
* 在webpack.base.conf.js中的alias可以使用别名，如`'common':resolve('src/common'),意思就是使用common的路径的时候就是也就是使用src/common,可以说是减少了代码吧`

## 5.rem适配不同屏幕的移动设备
1. 在app.vue中设置`@media screen and (min-width:320px) html {fon-size:14px} 表示的就是页面最小宽度为320px的时候，屏幕根目录的rem表示的是14px`
2. rem是css3新增的一个非常重要的相对单位，使用rem设置元素大小的时候，相对大小相对的是html元素，`通过修改不同设备下的rem就可以适配各种设备`

