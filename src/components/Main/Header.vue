<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-scroll" :class="{ 'fixed-top': !isNavHidden, 'hide': isNavHidden }">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Logo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbar2Label">Offcanvas</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/catalog">Catalog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/test">Test</a>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" href="/profile">Profile</a>
            </li>
            <li class="nav-item dropdown" v-if="isLoggedIn">
              <button class="nav-link" @click="logout">Logout</button>
            </li>
            <li class="nav-item dropdown" v-if="!isLoggedIn">
              <a class="nav-link" href="/signup">Signup</a>
            </li>
            <li class="nav-item dropdown" v-if="!isLoggedIn">
              <a class="nav-link" href="/log-in">Login</a>
            </li>
          </ul>

          <form class="d-flex mt-3 mt-lg-0" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { VueCookieNext } from "vue-cookie-next";

export default {
  data() {
    return {
      isNavHidden: false,
      lastScrollTop: 0,
      ticking: false,
      isLoggedIn: false, // Додайте стан для статусу користувача
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Перевірка статусу користувача
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop;
          this.isNavHidden = scrolled > this.lastScrollTop;
          this.lastScrollTop = scrolled;
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    async logout() {
      try {
        VueCookieNext.removeCookie('refreshToken');
        VueCookieNext.removeCookie('accessToken');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('user');
        location.reload();
        this.isLoggedIn = false; // Змінити статус користувача на вихід
      } catch (error) {
        console.error('Помилка виходу:', error);
      }
    },
  },
};
</script>


<style>
/* Додайте стилі для ефекту випливання зверху */
.hide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index:0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0s 0.3s;
}

.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0s 0s;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}


</style>
