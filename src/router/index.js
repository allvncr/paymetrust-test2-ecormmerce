import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: () => import('../views/Shop.vue'),
      meta: { navbar: true }
    },
    {
      path: '/products/:slug',
      name: 'product detail',
      component: () => import('../views/DetailProduit.vue'),
      meta: { navbar: true }
    },
    {
      path: '/panier',
      name: 'panier',
      component: () => import('../views/PanierPage.vue'),
      meta: { navbar: true }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/StaticPages/404.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not Found',
      redirect: () => {
        return { path: '/404' }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0) // Défilement vers le haut de la page
  next()
})

export default router
