<template>
  <div class="recommend" ref="recommend" @touchmove="rem_move"
  @touchstart="rem_start" @touchend="rem_end">
    <light v-if="g_light_s"></light>
    <slider :list="list" :interval="3" ></slider>
    <p class="rem_p">热门歌单推荐</p>
    <div class="rem_list" ref="remlist" @touchmove="list_move">
      <div class="rem_i" v-for="(item,index) in g_rem_list" :key="index">
        <img :src="g_lazy_index>index?item.img:default_img" :alt="item.title">
        <div class="rem_i_r">
          <span class="us">{{item.username}}</span>
          <span class="ti">{{item.title}}</span>
        </div>
      </div>
    </div>
    <loading v-if="g_loading_show"></loading>
  </div>
</template>

<script>
  import {getrecommend} from 'api/recommend.js'
  import slider from '../subcomponents/slider.vue'
  import loading from '../subcomponents/loading.vue'
  import light from '../subcomponents/light.vue'

  export default{
    data(){
       return{
         list:[],
         rem_list:[],
         page:1,
         touch_s:0,
         loading_show:false,
         light_show:false,
         lazy_index:0,
         max_scro_h:0,
         default_img:require('../../common/image/default.png')
       }
    },
    created(){
      this.getRecommend();
      this.getmusicdetail()
    },
    mounted(){
      var y =this.$refs.recommend.getBoundingClientRect().y;
      this.$refs.recommend.setAttribute('style',`height:calc(100vh - ${y}px)`)
      // 初始化懒加载
      this.init_lazy()
    },
    components:{
      slider,
      loading,
      light
    },
    methods:{
      getRecommend(){
        getrecommend().then((res)=>{
          // console.log('返回,res.data.mvlist)
          this.list=res.data.mvlist.slice(0,4)
        })
      },
      // 获取推荐歌单
      getmusicdetail(){
        this.$axios.get('/index/remList?page='+this.page).then((res)=>{
          // 取消上拉加载,下拉刷新,但是为了能够显示，所以至少显示0.5秒
          setTimeout(()=>{
            this.loading_show=false;
            this.light_show=false;
          },500)
          if(this.page==1){
            this.rem_list=res.data.data
            this.max_scro_h=0;
          }else{
            this.rem_list=this.rem_list.concat(res.data.data)
          }
        })
      },
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
        // 如果 元素y坐标+元素高度-元素滚动高度<页面可用高度则视为上拉加载
        if(rem_h+rem_y-rem_s_h<page_height+1 &&this.loading_show==false){
          this.loading_show=true;
          // 页面数+1
          this.page++;
          this.getmusicdetail();
        }
      },
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
      },
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
      // 制作图片懒加载
      list_move(){
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
      }
    },
    computed:{
      g_rem_list(){
        return this.rem_list
      },
      g_loading_show(){
        return this.loading_show
      },
      g_light_s(){
        return this.light_show
      },
      g_lazy_index(){
        return this.lazy_index;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/variable'
.recommend
  overflow scroll
  .rem_p
    color $color-theme
    font-size $font-size-medium-x
    margin $font-size-medium-x auto
    text-align center
  .rem_list
    margin $font-size-medium-x
    .rem_i
      margin-bottom $font-size-medium-x
      display flex
      img
        display inline-block
        border-radius $font-size-medium
        width 4rem
        height 4rem
        margin-right $font-size-medium-x
      .rem_i_r
        display inline-block
        flex 1
        position relative
        height 4rem
        span
          display block
        .us
          display -webkit-box
          overflow hidden
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          font-size $font-size-medium-x
          color #fff
          margin-top 0.3rem
        .ti
          position absolute
          bottom 0.3rem
          left 0
          font-size $font-size-small
          color #999
      &:last-child
        margin-bottom $font-size-small-s
</style>
