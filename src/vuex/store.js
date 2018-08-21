import Vue from "vue"
import Vuex from "vuex"
import water from "./modules/water"
import * as mutations from './mutations'
import * as getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName : "ceshi",
    userPwd: "123456",
    num1: 0,
    num2: 0,
  },
  mutations,
  //vuex中的计算属性
  getters,
  modules: {
    water
  }
})
export default store
