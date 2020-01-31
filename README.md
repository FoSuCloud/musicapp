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
5. `在跳转之后的路由页面使用this.$route.query.list来接收参数`

## 去除滚动条
1. 谷歌`      &::-webkit-scrollbar width 0!important`

## 为了方便真机调试
1. 把config/index的`localhost改为 host: '192.168.1.115'`
2. 无线局域网适配器 WLAN

## 把网络图片保存到本地
1. 根据网络上的思路，创建一个a元素，然后触发点击事件
2. 该方法与我想的不太一样，但是也有值得学习的地方
```
  var a = document.createElement("a"); // 生成一个a元素
  var event = new MouseEvent("click"); // 创建一个单击事件
  a.download = name || "photo"; // 设置图片名称
  a.href = imgsrc; // 将生成的URL设置为a.href属性
  a.dispatchEvent(event); // 触发a的单击事件
```

## 左滑右滑以及长按事件
1. `使用touchstart,touchend事件来获取鼠标前后pageX，通过差值来判断是否属于滑动`
2. `使用touchstart,touchend事件来获取鼠标前后pageX以及鼠标两个事件的时间间隔，如果坐标变化不大且时间间隔够长就视为长按事件`

## referer检验
1. `在某些接口中存在referer校验，获取不到数据，即使使用jsonp也不行，因为jsonp只是解决跨域问题`
2. `referer校验是为了检验来源网址，尝试过在前端！！！axios修改Referer字段，但是不行因为W3C设置了不能修改，为了安全性！`
3. `解决方法:使用接口代理的方式，在后端！！！通过创建axios的方式来设置header`
```
// 使用axios设置header的方式返回数据
router.get('/index/test',function(req, res, next){
	let url='https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
	axios.get(url,{
		headers:{
			origin:'https://y.qq.com',
			referer:'https://y.qq.com/n/yqq/playlist/7378198403.html'
		},
		params:{disstid:7378198403,  inCharset: 'utf-8',
			outCharset: 'utf-8',onlysong:0,utf8:1,type:1}
	}).then((response)=>{
		// console.log(response.data.slice(13,-2))
		res.json(JSON.parse(response.data.slice(13,-1)))
	}).catch((e)=>{
		console.log(e)
	})
})
```
