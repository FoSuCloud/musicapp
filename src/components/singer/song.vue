<template>
  <div class="song" ref="song_all">
    <audio ref="myaudio" autoplay="true" :src="g_audio"  preload="load"></audio>
    <i class="icon-back" @click="destory_c"></i>
    <div class="song_one">
      <p class="name">{{s_name}}</p>
      <p class="singer">{{sin_name}}</p>
      <div class="s_o_all">
        <div class="back_word" ref="margin_word"  @touchstart="rotate_start" @touchend="rotate_end">
          <div class="rorate_s" ref="rotate_r">
            <div class="small_r">
                <div class="right" ref="right"></div>
                <div class="left" ref="left"></div>
            </div>
            <img :src="s_picurl" alt="歌曲图" class="small">
          </div>
          <!-- 歌词 -->
          <div class="word" ref="songw">
          </div>
        </div>
        <img :src="s_picurl" alt="歌曲背景" class="big">
        <div class="slider_s">
          <span :class="word_show?'':'active'"></span>
          <span :class="word_show?'active':''"></span>
        </div>
        <div class="operators">
          <div class="icon i-left" @click="changeMode">
            <i class="icon-loop"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i @click="prev" class="icon-prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i @click="togglePlaying" :class="play?'icon-pause':'icon-play'"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i @click="next" class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i @click="toggleFavorite()" class="icon icon-favorite" ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import jsonp from '../../common/js/jsonp.js'
  export default {
    data(){
      return{
        disableCls:'113',
        iconMode:'543',
        playIcon:'423',
        song_id:0,
        song_mid:0,
        s_picurl:'',
        s_name:'',
        sin_name:'',
        vkey:'',
        play:true  ,// 是否播放
        word_show:false  ,//是否切换到歌词
        touch_s:0,
        songword:''  //歌词
      }
    },
    watch:{
      '$store.state.router_path'(val){
        if(val==this.$route.name){
          // 防止该值没有变化
          this.$store.commit('change_router_p','');
          this.destory_c();
        }
      }
    },
    computed:{
      g_audio(){
        return 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400'+this.song_mid+'.m4a?guid=4714392631&vkey='+this.vkey+'&uin=4291&fromtag=38'
      }
    },
    mounted(){
      this.song_id=localStorage.getItem('song_id')
      this.song_mid=localStorage.getItem('song_mid')
      this.get_song_d(this.song_id)
    },
    methods:{
      // 页面消失
      destory_c(){
        var old=this.$refs.song_all.getAttribute('class')
        this.$refs.song_all.setAttribute('class',old+' out')
        // 延时1s返回上个页面
        setTimeout(()=>{
          this.$router.back();
        },1000)
      },
      // 获取歌曲信息
      get_song_d(id){
        var songmid=localStorage.getItem('song_mid')
        if(id){
          this.$axios.get('/singers/song_d?id='+id+'&songmid='+songmid).then((res)=>{
            console.log(res.data)
            this.s_picurl=res.data.video.data.list[0].picurl
            this.s_name=res.data.video.data.list[0].title
            this.sin_name=res.data.video.data.list[0].singers[0].name
            this.getSongVkey()
            this.resize_data(res.data.lyric)
          })
        }
      },
      // 处理歌词字符编码及重组织数据
      resize_data(data){
        // 需要把特殊编码解析一下，使用innerHtml
        var one=document.createElement("span");
        one.innerHTML=data
        this.songword=one.innerHTML
        // 重组织数据结构
        var arr=this.songword.split('\n');
        for(var key=0; key<arr.length; key++){
          var i=arr[key].indexOf('[00:');
          console.log(arr[key])
          if(i!=-1){
            // 把第一句(歌曲名 作者名去掉),还是不去掉
            arr=arr.slice(key);
            break;
          }
        }
        // 组织成数组
        var n_arr=[]
        arr.forEach((item)=>{
          var time=item.split(']')[0].replace('[','')
          var text=item.split(']')[1]
          n_arr.push({time:time,text:text.trim()})
        })
        console.log(n_arr)
        this.$refs.songw.innerHTML=this.songword;
      },
      // 获取歌曲vkey,使用mid
      getSongVkey() {
        var songmid=localStorage.getItem('song_mid')
        const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
        const data = Object.assign({}, {
            callback: 'musicJsonCallback',
            loginUin: 1614115011,
            format: 'jsonp',
            platform: 'yqq',
            needNewCode: 0,
            cid: 205361747,
            uin: 4291,
            guid: 4714392631,
            songmid: songmid,
            filename: `C400${songmid}.m4a`
        })
        jsonp(url, data).then((res)=>{
          this.vkey=res.data.items[0].vkey
          this.togglePlaying(1)
        })
      },
      // 控制歌曲进度条
      song_play(){
        var audio=this.$refs.myaudio;
        var that=this;
        // oncanplay的时候才能去获取duration，否则获取到的就是NaN
        audio.addEventListener('timeupdate',function(){
          var ra=audio.currentTime/audio.duration;
          var angle=ra*360;// 角度
          if(angle<180){
            that.$refs.right.style.transform=`rotate(${angle}deg)`
          }else if(angle>=180){
            that.$refs.right.style.transform=`rotate(0deg)`
            that.$refs.left.style.background=`linear-gradient(45deg,#ffcd32,#d93f30)`
            that.$refs.left.style.transform=`rotate(${angle-180}deg)`
          }
        })
      },
      // 获取背景图滚动开始位置
      rotate_start(e){
        this.touch_s=e.changedTouches[0].pageX;
      },
      // 判断是否切换
      rotate_end(e){
        var touch_e=e.changedTouches[0].pageX;
        if((touch_e-this.touch_s>50&&this.word_show)||(touch_e-this.touch_s<-50&&!this.word_show)){
          console.log("切换歌词")
          this.word_show=!this.word_show;
          if(this.word_show){
            this.$refs.margin_word.style.marginLeft='-100vw'
          }else{
            this.$refs.margin_word.style.marginLeft='0'
          }
        }
      },
      changeMode(){
        console.log('1')
      },
      prev(){
        console.log('1')
      },
      // 切换播放与暂停
      togglePlaying(flag){
        if(flag!=1){
          this.play=!this.play
        }
        if(this.play){
          this.$refs.myaudio.play()
          if(this.$refs.rotate_r.style['animationPlayState']=='paused'){
            this.$refs.rotate_r.setAttribute('style','animation-play-state:running')
          }
          if(flag==1){
            this.song_play()
          }
        }else{
          this.$refs.myaudio.pause()
          // 取消旋转
          this.$refs.rotate_r.setAttribute('style','animation-play-state:paused')
        }
      },
      next(){
        console.log('1')
      },
      toggleFavorite(){
        console.log('1')
      },
      getFavoriteIcon(){
        return '22'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/variable'
  @keyframes enter
    0%
      transform translateY(100%)
      opacity 0
    100%
      transform translateY(0)
      opacity 1
  @keyframes out
    0%
      transform scale(100%)
      opacity 1
    100%
      transform scale(1.2)
      opacity 0
  @keyframes rotate_a
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)
  .song
    position fixed
    left 0
    top 0
    height 100vh
    width 100vw
    z-index 5
    background-color #333
    animation 1s enter ease-in-out 1
    &.out
      animation 1s out ease-out 1
    .icon-back
      font-size 1.5rem
      color $color-theme
      margin 0.5rem 1rem 0.5rem 0.5rem
      display inline-block
      position fixed
     .song_one
      text-align center
      display flex
      height 100vh
      flex-direction column
      .name
        margin 0.5rem 15%
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
      .singer
        margin 0.5rem 0 2rem
      .s_o_all
        margin-bottom 6rem
        flex 1
        position relative
        .back_word
          position relative
          height 100%
          .word
            text-align center
            position absolute
            left 100vw
            top 0
            height 100%
            width 100vw
            overflow hidden
            box-sizing border-box
            padding 1rem
            margin-top -1.5rem
          .rorate_s
            position absolute
            left 0
            right 0
            width 17rem
            height 17rem
            border-radius 50%
            background-color rgba(255,255,255,.5)
            margin-left calc(50vw - 8.5rem)
            animation infinite 5s rotate_a linear
            z-index 10
            .small_r
              z-index 2
              width 17rem
              height 17rem
              border-radius 50%
              background linear-gradient(45deg,$color-theme,$color-sub-theme)
              position relative
              .right
                position absolute
                clip   rect(0 17rem 17rem 8.5rem)
                background-color rgba(255,255,255,1)
                width 17rem
                height 17rem
                border-radius 50%
                left 0
                right 0
              .left
                position absolute
                clip rect(0 8.5rem 17rem 0)
                background-color rgba(255,255,255,1)
                width 17rem
                height 17rem
                border-radius 50%
                left 0
                right 0
            .small
              width 16rem
              height 16rem
              border-radius 50%
              z-index 3
              display block
              position absolute
              top 0.5rem
              left 0.5rem
        .big
          display block
          width 80%
          height 100%
          filter blur(50px)
          overflow hidden
          margin auto
          position absolute
          left 0
          right 0
          top 0
          z-index -1
        .slider_s
          margin -1rem auto 1rem
          text-align center
          span
            display inline-block
            margin-right 0.5rem
            border-radius 50%
            width 0.5rem
            height 0.5rem
            background #E0E0E0
            &.active
              width 1.2rem
              border-radius 0.2rem
        .operators
          display flex
          justify-content space-around
          align-items center
          margin 0 2rem
          .icon
            display inline-block
            i
              font-size 1.8rem
              color $color-theme
              &.icon-play
                font-size 2.5rem
            .icon-pause
              font-size 2.5rem
</style>
