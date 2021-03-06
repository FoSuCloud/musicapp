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
6. `注意,push是router整个路由体制，获取是route也就是本条路由`

## 去除滚动条
1. 谷歌`      &::-webkit-scrollbar width 0!important`

## 为了方便真机调试
1. 把config/index的`localhost改为 host: '192.168.1.115'`
2. 无线局域网适配器 WLAN
3. `如果是请求本地服务器的数据，那么设置axios的baseUrl不能设为localhost，因为手机的localhost不一样`
```
// 设置axios请求的基础地址
axios.defaults.baseURL='http://192.168.1.115:3000';
```
4. 应该设置为何WLAN的地址一致

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

## 设置推荐页下面那些地方都是可滚动的
```
    mounted(){
      var y =this.$refs.recommend.getBoundingClientRect().y;
      this.$refs.recommend.setAttribute('style',`height:calc(100vh - ${y}px)`)
    },
```
1. 思路:`获取到元素所在的y坐标，那么减去该坐标也就获取到推荐页面的高度了，然后再设置可滚动就可以了`
```
.recommend
  overflow scroll
```

## 响应式修改vue的数据
*  vue的数组不能直接通过this.list[0]=false这种方式来修改数据
*  需要使用this.$set(list,0,false)这种方式，因为list是对象，不是基本数据类型
*  这就涉及到了vue的响应式原理
```
            // this.list[i+1]=true;
            this.$set(this.list,i+1,true)
```
* `需要注意的是，如果需要响应式的修改数据，也就是在视图层也能看到变化`
* `那么即使是基本数据类型也需要额外进行操作，也就是在computed中return数据`
* `那么是引用数据类型也需要额外进行操作，也就是使用this.$set(对象,索引或者属性名,值)来响应式的修改数据`

## 上拉加载
* `关键在于监听touchmove事件，判断公式是 元素y坐标+元素高度-元素滚动高度<页面可用高度+1`
* `+1是为了好判断一丢丢，防止有小数的情况`
```
      // 获取滚动事件，判断上拉加载
      rem_move(e){
        // 页面可用高度
        var page_height=window.innerHeight;
        // 元素高度(包括不可见部分)
        var rem_h=this.$refs.recommend.scrollHeight;
        // 元素滚动高度
        var rem_s_h=this.$refs.recommend.scrollTop;
        // 元素左上角y坐标
        var rem_y=this.$refs.recommend.getBoundingClientRect().y
        console.log(page_height,rem_h,rem_s_h,rem_y)
        console.log(rem_h+rem_y-rem_s_h)
        // 如果 元素y坐标+元素高度-元素滚动高度<页面可用高度则视为上拉加载
        if(rem_h+rem_y-rem_s_h<page_height+1 &&this.loading_show==false){
          this.loading_show=true;
          // 页面数+1
          this.page++;
          console.log("上拉加载")
          this.getmusicdetail();
        }
      },
```

## 下拉加载
* 思路:`通过touchstart,touchend事件来判断鼠标结束y坐标-鼠标开始y坐标>50，如果true则是下拉动作`
* `同时需要满足当前元素滚动高度为0`
```
      // 判断下拉刷新(思路:鼠标结束y坐标-鼠标开始y坐标>50 && 元素滚动高度为0)
      rem_start(e){
        this.touch_s=e.changedTouches[0].pageY;
      },
      rem_end(e){
        var touch_e=e.changedTouches[0].pageY;
        var scro_y=this.$refs.recommend.scrollTop;
        if(touch_e-this.touch_s>50&&scro_y==0&&this.light_show==false){
          console.log("下拉刷新")
          this.light_show=true;
          // 重新获取第一页的歌单推荐
          this.page=1;
          this.getmusicdetail();
        }
      }
```

## 列表中部分img的src使用了请求到的http形式的地址(找不到图片)
1. `但是如果有些图片是需要使用本地加载的图片，这个时候直接使用item.src?item.src:'/common/image/default.png'是没办法加载到本地图片的！`
2. `这是因为请求返回的是text/html格式文件，不是png,但是如果只有一个图片，使用的是src="/common/image/default/png"则是正确的`
3. `解决方法:使用requrie()来加载图片`
4. `default_img:require('../../common/image/default.png')`

