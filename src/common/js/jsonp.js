import originJSONP from 'jsonp'

export default function jsonp(url,data,option){
  url=(url.indexOf('?')!=-1?url+'&':url+'?')+param(data)
  console.log("jsonp",url)
  return new Promise((resolve,reject)=>{
    originJSONP(url,option,(err,data)=>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}
// 重新组织data
function param(data){
  let url='';
  for(var key in data){
    let val=data[key]===undefined?'':data[key];
    if(val instanceof Object){
      val=JSON.stringify(val);
    }
    // 该语句先执行右边的再执行左边的
    url+=`&${key}=${encodeURIComponent(val)}`
  }
  //去掉第一个&
  return url?url.substr(1):''
}
