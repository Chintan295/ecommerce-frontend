import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:id',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "p-category" */ '../views/Category.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import(/* webpackChunkName: "p-ProductDetails" */ '../views/ProductDetails.vue')
  },
  {
    path: '/myorders',
    name: 'MyOrders',
    component: () => import(/* webpackChunkName: "p-ProductDetails" */ '../views/MyOrders.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "p-profile" */ '../views/Profile.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "p-cart" */ '../views/Cart.vue')
  },
  {
    path: '/myactivity',
    name: 'MyActivity',
    component: () => import(/* webpackChunkName: "p-cart" */ '../views/MyActivity.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "p-cart" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "p-register" */ '../views/Register.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "p-register" */ '../views/Search.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else if (to.matched.some(record => record.meta.guest)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next({
          path: '/profile'
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