## 懒加载图片
1. 思路:其实就是还不需要显示的图片的src就设置为默认图片，`首先在mounted阶段初始化，保存当前显示的最后一个元素的索引`
2. 公式:`可见的元素个数=（页面高度-元素所在坐标y）/单个图片高度,+1是为了不那么难看`
```
      // 初始化懒加载
      init_lazy(){
        // 获取元素所在坐标y
        var y=this.$refs.remlist.getBoundingClientRect().y;
        // 获取单个小图片的高度(此时无法获得)
        // var height=document.getElementsByClassName('rem_i')[0].clientHeight;
        var height=70;
        // 获取页面高度
        var win_h=window.innerHeight
        // 公式 可见的元素个数=（页面高度-元素所在坐标y）/单个图片高度,+1是为了不那么难看
        var i=parseInt((win_h-y)/height)+1;
        // 设置懒加载的位置索引
        this.lazy_index=i-1;
        // 如果存在需要懒加载显示的元素则设置src为空,通过设置html
      },
```
3. `监听滚动事件，需要懒加载的元素个数=parseInt(滚动高度/单个图片高度)`
4. `同时需要进行一个懒加载高度判断，如果之前滚动到过此处，那么以后再次滚动到此处不要再次加载了！`
```
        // 获取单个小图片的高度
        var height=document.getElementsByClassName('rem_i')[0].clientHeight;
        // 获取滚动的高度(获取图片列表的滚动高度会失败。。)
        var scro_h=this.$refs.recommend.scrollTop;
        // 需要懒加载的元素个数=parseInt(滚动高度/单个图片高度)
        var lazy_num=parseInt(scro_h/height);
        // 同时需要进行一个懒加载高度判断，如果之前滚动到过此处，那么以后再次滚动到此处不要再次加载了！
        while(scro_h>this.max_scro_h&&lazy_num>0){
          this.max_scro_h=scro_h
          // 增加元素与否？如果列表数量依旧大于索引数
          if(this.rem_list.length>this.lazy_index){
            this.lazy_index++;
            lazy_num--;
          }else{
            lazy_num=0;
          }
        }
```

## 下载图片到本地
1. 步骤:1. 前端使用ajax请求node后端地址
2. node后端接收到url,使用http.get方式，监听reponse.on('end'),返回arraybuffer格式的数据
3. 前端把arraybuffer格式数据转为base64数据`因为直接把a.href设置为url只是会跳转，不会真的下载`
```
前端:
export function downloadIamge(imgsrc, name) {
  var newImgsrc = 'http://192.168.1.115:3000/imgs/preview?src=' + imgsrc;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', newImgsrc, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    // arraybuffer格式的数据
    var str=this.response;
    // 转为base64格式数据
    var n_s=transformArrayBufferToBase64(str)
    var a = document.createElement("a"); // 生成一个a元素
    var event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    // 前面需要添加 'data:image/png;base64,'
    a.href = 'data:image/png;base64,'+n_s; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  xhr.send();
}

function transformArrayBufferToBase64 (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
```
* 后端
```
router.get('/preview',(req,res,next)=>{
	var src=req.query.src;
	http.get(src, function (response) {
	   var data = [];
		 response.on('data', function(chunk) {
			 data.push(chunk);
		 }).on('end', function() {
			 var buffer = Buffer.concat(data);
			 res.send(buffer);
		 });
	 });
})
```
* `思路:url格式不行，所以先在后端请求url,得到arraybuffer格式数据返回给前端，前端把arraybuffer数据转为base64数据，base64可以被直接下载`

## 图片加载失败(url是错误的，没有图片资源),使用默认的图片
1. `onerror="this.src='http:\/\/y.gtimg.cn\/music\/photo_new\/T001R150x150M000001fNHEf1SFEFN.webp'"`
2. `思路:对于img标签使用onerror事件，当图片资源不存在时会触发该事件，也就可以通过this.src=''这种方式来设置默认图片`
3. 但是需要注意，使用本地图片出了问题，暂时不理，用网络图片吧

