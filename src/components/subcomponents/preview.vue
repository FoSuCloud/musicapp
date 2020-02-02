<template>
  <div class="mask" @click="show_mask">
    <div class="over_img">
      <div class="img_a" ref="preview">
        <img :src="item.src" :alt="item.title"
        v-for="(item,i) in list"
         :key="i" @touchstart.stop="touch_start" @touchend.stop="touch_end">
      </div>
    </div>
    <!-- 显示图片数量 -->
    <p class="num">
      {{get_num}}/{{list.length}}
    </p>
  </div>
</template>

<script>
  import {downloadIamge} from '../../common/js/util.js'
  export default{
    data(){
      return{
        page_s_x:0,
        num:1,
        s_timeStamp:0
      }
    },
    props:['list','i_index'],
    mounted(){
      this.num=this.i_index+1
      let width=this.$refs.preview.offsetWidth;
      this.$refs.preview.setAttribute('style',`transform:translate(${-width*(this.num-1)}px,0px)`)
    },
    computed:{
      get_num(){
        return this.num;
      }
    },
    methods:{
      // 隐藏/显示蒙版
      show_mask(){
         this.$emit('show_mask')
      },
      touch_start(e){
        this.page_s_x=e.changedTouches[0].pageX;
        this.s_timeStamp=e.timeStamp
      },
      touch_end(e){
        var end_x=e.changedTouches[0].pageX;
        var num=this.num
        let width=this.$refs.preview.offsetWidth;
        // 向右移动
        if(end_x-this.page_s_x<-50){
          if(num<this.list.length){
            this.num++;
            let i=this.num-1;
            this.$refs.preview.setAttribute('style',`transform:translate(${-width*i}px,0px)`)
          }
        }else if(end_x-this.page_s_x>50){
          if(num>1){
            this.num--
            let i=this.num-1;
            this.$refs.preview.setAttribute('style',`transform:translate(${-width*i}px,0px)`)
          }
        }else if(e.timeStamp-this.s_timeStamp>500){
          // 判断长按时间
          this.long_img()
        }
      },
      // 长按保存图片
      long_img(){
        // alert("长按")
        // 保存图片到本地
        downloadIamge(this.list[this.num-1].src,this.list[this.num-1].title)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  .mask
    position fixed
    top 0
    left 0
    width 100vw
    height 100vh
    background rgba(0,0,0,.7)
    z-index 6
    .over_img
      overflow hidden
      position relative
      top 50%
      left 50%
      margin-left -40vw
      margin-top -150px
      width 80vw
      height 300px
      z-index 7
      .img_a
        width 80vw
        height 300px
        display flex
        font-size 0
        &::-webkit-scrollbar
          width 0!important
        img
          width 100%
          height 100%
          display inline-block
    .num
      position relative
      top 50%
      left 0
      text-align center
      font-size 20px
      z-index 8
      color white
</style>
