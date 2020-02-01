<template>
  <div class="light">
    <span v-for="(item,i) in list" :class="item==true?'act':''" :key="i"></span>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        list:[]
      }
    },
    props:{
      num:{
        type:Number,
        default:4
      },
      time:{
        type:Number,
        default:0.5
      }
    },
    // 定时修改灯的亮
    mounted(){
      // 设置灯的数量
      for(var i=0; i<this.num-1; i++){
        this.list.push(false)
      }
      this.list.unshift(true);
      this.autoplay()
    },
    methods:{
      autoplay(){
        // vue的数组不能直接通过this.list[0]=false这种方式来修改数据
        // 需要使用this.$set(list,0,false)这种方式，因为list是对象，不是基本数据类型
        // 这就涉及到了vue的响应式原理
        setInterval(()=>{
          var i=this.list.indexOf(true);
          // this.list[i]=false;
          this.$set(this.list,i,false)
          if(i==this.list.length-1){
            // this.list[0]=true;
            this.$set(this.list,0,true)
          }else{
            // this.list[i+1]=true;
            this.$set(this.list,i+1,true)
          }
        },this.time*1000)
      }
    }
  }

</script>

<style scoped lang="stylus" rel="sheetsheet/stylus">
  .light
    display flex
    justify-content center
    align-items center
    height 30px
    span
      width 10px
      height 10px
      border-radius 50%
      background rgba(255,255,255,.5)
      margin-right 10px
      &.act
        background rgba(96,96,96,.5)
</style>
