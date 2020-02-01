<template>
  <div class="load">
    <div class="inner"></div>
    <div class="rotate"></div>
  </div>
</template>

<script>
  export default{

  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/variable'
  .load
    width 40px
    height 40px
    border-radius 50%
    margin auto
    position relative
    .inner
      width 32px
      height 32px
      border-radius 50%
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background #222
      margin auto
      z-index 4
    .rotate
      width 40px
      height 40px
      border-radius 50%
      background linear-gradient(30deg,$color-sub-theme,$color-theme)
      z-index 3
      position absolute
      left 0
      top 0
      clip rect(0,40px,20px,20px)
      animation spin 1s infinite
    @keyframes spin{
      0%{
        transform rotate(0)
      }
      100%{
        transform rotate(360deg)
      }
    }
</style>
