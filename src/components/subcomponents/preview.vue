<template>
  <div class="mask">
    <img :src="src" :alt="title">
  </div>
</template>

<script>
  export default{
    data(){
      return{
        title:'',
        src:''
      }
    },
    created(){
      this.title=this.$route.params.title;
      this.src=this.$route.params.src;
      console.log("路由跳转了",this.$route)
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  .mask
    position fixed
    top 0
    left 0
    width 100vw
    height 100vh
    background rgba(0,0,0,.7)
    z-index 6
    img
      position relative
      top 50%
      left 50%
      margin-left -40vw
      margin-top -150px
      width 80vw
      height 300px
      z-index 7
</style>
