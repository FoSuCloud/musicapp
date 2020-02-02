<template>
  <div class="singer" ref="singers">
    <div class="singer_l" v-for="(item,i) in hotaz" :key="i">
      <div class="s_l_box">{{i==0?'热门':item}}</div>
      <div class="s_l_c" v-if="g_singer_l[item]" v-for="(g_item,g_i) in g_singer_l[item]" :key="g_i">
        <img :src="g_item.singer_pic?g_item.singer_pic:default_img">
        <span>{{g_item.singer_name}}</span>
      </div>
    </div>
    <div class="vertical_l" ref="vertical_l">
      <span v-for="(item,i) in hotaz" :key="i">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        singer_l:[],
        default_img:require('../../common/image/default.png'),
        hotaz:["热", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
      }
    },
    mounted(){
      var y=this.$refs.singers.getBoundingClientRect().y;
      var height=window.innerHeight;
      var num=height-y;
      num=num+'px'
      y=y+'px'
      this.$refs.vertical_l.setAttribute('style','top:calc(('+num+' - 29rem) / 2 + '+y+')')
      this.get_singers();
    },
    methods:{
      get_singers(){
        this.$axios.get('/singers').then((res)=>{
          this.singer_l=res.data.data;
        })
      }
    },
    computed:{
      g_singer_l(){
        return this.singer_l;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/variable'
  .singer
    .singer_l
      .s_l_box
        background $color-highlight-background
        height 2rem
        line-height 2rem
        font-size $font-size-medium
        color $color-text-background
        text-align left
        padding-left 1rem
      .s_l_c
        padding 1rem 1rem 0
        img
          display inline-block
          vertical-align middle
          width 3rem
          height 3rem
          border-radius 50%
          margin-right 1rem
        span
          margin-top 0.3rem
          font-size $font-size-medium
          color $color-text-background
        &:last-child
          padding-bottom 1rem
    .vertical_l
      position fixed
      right 0
      bottom 0
      top 0
      height 27rem
      padding 1rem 0
      background $color-highlight-background
      width 1.5rem
      text-align center
      font-size 0
      span
        display block
        line-height 1rem
        font-size $font-size-small
        color $color-text-background
</style>
