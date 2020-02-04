<template>
   <div class="s_detail" ref="s_detail" >
     <div class="detail_img">
       <img :src="image" alt="头像" class="all" onerror="this.src='http:\/\/y.gtimg.cn\/music\/photo_new\/T001R150x150M000001fNHEf1SFEFN.webp'">
       <img :src="image" alt="头像" class="small" onerror="this.src='http:\/\/y.gtimg.cn\/music\/photo_new\/T001R150x150M000001fNHEf1SFEFN.webp'">
       <img class="icon" src="../../common/image/l_angle.png" alt="返回" @click="destory_c">
     </div>
     
   </div>
</template>

<script>
  import jsonp from '../../common/js/jsonp.js'
  export default{
    data(){
      return{
        sid:0,
        page:1,
        image:'',
        song_list:[]
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
      },
      get_detail(){
        var url='https://u.y.qq.com/cgi-bin/musicu.fcg';
        var obj={
          g_tk:5381,
          loginUin:0,
          hostUin:0,
          format:'json',
          inCharset:'utf8',
          outCharset:'utf-8',
          notice:0,
          platform:'yqq.json',
          needNewCode:0,
          data:{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":this.sid,"begin":this.page,"num":10},"module":"musichall.song_list_server"}}
        }
        jsonp(url,obj).then((res)=>{
          this.song_list=res.singerSongList.data.songList
          console.log(this.song_list)
        })
      }
    },
    mounted(){
      this.sid=this.$route.query.sid
      this.image=this.$route.params.image
      this.get_detail()
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
    .detail_img
      position relative
      height 200px
      .all
        width 100%
        height 100%
        /* 椭圆ellipse的x,y轴的半径
        圆心的位置x,y坐标 */
        clip-path ellipse(90% 50% at 50% 30%)
        filter blur(3px)
        overflow hidden
        transform scale(1.1)
      .small
        position absolute
        bottom 0px
        left 0
        right 0
        margin auto
        width 5rem
        height 5rem
        border-radius 50%
      .icon
        position absolute
        top 0.5rem
        left 0.5rem
        width 1.5rem
        height 1.5rem
</style>
