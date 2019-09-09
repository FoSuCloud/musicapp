import Vue from 'vue'
import Router from 'vue-router'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import singer from 'components/singer/singer'
import recommend from 'components/recommend/recommend'
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
      component:singer
    },
    {
      path :'/recommend',
      component:recommend
    }
  ]
})
