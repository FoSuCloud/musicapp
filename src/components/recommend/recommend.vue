<template>
  <div class="recommend">
    <slider :list="list" :interval="3" ></slider>
  </div>
</template>

<script>
  import {getrecommend} from 'api/recommend.js'
  import slider from '../subcomponents/slider.vue'
  export default{
    data(){
       return{
         list:[]
       }
    },
    created(){
      this.getRecommend()
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
      }
    }
  }
</script>

<style>
</style>
