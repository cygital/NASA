import { createRouter, createWebHashHistory } from 'vue-router'
import Signin from '../views/Signin.vue'
import store from '../store'

let checkAuth = (to, from, next) => {
  if(store.state.authenticated == false) {
    next('/')
  } else {
      next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      store.commit("setAuthentication", false)
      next('/')
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/searchbyrange',
    name: 'SearchByRange',
    component: () => import('../views/SearchByRange.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/searchbyid',
    name: 'SearchById',
    component: () => import('../views/SearchById.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/saved',
    name: 'Saved',
    component: () => import('../views/Saved.vue'),
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
