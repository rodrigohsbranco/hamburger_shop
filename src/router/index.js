import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: () => import(/* webpackChunkName: "Pedidos" */ '../views/Pedidos.vue')
    }
  ]
})

export default router
