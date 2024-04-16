import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/requests/1',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/requests',
      name: 'requests',
      component: () => import('../views/RequestList.vue'),
    },
    {
      path: '/requests/:id',
      name: 'request',
      component: () => import('../views/RequestPage.vue'),
    },
  ]
})

export default router
