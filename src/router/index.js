import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VuexCs from '@/components/VuexCs'
import Block from '@/components/Block'
import Echarts from '@/components/Echarts'
import Webscoket from '@/components/Webscoket'
import Fanyi from '@/components/Fanyi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Webscoket',
      component: HelloWorld
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vuex',
      name: 'Vuex',
      component: VuexCs
    },
    {
      path: '/echarts',
      name: 'Echarts',
      component: Echarts
    },
    {
      path: '/block',
      name: 'Block',
      component: Block
    },
    {
      path: '/fanyi',
      name: 'Fanyi',
      component: Fanyi
    },
  ]
})
