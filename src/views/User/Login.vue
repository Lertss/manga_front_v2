<template>
  <div class="container mt-5">
    <div v-for="(errorMessage, fieldName) in errorMessages" :key="fieldName" class="alert alert-danger alert-manga-create">

      {{ fieldName }}: {{ errorMessage }}
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Log In</div>
          <div class="card-body">
            <form @submit.prevent="login" class="d-md-block">
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

      <div class="col-md-6 d-none d-md-block text-center">
        <div>
          <img src="../../assets/Pages/Anime_Pastel_Dream_anime_landscape_1.jpg" class="mx-auto rounded-3 img-setupl" alt=""/>
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
      errorMessages: {},
    };
  },
  components: {
    PasswordReset_Email
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/auth/login/', this.formData);
        const {access, refresh} = response.data;

        // Зберігаємо токен в куці
        VueCookieNext.setCookie('accessToken', access); // Наприклад, зберігаємо на 7 днів
        VueCookieNext.setCookie('refreshToken', refresh)
        localStorage.setItem('isLoggedIn', 'true');
        // Зберегти інформацію про користувача, якщо необхідно
        window.location.href = '/log-in';


      } catch (error) {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          this.errorMessages = {};
          if (errorData.non_field_errors) {
            this.errorMessages.Error = errorData.non_field_errors.join(', ');
          }
        }
      }
    },
  },

};
</script>


<style>
.img-setupl{
  width: 63%;
  height: 83%
}
</style>