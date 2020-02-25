<template>
  <div class="pro">
    <span class="start">{{start}}</span>
    <div class="child" @click="changewidth" ref="child">
      <img src="../../common/image/circle.png"
      alt="进度条" class="chi_img" ref="chi_img">
    </div>
    <span class="end">{{end}}</span>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        start:'0:00',
        end:'0:00',
        clear:false, // 清除定时器的标记
        timer:{}
      }
    },
    methods:{
      // 获取持续时间与开始时间(不一定此时是0，可能是之前的暂停时间)
      gettime(start,duration){
        var end=duration.split('.')[0]
        if(end.split(':')[0].indexOf('0')==0){
          end=end.slice(1)
        }
        this.end=end
        this.start=start;
      },
      // 开始/暂停播放
      play(flag){
        if(flag==1){
          this.clear=true;// 清除定时器
        }else{
          this.clear=false;
          this.change_play();  //建立定时器
        }
      },
      // ，进度条长度修改
      change_play(){
        var that=this;
        var child=that.$refs.chi_img;

        var timer=setInterval(()=>{
          if(that.clear){
            clearInterval(timer)
          }

          var stime=that.start.split(':')
          var etime=that.end.split(':')

          var minute=that.start.split(':')[0];
          var second=that.start.split(':')[1];
          // 转为时间戳
          var st=stime[0]*60+parseInt(stime[1]);
          var et=etime[0]*60+parseInt(etime[1]);

          second++;
          if(second<60){
            that.start=minute+":"+that.add_zero(second);
          }else{
            // 等于60
            that.start=parseInt(minute)+1+":00";
          }
          // 移动进度条按钮
          var per=parseInt((st/et)*100);
          if(per<99){
            child.setAttribute('style',`left:${per}%`)
          }
          // 播放结束了
          if(that.start==that.end){
            console.log("超时停止")
            clearInterval(timer)
          }
        },1000)
      },
      // 数字补零
      add_zero(num){
        return num<10?('0'+num):num;
      },
      // 修改进度条长度
      changewidth(e){
        var width=this.$refs.child.offsetWidth;
        var child=this.$refs.chi_img;
        var x=e.offsetX;
        var per=(x/width).toFixed(2)*100
        child.setAttribute('style',`left:${per}%`)
        // 修改start
        var etime=this.end.split(':')
        // 转为时间戳
        var et=etime[0]*60+parseInt(etime[1]);
        var st=parseInt(et*per/100)
        // 转为分秒
        if(st<60){
          st="0:"+this.add_zero(st);
        }else{
          var tem=Math.floor(st/60);
          var min=parseInt(st-60*tem);
          st=tem+':'+this.add_zero(min)
        }
        this.start=st;
        // 清除定时器
        this.clear=true;
        this.$emit('pose',per)
      }
    },
    computed:{
      g_end(){
        return this.end
      }
    }
  }
</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  .pro
    height 0.1rem
    margin 0.5rem 1rem 0.6rem
    display flex
    align-items center
    .start,.end
      padding 0 4px
      font-size 8px
      color lightgray
      display inline-block
      vertical-align middle
    .child
      flex 1
      display inline-block
      background-color lightgray
      border-radius 5px
      position relative
      vertical-align middle
      height 0.1rem
      img
        position absolute
        left 0
        top 50%
        width 0.4rem
        height 0.4rem
        margin-top -0.2rem
        border-radius 50%
        background-color white
</style>
