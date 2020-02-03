<template>
   <div class="s_detail" ref="s_detail" @click="destory_c">detail</div>
</template>

<script>
  export default{
    data(){
      return{
      }
    },
    methods:{
      befo_en(){
        this.$nextTick(()=>{
          console.log("进入之前")
        })
      },
      destory_c(){
        var old=this.$refs.s_detail.getAttribute('class')
        this.$refs.s_detail.setAttribute('class',old+' out')
        // 延时1s返回上个页面
        setTimeout(()=>{
          this.$router.back();
        },1000)
      }
    },
    mounted(){
      console.log("渲染之后")
    },
    beforeDestroy(){
      // setTimeout无法阻止主线程，所以延时失败，需要监听箭头的点击事件才对
      setTimeout(()=>{
          console.log("延时1s")
      },1000)
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/variable'
  @keyframes enter
    0%{
      transform translateX(100%)
    }
    100%{
      transform translateX(0)
    }
  @keyframes out
    0%{
      transform translateX(0)
    }
    100%{
      transform translateX(100%)
    }
  .s_detail
    position fixed
    left 0
    top 0
    width 100vw
    height 100vh
    z-index 10
    background $color-highlight-background
    animation enter 1s 1
    &.out
      animation out 1s 1
</style>
