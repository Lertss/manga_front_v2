<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <div v-if="errorMessages" class="alert alert-danger alert-manga-create">

          {{ this.errorMessages }}
        </div>
        <div v-if="Messages" class="alert alert-success alert-manga-create">

          {{ this.Messages.detail }}
        </div>
        <form @submit.prevent="resetPassword">
          <div>
          <label>New password:</label>
          <input type="password" class="form-control" v-model="newPassword1" required>
          <span v-if="msg.password" class="text-danger form-label">{{ msg.password }}</span>

          <label class="mt-2">Confirm new password:</label>
          <input type="password" class="form-control" v-model="newPassword2" required>
          <span v-if="msg.password" class="text-danger form-label">{{ msg.password }}</span>
          </div>
          <button type="submit" class="btn btn-warning mt-3">Reset password</button>
        </form>
      </div>

      <!-- Display only on small screens -->
      <div class="col-lg-6 d-lg-block d-none text-center">
        <img src="../../assets/Pages/Anime_Pastel_Dream_anime_landscape_2.jpg" class="mx-auto rounded-3 img-setupr" alt=""/>
      </div>
    </div>
  </div>
</template>


<script>
import api from "@/components/kt/inter";

export default {
  data() {
    return {
      uid: null,
      token: null,
      newPassword1: '',
      newPassword2: '',
      passwordError: '',
      errorMessages: '',
      msg: {password: '' },
      disabled: [true, true],
      Messages: '',
    };
  },
  watch: {
    newPassword1(value) {
      this.validatePassword(value);
    },
    newPassword2(value) {
      this.validatePassword(value);
    },
  },
  mounted() {
    // Extract uid and token from URL
    const urlParts = window.location.pathname.split('/');
    const tokenIndex = urlParts.indexOf('password') + 4;
    this.uid = urlParts[tokenIndex - 1];
    this.token = urlParts[tokenIndex];
  },
  methods: {
    async resetPassword() {

      this.passwordError = '';

      if (this.newPassword1 !== this.newPassword2) {
        this.passwordError = 'Паролі не співпадають';
        return;
      }
      const data = {
        uid: this.uid,
        token: this.token,
        new_password1: this.newPassword1,
        new_password2: this.newPassword2,
      };
      try {
        const response = await api.post(`auth/password/reset/confirm/${this.uid}/${this.token}/`, data);
        this.respon = response.data;
        this.Messages = response.data;
        // Redirect to login page or display a success message
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessages = "Password reset failed";
        }
        // Display an error message
      }
    },
    validatePassword(value) {
      let difference = 8 - value.length;
      // Додайте перевірку на складність пароля
      if (value.length < 8) {
        this.msg.password = `Must be at least 8 characters! ${difference} characters left`;
        this.disabled = [this.disabled[0], true];
      } else if (!/[A-Z]/.test(value)) {
        this.msg.password = 'Password must contain at least one uppercase letter';
        this.disabled = [this.disabled[0], true];
      } else if (!/[a-z]/.test(value)) {
        this.msg.password = 'Password must contain at least one lowercase letter';
        this.disabled = [this.disabled[0], true];
      } else if (!/\d/.test(value)) {
        this.msg.password = 'Password must contain at least one digit';
        this.disabled = [this.disabled[0], true];
      } else if (!/[\W_]/.test(value)) {
        this.msg.password = 'Password must contain at least one special character';
        this.disabled = [this.disabled[0], true];
      } else {
        this.msg.password = '';
        this.disabled = [this.disabled[0], false];
      }
    },
    handleSubmission() {
      alert(`Email: ${this.email} Password: ${this.password}`);
    },
  },
};
</script>


<style>
.img-setupr{
  width: 75%;
  height: 85%
}
</style>