## 两栏随之滚动实现
1. 思路:`首先给右边栏设置点击事件，点击之后跳转到相应的歌手字母栏，直接通过使用索引获取字母栏索引，然后获取到那一栏的offsetTop,然后给父元素设置scrollTop=,就可以设置滚动了`
2. `2. 滚动歌手栏，字母栏也需要影响的滚动，需要监听歌手栏的滚动位置，使用@scroll="",监听滚动事件`
3. `2.2 需要提前计算得各个子元素的offsetTop，offsetTop也就是元素顶部到父元素顶部的距离，但是有点问题就是第一个元素到父元素的距离不是0，所以需要额外-element[0].offsetTop`
4. `2.3 监听scroll事件，每次监听，都要判断哪一个歌手栏的offsetTop>滚动距离，大于则设置active`
```
      // 点击字母
      change_a(i,flag){
        var e=event;
        var who=document.getElementsByClassName('vertical_l_s')[i];
        var old=document.getElementsByClassName('a_active')[0];
        if(old){
          old.setAttribute('class','vertical_l_s')
        }
        who.setAttribute('class','vertical_l_s a_active');

        // 如果是点击的话，(如果是滚动调用就不需要再滚动)
        if(!flag){
          // 获取索引为i的歌手字母的坐标,offsetTop指的是元素距离父元素的top的位置
          // 因为不知道为何，即使是第一个元素距离父元素也有84px,所以需要计算一下
          var singer_zero=document.getElementsByClassName('singer_l')[0].offsetTop
          var singer_y=document.getElementsByClassName('singer_l')[i].offsetTop;
          // 上下移动(设置scrollTop,数字)
          this.$refs.singers.scrollTop=singer_y-singer_zero;
        }
      },
      //监听元素滚动事件scroll
      touch_end(e){
        // DOM操作很消耗资源，但是此时还是这样省事吧。。
        if( this.height_l.length==0){
          var ho_h_z=document.getElementsByClassName('singer_l')[0].offsetTop;
          for(var i=0; i<this.hotaz.length; i++){
            var ho_h=document.getElementsByClassName('singer_l')[i].offsetTop;
            this.height_l.push(ho_h-ho_h_z)
          }
        }
        var y=this.$refs.singers.scrollTop;
        for(var index in this.height_l){
          if(this.height_l[index]>y){
            this.change_a(index==this.height_l.length-1?index:index-1,true)
            break;
          }
        }
      }
```

## 设置椭圆图片并解决黑边问题
```
      .all
        width 100%
        height 100%
        /* 椭圆ellipse的x,y轴的半径
        圆心的位置x,y坐标 ,默认是中心点
        为了不让顶部的弧显示出来，所以我把x轴调大，其实也可以把中心点往上移，那样就可以遮住了
        最重要的是可以在浏览器调整
        调整策略是增加x轴(从50%开始调整)，等到弧度合适就停止
        然后减少中心点的y轴，(从50%开始调整)，等到遮住弧度就停止*/
        clip-path ellipse(90% 50% at 50% 30%)
        filter blur(3px)
        overflow hidden
        transform scale(1.1)

```
* `由于使用了filter blur(3px)是使得图片的各个位置都多了模糊像素，所以会多出背景黑边`
* `解决方法，让图片变大一点scale(1.1)`
* `目前不知为何，如果clip-path图形下面的元素是普通定位，那么图片依旧有黑边，解决方法是设置下面的图片也是相对定位`

## vuex的基本使用
1. 创建一个store.js文件，cnpm i vuex; 导入vuex, Vue.use(vuex);
2. const state={};const matations={};
3. `注意mutations的函数必须都有一个参数state,该参数不用传，修改state中的数据都通过该函数`
4. `通过this.$store.commit('',)方式来调用mutations中的函数，也可以传参`

## beforeDestory周期
```
       // var old=this.$refs.s_detail.getAttribute('class')
       // this.$refs.s_detail.setAttribute('class',old+' out');
       // console.log(this.$refs.s_detail.getAttribute('class'));//s_detail out
       // var start=new Date().getTime();
       // while(new Date().getTime()-start<1000){
       //   continue;
       // }
       // 销毁之前，虽然也能设置class类名成功，但是整个元素其实都被销毁了，添加了依旧无效阻塞主线程可以通过while()来实现，设置开始时间，如果当前时间-开始时间小于1秒则继续
```

## 由于页面的组件先进入mount周期，然后页面再进入所以需要传值就需要监听变化

## 监听手机端物理返回键
```
      // 监听物理返回键
      var that=this;
      window.addEventListener("popstate", function(e) {
        that.$emit('destroy')
        console.log("返回键")
      }, false);
```

