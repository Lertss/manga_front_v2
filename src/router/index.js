import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from "@/views/Catalog.vue";
import Test from "@/views/Test.vue";
import MangaPage from "@/views/MangaPage.vue";
import GlawPage from "@/views/GlawPage.vue";
import ResetPassword from "@/views/ResetPassword.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: Catalog
  },
  {
    path: '/:slug',
    name: 'mangapage',
    component: MangaPage
  },  {
    path: '/:slug/:slug',
    name: 'glawpage',
    component: GlawPage
  },

  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/password/reset/confirm/:uuid/:token',
    name: 'resetpassword',
    component: ResetPassword
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
