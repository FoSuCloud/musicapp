<template>
  <div class="singer_all">
    <div class="singer" ref="singers" @scroll="touch_end">
      <div class="singer_l" v-for="(item,i) in hotaz" :key="i">
        <div class="s_l_box">{{i==0?'热门':item}}</div>
          <div class="s_l_c" @click="to_detail(g_item.singer_mid,g_item.singer_pic)" v-if="g_singer_l[item]" v-for="(g_item,g_i) in g_singer_l[item]" :key="g_i">
            <img :src="g_item.singer_pic" onerror="this.src='http:\/\/y.gtimg.cn\/music\/photo_new\/T001R150x150M000001fNHEf1SFEFN.webp'">
            <span>{{g_item.singer_name}}</span>
          </div>
      </div>
      <div class="vertical_l" ref="vertical_l">
        <span class="vertical_l_s" v-for="(item,i) in hotaz" :key="i"  @click="change_a(i)">{{item}}</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        singer_l:[],
        height_l:[],
        default_img:require('../../common/image/default.png'),
        hotaz:["热", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
      }
    },
    mounted(){
      var y=this.$refs.singers.getBoundingClientRect().y;
      var height=window.innerHeight;
      var num=height-y;
      num=num+'px'
      y=y+'px'
      this.$refs.singers.setAttribute('style',`height: ${num};`)
      this.$refs.vertical_l.setAttribute('style','top:calc(('+num+' - 29rem) / 2 + '+y+')')
      this.get_singers();


      var who=document.getElementsByClassName('vertical_l_s')[0];
      who.setAttribute('class','vertical_l_s a_active');

    },
    methods:{
      get_singers(){
        this.$axios.get('/singers').then((res)=>{
          this.singer_l=res.data.data;
        })
      },
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
      },
      to_detail(sid,image){
        this.$router.push({name:'s_detail',query:{sid:sid},params:{image:image}})
      }
    },
    computed:{
      g_singer_l(){
        return this.singer_l;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/variable'
  .singer
    overflow scroll
    .singer_l
      .s_l_box
        background $color-highlight-background
        height 2rem
        line-height 2rem
        font-size $font-size-medium
        color $color-text-background
        text-align left
        padding-left 1rem
      .s_l_c
        padding 1rem 1rem 0
        img
          display inline-block
          vertical-align middle
          width 3rem
          height 3rem
          border-radius 50%
          margin-right 1rem
        span
          margin-top 0.3rem
          font-size $font-size-medium
          color $color-text-background
        &:last-child
          padding-bottom 1rem
    .vertical_l
      position fixed
      right 0
      bottom 0
      top 0
      height 27rem
      padding 1rem 0
      background $color-highlight-background
      width 1.5rem
      text-align center
      font-size 0
      span
        display block
        line-height 1rem
        font-size $font-size-small
        color $color-text-background
      .a_active
        color $color-theme
        font-size $font-size-medium
</style>
