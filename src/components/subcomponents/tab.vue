<template>
  <div class="tab">
        <router-link tag="div" class="tab-item" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
            <span class="tab-link">搜索</span>
        </router-link>
  </div>
</template>

<script>
  export default{}
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">

  .tab
    display:flex
    .tab-item
      flex:1
      text-align:center
      &.router-link-active
        .tab-link
          color:$color-highlight-background
          position: relative
          margin-bottom:0.2rem
          &:after
            content:" "
            border-bottom:0.06rem solid red
            width:100%
            position: absolute
            bottom:0
            left:0

</style>
