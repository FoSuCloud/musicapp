import Vue from 'vue'
import Router from 'vue-router'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import singer from 'components/singer/singer'
import singer_d from 'components/singer/detail'
import song from 'components/singer/song'
import recommend from 'components/recommend/recommend'
import preview from 'components/subcomponents/preview'
Vue.use(Router)

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path :'/rank',
      component:rank,
      name:'rank'
    },
    {
      path :'/search',
      component:search,
      name:'search'
    },
    {
      path :'/singer',
      component:singer,
      name:'singer',
      children:[
        { path:'detail',
          name:'s_detail',
          component:singer_d,
          children:[
          {path:'song',name:'song',component:song}
        ]}
      ]
    },
    {
      path :'/recommend',
      // component:recommend,  // 去掉这里,否则会渲染该组件两次
      name:'recommend'
    }
  ]
})
