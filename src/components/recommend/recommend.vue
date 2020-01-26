<template>
  <div class="recommend">
    recommend
  </div>
</template>

<script>
  import {getrecommend} from 'api/recommend.js'

  export default{
    created(){
      this.getRecommend()
    },
    methods:{
      getRecommend(){
          getrecommend().then((res)=>{
          console.log(res)
        })
      }
    }
  }
</script>

<style>
</style>
