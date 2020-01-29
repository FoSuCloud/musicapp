export function preimg(that,list){
  console.log("路由跳转",that)
  that.$router.push({path:'/preview',query:{list:list}})
}
