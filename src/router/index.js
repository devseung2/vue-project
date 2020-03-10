import Vue from 'vue'
import Router from 'vue-router'
import Base from '../pages/Base'
import Detail from '../pages/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Base',
      component: Base
    },
    {
      path: '/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
