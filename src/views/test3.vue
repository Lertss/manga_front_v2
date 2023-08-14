<template>
  <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Log In</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="formDatalog.username" type="text" class="form-control" id="username" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="formDatalog.password" type="password" class="form-control" id="password" required>
              </div>
              <button type="submit" data-bs-dismiss="modal" class="btn btn-primary ">Log In</button>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Reset password</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Reset password</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="reset">
                <div class="mb-3">
                  <label for="username" class="form-label">Email</label>
                  <input v-model="formDataresp.email" type="text" class="form-control" id="email" required>
                </div>
                <button type="submit" class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Reset password</button>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Log In</button>
        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Log In</button>
</template>

<script>
import axios from "axios";
import {VueCookieNext} from "vue-cookie-next";
import api from "@/components/kt/inter";

export default {
  data() {
    return {
      isLoggedIn: false,
      respon:[],
      formDataresp: {
        email: ''
      },
      formDatalog: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/auth/login/', this.formDatalog);
        const { access, refresh,  user } = response.data;

        // Зберігаємо токен в куці
        VueCookieNext.setCookie('accessToken', access); // Наприклад, зберігаємо на 7 днів
        VueCookieNext.setCookie('refreshToken', refresh)
        // Зберегти інформацію про користувача, якщо необхідно
        localStorage.setItem('user', JSON.stringify(user));

        // Перенаправлення на іншу сторінку (наприклад, Dashboard)
        this.$router.push('/profile');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async reset() {
      try {
        const response = await axios.post('/auth/password/reset/', this.formDataresp);
        this.respon = response.data;
        console.log(this.respon)

      } catch (error) {
        console.error('Password reset failed:', error);
      }
    },
  },
};
</script>

