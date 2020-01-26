<template>
  <div class="header">
    <div class="header-wrapper">
      <img src="../../common/image/default.png" alt="音乐app图标" title="音乐app图标">
      <span class="header-text">My Music</span>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
<<<<<<< HEAD
  @import "~common/stylus/variable"
=======
  @import '../../common/stylus/variable'
>>>>>>> 01e76c2ba07f4f817b824e2c8c91519a5c34f21d
  .header
    .header-wrapper
      margin:0.31rem auto
      // 块级元素一定要设置width才能水平居中
      width:max-content
      width:-webkit-max-content
      width:-moz-max-content
      img
        width:2.5rem
        height:2.5rem
      .header-text
        font-size:$font-size-medium-x
        color:$color-theme
</style>
