import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state={
  singer_img:'',
  singer_name:''
}

const mutations={
  change_singer_i(state,new_img){
    state.singer_img=new_img;
  },
  change_singer_n(state,singer_name){
    state.singer_name=singer_name;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
