import Vue from 'vue'
import Router from 'vue-router'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import singer from 'components/singer/singer'
import singer_d from 'components/singer/detail'
import recommend from 'components/recommend/recommend'
import preview from 'components/subcomponents/preview'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path :'/rank',
      component:rank
    },
    {
      path :'/search',
      component:search
    },
    {
      path :'/singer',
      component:singer,
      children:[
        {path:'detail',name:'s_detail',component:singer_d}
      ]
    },
    {
      path :'/recommend',
      component:recommend
    },
    // 预览图片
    {
      path:'/preview',
      component:preview
    }
  ]
})
