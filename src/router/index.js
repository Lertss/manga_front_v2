import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Catalog from "@/views/Catalog.vue";
import Test from "@/views/Test/Test.vue";
import MangaPage from "@/views/Manga/MangaPage.vue";
import GlawPage from "@/views/Manga/ChapterPage.vue";
import ResetPassword from "@/views/User/ResetPasswordConfirm.vue";
import Profile from "@/views/User/Profile.vue";
import Login from "@/views/User/Login.vue";
import Test2 from "@/views/Test/Test2.vue";
import EmailConfirm from "@/views/User/EmailConfirm.vue";
import SignUp from "@/views/User/SgnUp.vue"
import MangaCreate from "@/views/Manga/MangaCreate.vue";
import Test4 from "@/views/Test/Test4.vue";
import MangaUpdate from "@/views/Manga/MangaUpdate.vue";
import ChapterCreate from "@/views/Manga/ChapterCreate.vue";
import ChapterUpdate from "@/views/Manga/ChapterUpdate.vue";
import AccountPage from "@/views/User/AccountPage.vue";
import TopHundredMangaRating from "@/views/Manga/TopHundredMangaRating.vue";
import TopHundredMangaLastRating from "@/views/Manga/TopHundredMangaLastRating.vue";
import Tophundredmangacomments from "@/views/Manga/Tophundredmangacomments.vue";


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
    path: '/top/hundred/rating',
    name: 'TopHundredMangaRating',
    component: TopHundredMangaRating,
  },
  {
    path: '/top/hundred/last/rating',
    name: 'TopHundredMangaLastRating',
    component: TopHundredMangaLastRating,
  },
  {
    path: '/top/hundred/coment',
    name: 'Tophundredmangacomments',
    component: Tophundredmangacomments,
  },
  {
    path: '/:slug',
    name: 'mangapage',
    component: MangaPage
  },
  {
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
  },  {
    path: '/test4',
    name: 'test4',
    component: Test4
  },
  {
    path: '/manga/create',
    name: 'manga_create',
    component: MangaCreate
  },
  {
    path: '/manga/update/:slug',
    name: 'mangaUpdate',
    component: MangaUpdate
  },
  {
    path: '/:slug/chapter/update/:slugchap',
    name: 'chapter_update',
    component: ChapterUpdate
  },
  {
    path: '/:slug/chapter/create',
    name: 'chapter_create',
    component: ChapterCreate
  },

  {
    path: '/auth/password/reset/confirm/:uuid/:token',
    name: 'resetpassword',
    component: ResetPassword
  },
  {
      path: '/account/:slug',
      name: 'account',
      component: AccountPage,
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
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn) {
        next('/catalog');
      } else {
        next();
      }
    }
  },















  {
    path: '/account-confirm-email/:token',
    name: 'account-confirm-email',
    component: EmailConfirm,
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