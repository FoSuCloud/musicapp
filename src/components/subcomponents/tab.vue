<template>
  <div class="tab">
    <div class="tab-item" @click="get_num(0)" :class="click_index==0?' div-active':''" >
        <span class="tab-link" >推荐</span>
    </div>
    <div class="tab-item" @click="get_num(1)" :class="click_index==1?' div-active':''">
        <span class="tab-link">歌手</span>
    </div>
    <div class="tab-item" @click="get_num(2)" :class="click_index==2?' div-active':''" >
        <span class="tab-link">排行</span>
    </div>
    <div class="tab-item" @click="get_num(3)" :class="click_index==3?' div-active':''" >
        <span class="tab-link" >搜索</span>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
      }
    },
    props:['click_index'],
    methods:{
      get_num(i){
        switch(i){
          case 0:
            this.$router.push('/recommend')
            break;
          case 1:
            this.$router.push('/singer')
            break;
          case 2:
            this.$router.push('/rank')
            break;
          case 3:
            this.$router.push('/search')
            break;
        }
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
      &.div-active
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
