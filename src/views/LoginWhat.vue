<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Log In</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="formData.username" type="text" class="form-control" id="username" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="formData.password" type="password" class="form-control" id="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Log In</button>
            </form>
          </div>
        </div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">

        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Reset password</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="reset">
                  <div class="mb-3">
                    <label for="username" class="form-label">Email</label>
                    <input v-model="formDatareset.email" type="text" class="form-control" id="email" required>
                  </div>

                  <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Sent</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCookieNext } from 'vue-cookie-next';
import api from "@/components/kt/inter";
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      formDatareset: {
        email: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/dj-rest-auth/login/', this.formData);
        const {access, refresh, user} = response.data;

        // Зберігаємо токен в куці
        VueCookieNext.setCookie('accessToken', access, '2m'); // Наприклад, зберігаємо на 7 днів
        VueCookieNext.setCookie('refreshToken', refresh, '30d')
        localStorage.setItem('isLoggedIn', 'true');
        // Зберегти інформацію про користувача, якщо необхідно
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/log-in';


      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  }
};
</script>
