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

## 安装jsonp实现跨域
1. 安装:`在package.json中添加"jsonp":"^0.2.1";在命令行执行cnpm install下载`
2. jsonp的github文档[文档](https://github.com/webmodules/jsonp)
3. 编写jsonp函数
```
import originJSONP from 'jsonp'

export default function jsonp(url,data,option){
  url=(url.indexOf('?')!=-1?url+'&':url+'?')+param(data)
  return new Promise((resolve,reject)=>{
    originJSONP(url,option,(err,data)=>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}
// 重新组织data
function param(data){
  let url='';
  for(var key in data){
    let val=data[key]===undefined?'':data[key]
    // 该语句先执行右边的再执行左边的
    url+=`&${key}=${encodeURIComponent(val)}`

  }
  //去掉第一个&
  return url?url.substr(1):''
}

```
4. `配置基本参数和设置请求地址，但是qq音乐接口跟换了，所以实际500状态码`

## 路由跳转
1. 路由跳转使用`this.$router.push({path:''})的方式`
2. 另外还可以传递参数
3. 但是传递参数需要使用query，使用params不知为何取不到值
4. `that.$router.push({path:'/preview',query:{list:list}})`