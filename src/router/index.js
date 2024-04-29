import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '@/views/CatalogView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CartView from '@/views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CatalogView',
      component: CatalogView
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductDetailView
    },
    {
      path: '/cart',
      name: 'CartView',
      component: CartView
    }
  ]
})

export default router
