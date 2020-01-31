<template>
  <div class="recommend">
    <slider :list="list" :interval="3" ></slider>
    <p class="rem_p">热门歌单推荐</p>
    <div class="rem_list">
      <div class="rem_i" v-for="(item,index) in g_rem_list" :key="index">
        <img :src="item.img" :alt="item.title">
        <div class="rem_i_r">
          <span class="us">{{item.username}}</span>
          <span class="ti">{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getrecommend} from 'api/recommend.js'
  import slider from '../subcomponents/slider.vue'

  export default{
    data(){
       return{
         list:[],
         rem_list:[]
       }
    },
    created(){
      this.getRecommend();
      this.getmusicdetail()
    },
    components:{
      slider
    },
    methods:{
      getRecommend(){
        getrecommend().then((res)=>{
          // console.log('返回,res.data.mvlist)
          this.list=res.data.mvlist.slice(0,4)
        })
      },
      // 获取推荐歌单
      getmusicdetail(){
        // this.$axios.get('/index/remList?page='+'1').then((res)=>{
        //   console.log("推荐",res.data.data)
        //   this.rem_list=res.data.data
        // })
        this.$axios.get('/index/test').then((res)=>{
          console.log(res.data.cdlist[0])
        })
      }
    },
    computed:{
      g_rem_list(){
        return this.rem_list
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/variable'
  .rem_p
    color $color-theme
    font-size $font-size-medium-x
    margin 20px auto
    text-align center
  .rem_list
    margin 20px
    .rem_i
      margin-bottom 20px
      display flex
      img
        display inline-block
        border-radius 12px
        width 70px
        height 70px
        margin-right 20px
      .rem_i_r
        display inline-block
        flex 1
        position relative
        height 70px
        span
          display block
        .us
          display -webkit-box
          overflow hidden
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          font-size $font-size-medium-x
          color #fff
          margin-top 5px
        .ti
          position absolute
          bottom 5px
          left 0
          font-size $font-size-small
          color #999
      &:last-child
        margin-bottom 10px
</style>
