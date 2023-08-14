import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Catalog from "@/views/Catalog.vue";
import Test from "@/views/Test.vue";
import MangaPage from "@/views/MangaPage.vue";
import GlawPage from "@/views/GlawPage.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import Test2 from "@/views/Test2.vue";


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
    path: '/:slug/:slugtwo',
    name: 'glawpage',
    component: GlawPage
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/test2',
    name: 'test2',
    component: Test2
  },
  {
    path: '/password/reset/confirm/:uuid/:token',
    name: 'resetpassword',
    component: ResetPassword
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/log-in',
    name: 'log-in',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) {
        next('/catalog');
      } else {
        next();
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
let isLoading = true;
let isAuthenticated = localStorage.getItem('isLoggedIn');
const isLoggedIn = isAuthenticated === 'true';

router.beforeEach((to, from, next) => {
  if (isLoading) {
    if (to.matched.some(route => route.meta.requiresAuth) && !isLoggedIn) {
      isLoading = false;
      next('/log-in');
    } else {
      isLoading = false;
      next();
    }
  } else {
    next();
  }
});

export default router;