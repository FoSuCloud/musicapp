<template>
  <div id="app">
    <div class="fix" ref="fix">
      <m-header></m-header>
      <tab @get_num="g_num" :click_index="click_index"></tab>
    </div>
    <div class="all_router" ref="router_v" @touchmove="router_move" @touchstart="router_v_s" @touchend="router_v_end">
      <recommend :mt="mt"></recommend>
      <singer :mt="mt"></singer>
      <rank :mt="mt"></rank>
      <search :mt="mt"></search>
    </div>
  </div>
</template>

<script>
  import MHeader from 'components/subcomponents/m-header'
  import Tab from 'components/subcomponents/tab'
  import recommend from 'components/recommend/recommend'
  import singer from 'components/singer/singer'
  import rank from 'components/rank/rank'
  import search from 'components/search/search'

  export default {
    name: 'App',
    data(){
      return{
        mt:0,
        index:0,
        start_x:0,
        start_y:0,
        click_index:0
      }
    },
    components:{
       MHeader,
       Tab,
       search,
       rank,
       recommend,
       singer
    },
    mounted(){
      var y=this.$refs.fix.scrollHeight;
      this.mt=y;
      this.$refs.router_v.setAttribute('style',`margin-top:${y}px`);

      var that=this;
      window.addEventListener('popstate',()=>{
        switch(this.$route.path){
          case '/recommend':
            this.g_num(0)
            break;
          case '/singer':
            this.g_num(1)
            break;
          case '/rank':
            this.g_num(2)
            break;
          case '/search':
            this.g_num(3)
            break;
        }
      },false)
    },
    methods:{
      g_num(data){
        this.index=data;
        this.$refs.router_v.style.marginLeft=`-${this.index*100}vw`
        this.click_index=data;
      },
      router_v_s(e){
        var x=e.changedTouches[0].pageX;
        var y=e.changedTouches[0].pageY;
        this.start_x=x;
        this.start_y=y;
      },
      // 监听是否需要换屏
      switch_or(){
        if(this.$route.path=='/recommend'||
        this.$route.path=='/singer'||
        this.$route.path=='/rank'||
        this.$route.path=='/search'){
          return true;
        }
        return false
      },
      router_v_end(e){
         var x=e.changedTouches[0].pageX;
         var del=this.start_x-x;
         // 如果不是当前页面就不要换屏
         if(!this.switch_or()){
           return;
         }
         
         if(del>100){
           if(this.index<3){
             this.index++;
           }
         }else if(del<-100){
           if(this.index>0){
             this.index--;
           }
         }
         this.g_num(this.index);
      },
      // 监听触摸移动事件
      router_move(e){
        // 如果不是当前页面就不要换屏
        if(!this.switch_or()){
          return;
        }
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
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @media screen and (min-width: 320px) {
      html {font-size: 14px;}
  }
  @media screen and (min-width: 360px) {
      html {font-size: 16px;}
  }
  @media screen and (min-width: 400px) {
      html {font-size: 18px;}
  }
  @media screen and (min-width: 440px) {
      html {font-size: 20px;}
  }
  @media screen and (min-width: 480px) {
      html {font-size: 22px;}
  }
  @media screen and (min-width: 640px) {
      html {font-size: 28px;}
  }
  @media screen and (min-width: 640px) {
      html {font-size: 28px;}
  }
  #app
    overflow hidden
    width 100vw
    height 100vh
    .fix
      position fixed
      top 0
      left 0
      width 100vw
    .all_router
      width 400vw
      display flex
      flex-direction  row
</style>
