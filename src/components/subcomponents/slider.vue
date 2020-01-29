<template>
  <div class="sli_a">
    <div class="slider_l" ref="slider">
        <div v-for="(item,i) in list" class="sli_i" :key="i">
          <img :src="item.picurl" :alt="item.mvtitle" @click="preimg">
        </div>
    </div>
  </div>
</template>

<script>
  import {preimg} from 'common/js/util'
  export default {
    data(){
      return{}
    },
    props:['list','interval'],
    methods:{
      // 自动开始轮播
      autoplay(){
         // let cla=this.$refs.slider.getAttribute('class');
         let i=0;
         let width=this.$refs.slider.offsetWidth;
         console.log(width)
         // this.$refs.slider.setAttribute('style',`animation:switch ${this.interval}s ${this.ways} ${this.infinity?'infinite':1}`)
         setInterval(()=>{
           this.$refs.slider.setAttribute('style',`transform:translate(${-width*i}px,0px)`)
           i++;
           if(i==this.list.length){
             i=0; //重新开始
           }
         },this.interval*1000)
      },
      preimg(){
        // var src=e.currentTarget.dataset.src
        var n_list=[];
        var list=this.list;
        if(list.length>0){
          list.forEach((item,i)=>{
            var obj={}
            obj.src=item.picurl
            obj.title=item.mvtitle
            n_list.push(obj)
          })
        }
        preimg(this,n_list)
      }
    },
    created(){
      // console.log('created',this.list)
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

</style>
