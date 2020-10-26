import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../views/home/'
import token from '../views/token/'
import pair from '../views/pair/'

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      component: home,
      meta: { keep_alive: true },
    },
    {
      path: "/token/:id",
      component: token,
    },
    {
      path: "/pair/:id",
      component: pair,
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
