<template>
  <div class="tab">
    <router-link  tag="div" class="tab-item" to="/recommend">
        <span class="tab-link" @click="get_num(0)">推荐</span>
    </router-link>
    <router-link  tag="div" class="tab-item" to="/singer">
        <span class="tab-link" @click="get_num(1)">歌手</span>
    </router-link>
    <router-link  tag="div" class="tab-item" to="/rank">
        <span class="tab-link" @click="get_num(2)">排行</span>
    </router-link>
    <router-link  tag="div" class="tab-item" to="/search">
        <span class="tab-link" @click="get_num(3)">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default{
    data(){
      return{}
    },
    props:['click_index'],
    methods:{
      get_num(i){
        this.$emit('get_num',i)
      }
    },
    watch:{
      // 增加点击事件
      click_index(val){
        var who=document.getElementsByClassName('tab-item')[val];
        var event=new MouseEvent('click');
        who.dispatchEvent(event)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/variable'
  .tab
    display:flex
    margin-bottom:0.5rem
    .tab-item
      flex:1
      text-align:center
      padding-bottom:10px
      font-size:$font-size-small
      &.router-link-active
        font-size:$font-size-medium
        .tab-link
          color:$color-theme
          position: relative
          padding-bottom:0.2rem
          &:after
            content:" "
            border-bottom:0.16rem solid $color-theme-d
            width:100%
            position: absolute
            bottom:-5px
            left:0
</style>
