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
          <PasswordReset_Email />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCookieNext } from 'vue-cookie-next';
import PasswordReset_Email from "@/components/User/PasswordReset_Email.vue";
import axios from "axios";

export default {
  name: 'Login',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    PasswordReset_Email
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/auth/login/', this.formData);
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
  },

};
</script>
