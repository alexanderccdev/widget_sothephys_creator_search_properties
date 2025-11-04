import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue')
      },
      {
        path: '/properties',
        name: 'properties',
        component: () => import('@/pages/PropertyListPage.vue')
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('@/pages/PropertyTablePage.vue')
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('@/pages/StatisticsPage.vue')
      },
      {
        path: '/purchase-process',
        name: 'purchase-process',
        component: () => import('@/pages/PurchaseProcessPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
