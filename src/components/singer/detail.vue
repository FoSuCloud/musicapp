<template>
   <div class="s_detail" ref="s_detail" >
     <div class="detail_img">
       <img :src="image" alt="头像" class="all" onerror="this.src='http:\/\/y.gtimg.cn\/music\/photo_new\/T001R150x150M000001fNHEf1SFEFN.webp'">
       <img :src="image" alt="头像" class="small" onerror="this.src='http:\/\/y.gtimg.cn\/music\/photo_new\/T001R150x150M000001fNHEf1SFEFN.webp'">
       <img class="icon" src="../../common/image/l_angle.png" alt="返回" @click="destory_c">
       <span class="name">{{singer_name}}</span>
     </div>
     <div class="song_list" ref="song_list" @scroll="song_scroll">
       <div class="s_list_c" v-for="(s_item,index) in song_list" :key="index">
         <p class="name">{{s_item.songInfo.name}}</p>
         <p class="most">{{singer_name}}·{{s_item.songInfo.album.name}}</p>
       </div>
       <loading v-if="g_loading_show"></loading>
     </div>
   </div>
</template>

<script>
  import jsonp from '../../common/js/jsonp.js'
  import loading from '../subcomponents/loading.vue'
  export default{
    data(){
      return{
        sid:0,
        page:1,
        image:'',
        singer_name:'',
        song_list:[],
        loading_show:false
      }
    },
    components:{
      loading
    },
    methods:{
      // 监听列表滚动
      song_scroll(e){
          var scroll_top=this.$refs.song_list.scrollTop;
          let y=this.$refs.song_list.getBoundingClientRect().y;
          var height=window.innerHeight;
          var song_s_height=this.$refs.song_list.scrollHeight;
          var song_height=parseInt(this.$refs.song_list.clientHeight);
          // 计算公式:列表长度(包括不可见高度)-滚动高度<=列表可见高度(包括padding,margin)
          if(!this.loading_show&&song_s_height-scroll_top<=song_height+1){
            this.loading_show=true;
            this.page++;
            this.get_detail()
          }
      },
      befo_en(){
        this.$nextTick(()=>{
          console.log("进入之前")
        })
      },
      destory_c(){
        console.log("点击返回")
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
          if(this.page==1){
            this.song_list=res.singerSongList.data.songList
          }else{
            setTimeout(()=>{
              this.loading_show=false;
              this.song_list=this.song_list.concat(res.singerSongList.data.songList);
            },500)
          }
        })
      }
    },
    computed:{
      g_loading_show(){
        return this.loading_show
      }
    },
    mounted(){
      this.sid=this.$route.query.sid
      this.image=this.$store.state.singer_img
      this.singer_name=this.$store.state.singer_name
      console.log(this.singer_name)
      this.get_detail()
      let y=this.$refs.song_list.getBoundingClientRect().y;
      var height=window.innerHeight;
      var num=height-y;
      this.$refs.song_list.setAttribute('style',`height:${num}px`)
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
    background $color-background
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
        clip-path ellipse(100% 50% at 50% 30%)
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
        z-index 100
        top 0
        left 0
        margin 0.5rem 1rem 0.5rem 0.5rem
        width 1.5rem
        height 1.5rem
      .name
        position absolute
        left 0
        right 0
        margin auto
        top 0.8rem
        font-size $font-size-large
        color $color-background
        text-align center
    .song_list
      padding 1rem
      box-sizing border-box
      overflow scroll
      position relative
      .s_list_c
        padding 1rem 0 0
        &:first-child
          padding 0
        &:last-child
          margin-bottom 2rem
        .name
          font-size $font-size-medium
          color $000000
          padding-bottom $font-size-small-s
        .most
          font-size $font-size-small
          color $color-dialog-background

</style>
