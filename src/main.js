// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import jquery from "jquery"
import Vuex from "vuex"
import store from "./vuex/store"
import VueResource from "vue-resource"
import "./assets/css/reset.css"
import axiox from "axios"

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.config.devtools = true

Vue.prototype.axios = axiox
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  http: {
    root: '/static',
    headers: {
      "Content-Type": 'Basic YXBpOnBhc3N3b3Jk'
    }
  },
  components: { App },
  template: '<App/>'
})
