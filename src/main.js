import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import 'babel-polyfill'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store.js'
import Mui from 'vue-awesome-mui';

// 设置fastclick.attach(document.body)可以让body里面的内容点击的那300毫秒延迟
fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.use({axios, VueAxios});
// 设置axios请求的基础地址
axios.defaults.baseURL='http://106.14.210.52:3389';

Vue.prototype.$axios=axios

Vue.use(Mui);
Vue.prototype.$mui=Mui
mui.init({
  keyEventBind: {
    backbutton: true //开启back按键监听
  }
});

var first=null;
var router_list=[null,'recommend','singer','rank','search']

mui.back = function() {
    //首次按键，提示 再按一次退出应用
    if (!first) {
      first = new Date().getTime(); //记录第一次按下回退键的时间
      if(router_list.indexOf(router.history.current.name)!=-1){
        mui.toast("再按一次退出应用"); //判断首页给出提示
      }else{
        store.commit('change_router_p',router.history.current.name);
      }
      setTimeout(function() {
        //1s中后清除
        first = null;
      }, 1000);
    } else {
      if (new Date().getTime() - first < 1000) {
        //如果两次按下的时间小于1s，
        plus.runtime.quit(); //那么就退出app
      }
    }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store
})
