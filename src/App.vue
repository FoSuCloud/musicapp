<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
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
    }
  }
</script>

<style>
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
