import jsonp from '../common/js/jsonp'
import config from './config.js'

export function getrecommend(){
  let url='https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag';
  let data=Object.assign({},config.commonParams,{
    platform: 'yqq.json',
    loginUin:0,
    hostUin:0,
    cmd:'shoubo',
    lan:'all',
    needNewCode: 0
  })
  return jsonp(url,data,config.options)
}
