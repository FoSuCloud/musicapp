<template>
  <div>
    <div class="sli_a">
      <div class="slider_l" ref="slider">
          <div v-for="(item,i) in list" class="sli_i" :key="i">
            <img :src="item.picurl" :alt="item.mvtitle" @click="preimg(i)"
            @touchstart="touchstart" @touchend="touchend">
          </div>
      </div>
      <div class="dot">
        <span v-for="(item,i) in list" :key="i" :class="i==now_num?'bor_a':''"></span>
      </div>
    </div>
    <preview :list="p_list" :i_index="i_index" v-if="p_show" @show_mask="show_mask"></preview>
  </div>
</template>

<script>
  import preview from 'components/subcomponents/preview'
  export default {
    data(){
      return{
        p_list:[],
        i_index:1,
        p_show:false,
        touch_start:'',
        timer:'',
        now_num:0,
        clear:false
      }
    },
    components:{
      preview
    },
    props:['list','interval'],
    methods:{
      // 显示或者隐藏模板
      show_mask(){
        this.p_show=!this.p_show
      },
      touchstart(e){
        e.cancelBubble=true;
        this.touch_start=e.changedTouches[0].pageX
      },
      touchend(){
        var e=event;
        e.cancelBubble=true;
        var end_x=e.changedTouches[0].pageX;
        let width=this.$refs.slider.offsetWidth;
        if(end_x-this.touch_start>50&&this.now_num>0){
          this.clear=true;
          this.now_num--;
          this.$refs.slider.setAttribute('style',`transform:translate(${-width*this.now_num}px,0px)`)
          setTimeout(()=>{
            this.autoplay()
          },0)
        }else if(end_x-this.touch_start<-50&&this.now_num<3){
          this.clear=true;
          this.now_num++;
          this.$refs.slider.setAttribute('style',`transform:translate(${-width*this.now_num}px,0px)`)
          setTimeout(()=>{
            this.autoplay()
          },0)
        }
      },
      // 自动开始轮播
      autoplay(){
         let width=this.$refs.slider.offsetWidth;
         if(width>0){
           var timer=setInterval(()=>{
             if(this.clear){
               clearInterval(timer)
             }else{
               this.now_num++;
               //重新开始
               if(this.now_num==this.list.length){
                 this.now_num=0;
               }
               this.$refs.slider.setAttribute('style',`transform:translate(${-width*this.now_num}px,0px)`)
             }
             this.clear=false;
           },this.interval*1000)
         }
      },
      // 显示预览图
      preimg(i){
        var n_list=[]
        this.list.forEach((item)=>{
          let obj={};
          obj.src=item.picurl;
          obj.title=item.mvtitle;
          n_list.push(obj);
        })
        this.p_list=n_list;
        this.i_index=i;
        this.p_show=true
      }
    },
    // 使用mounted周期依然无法正确监听到数据接受，因此使用监听数据方式
    watch:{
      list:function(newval,oldval){
        if(oldval&&oldval.length==0&&newval&&newval.length>0){
          this.autoplay()
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  @import '../../common/stylus/mixin'
  .sli_a
    height:200px
    width:100vw
    overflow hidden
    position relative
    .slider_l
      height:200px
      font-size:0
      display:flex
      position relative
      .sli_i
        width:100vw
        height:200px
        display:inline-block
        img
          width:100vw
          height:200px
          display:block
    .dot
      position absolute
      bottom 0
      left 0
      text-align center
      height 20px
      display flex
      align-items center
      justify-content center
      right 0
      margin auto
      span
        width 10px
        height 10px
        border-radius 50%
        margin-right 10px
        background rgba(255,255,255,.5)
        &.bor_a
          background rgba(96,96,96,.5)
</style>
