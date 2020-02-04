<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view ref="router_v" @touchstart="router_v_s" @touchend="router_v_end"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from 'components/subcomponents/m-header'
  import Tab from 'components/subcomponents/tab'

  export default {
    name: 'App',
    components:{
       MHeader,
       Tab
    },
    methods:{
      router_v_s(e){
        var x=e.changedTouches[0].pageX;
        console.log(x)
      },
      router_v_end(e){
         var x=e.changedTouches[0].pageX;
         console.log(x)
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
</style>
