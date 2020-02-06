import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state={
  singer_img:'',
  singer_name:'',
  router_path:''
}

const mutations={
  change_singer_i(state,new_img){
    state.singer_img=new_img;
  },
  change_singer_n(state,singer_name){
    state.singer_name=singer_name;
  },
  change_router_p(state,router_path){
    state.router_path=router_path;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
