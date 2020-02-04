import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import 'babel-polyfill'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store.js'

// 设置fastclick.attach(document.body)可以让body里面的内容点击的那300毫秒延迟
fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.use({axios, VueAxios});
// 设置axios请求的基础地址
axios.defaults.baseURL='http://192.168.1.115:3000';

Vue.prototype.$axios=axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store
})