## 但是监听到的只是浏览器的返回键
1. 如果是在hbuilder中打包的vue单页面应用，那么点击返回键返回的还是桌面
2. 试了监听的方式并无多大作用，然后尝试mui框架的back监听方式，明天再测试。。

## 监听触摸移动事件实现左右页面滑动
```
      // 监听触摸移动事件
      var move_x=e.changedTouches[0].pageX;
      var move_y=e.changedTouches[0].pageY;
      var del=move_x-this.start_x;
      var del_y=move_y-this.start_y;
      var mar_l=this.index*100;
      // 防止页面抖动
      if(Math.abs(del_y)<20&&Math.abs(del)>10){
        if(del<0&&this.index<3){
          this.$refs.router_v.style.marginLeft=`calc( -${mar_l}vw + ${del}px)`
        }else if(del>0&&this.index>0){
          this.$refs.router_v.style.marginLeft=`calc( -${mar_l}vw + ${del}px)`
        }
      }
```

## 在router-link中想要添加点击事件
1. `          <router-link tag="div" :to="{'name':'s_detail','query':{'sid':g_item.singer_mid}}" class="s_l_c" @click.native="to_detail(g_item.singer_mid,g_item.singer_pic,g_item.singer_name)" v-if="g_singer_l[item]" v-for="(g_item,g_i) in g_singer_l[item]" :key="g_i">`
2. 使用`@click.native也就可以让父组件在子组件上监听自己的click`
3. 如果不添加.native,那么父组件添加的点击事件无效

## hbuilder的云打包次数有限制
1. 所以使用本地打包
2. [参考](https://ask.dcloud.net.cn/article/508)
3. 根据教程做完后，替换掉index.html,然后创建static，更新该文件夹就可以了

## 物理返回键监听折腾那么久。。
1. 重点在于，直接在main.js中定义所有页面的init,back,注意区分首页
2. 首页的四个路由额外多出一个提示mui.toast，提示退出程序
3. 当监听到页面的返回键的时候，啥都别做，只去改变vuex的一个参数，然后各个页面分别watch '$store.state.path'
4. 注意的是，在页面路由判断中，main.js没有本条路由，只有路由体制，所以判断当前路由使用router.history.current.name就可以获取路由的名字
```
Vue.use(Mui);
Vue.prototype.$mui=Mui
mui.init({
  keyEventBind: {
    backbutton: true //开启back按键监听
  }
});

var first=null;
var router_list=[null,'recommend','singer','rank','search']

mui.back = function() {
    //首次按键，提示 再按一次退出应用
    if (!first) {
      first = new Date().getTime(); //记录第一次按下回退键的时间
      if(router_list.indexOf(router.history.current.name)!=-1){
        mui.toast("再按一次退出应用"); //判断首页给出提示
      }else{
        store.commit('change_router_p',router.history.current.name);
      }
      setTimeout(function() {
        //1s中后清除
        first = null;
      }, 1000);
    } else {
      if (new Date().getTime() - first < 1000) {
        //如果两次按下的时间小于1s，
        plus.runtime.quit(); //那么就退出app
      }
    }
}
```

## router-view多级使用
1. 不同级的router-link会填充在哪个router-view是根据to的内容
2. '/singer/detail/song'是填充到detail的下一级
3. '/singer/detail'就是填充到singer
4. '/singer'就是填充到app.vue
5. 即使app.vue存在router-view没有被填充的，但是层级不一致就不会填充这个

## -webkit-background-clip属性设置文字渐变色
1. `首先设置背景图片，注意背景图要设置宽高background-size来调整`
2. `然后设置-webkit-background-clip:text;切割范围是文字`
3. `注意!!!有一张图片只在background中用到，然后打包的时候就额外打包了，不知道是什么策略`
4. `但是后果就是-webkit-background-clip没有生效，因为找不到这张图片，所以我还是用了default.png,没用text.png`

## 音乐的播放mp3数据获取
1. [参考](https://segmentfault.com/q/1010000012698827/a-1020000012700711)
2. 注意:`pc端抓不到包就去移动端抓，关键点在于vkey的获取`

## audio标签
1. oncanplay的时候才能去获取duration，否则获取到的就是NaN
2. `但是实际监听播放时间变化还是要用addEventListener('timeupdate')`

## progress标签
1. 进度条组件,不要写progress,progress是h5标签