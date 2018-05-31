import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Products from '../components/Products.vue'
import Product from '../components/Product.vue'
import Checkout from '../components/Checkout.vue'
import Thankyou from '../components/Thankyou.vue'
import NotFound from '../components/NotFound.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'

const routes = [
  {
    path: `/`,
    name: `home`,
    component: Products
  },
  {
    path: `/product/:id`,
    name: `product`,
    component: Product,
    props: true
  },
  {
    path: `/checkout`,
    name: `checkout`,
    component: Checkout,
    beforeEnter: AuthGuard
  },
  {
    path: `/thankyou`,
    name: `thankyou`,
    component: Thankyou,
    beforeEnter: AuthGuard
  },
  {
    path: `/login`,
    name: `login`,
    component: Login
  },
  {
    path: `/registration`,
    name: `registration`,
    component: Registration
  },
  {
    path: `/*`,
    name: `NotFound`,
    component: NotFound
  }
]

const router = new VueRouter({
  routes,
  mode: `history`
})

export default router
