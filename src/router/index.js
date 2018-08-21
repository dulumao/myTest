import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import vuexCs from '@/components/vuexCs'
import Block from '@/components/Block'
import echarts from '@/components/echarts'
import Webscoket from '@/components/Webscoket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Webscoket',
      component: Webscoket
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: vuexCs
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: echarts
    },
    {
      path: '/Block',
      name: 'Block',
      component: Block
    }
  ]
})
