import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import initialLayout from '../layouts/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "sign-in",
    component: () => import('../views/auth/signIn.vue')
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import('../components/CartModal.vue')
  },
  {
    path: '/dashBoard',
    name: 'home',
    component: initialLayout,
    children: [
      {
        path: '',
        name: "dashBoard",
        component: () => import('../views/dashboard/index.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
