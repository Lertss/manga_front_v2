<template>
  <div id="app" class="container mt-5">
    <div v-for="(errorMessage, fieldName) in errorMessages" :key="fieldName" class="alert alert-danger alert-manga-create">

      {{ fieldName }}: {{ errorMessage }}
    </div>
    <div class="row">
      <!-- Додайте класи колонок для полів на великому екрані -->
      <div class="col-lg-6">
        <form @submit.prevent="Registr">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input v-model="formData.username" type="text" class="form-control" id="username" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" id="email" required>
            <span v-if="msg.email" class="text-danger">{{ msg.email }}</span>
          </div>
          <div class="mb-3">
            <label for="password1" class="form-label">Password</label>
            <input v-model="password1" type="password" class="form-control" id="password1" required>
            <span v-if="msg.password" class="text-danger">{{ msg.password }}</span>
          </div>
          <div class="mb-3">
            <label for="password2" class="form-label">Confirm Password</label>
            <input v-model="password2" type="password" class="form-control" id="password2" required>
            <span v-if="msg.password" class="text-danger">{{ msg.password }}</span>
          </div>
          <div class="mb-3">
            <label class="form-label">Gender</label>
            <!-- Розташовуємо радіо кнопки в колонці на великому екрані -->
            <div class="form-check">
              <input v-model="formData.gender" class="form-check-input" type="radio" name="gender" id="Male" value="Male">
              <label class="form-check-label" for="Male">
                Male
              </label>
            </div>
            <div class="form-check">
              <input v-model="formData.gender" class="form-check-input" type="radio" name="gender" id="Female" value="Female">
              <label class="form-check-label" for="Female">
                Female
              </label>
            </div>

            <div class="form-check">
              <input v-model="formData.gender" class="form-check-input" type="radio" name="gender" id="Not Specified" value="Not Specified">
              <label class="form-check-label " for="Not Specified">
                Not Specified
              </label>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input v-model="formData.adult" class="form-check-input" type="checkbox" id="adult">
              <label class="form-check-label" for="adult">
                I am an adult
              </label>
            </div>
          </div>
          <div class="mb-3">
            <label for="avatar" class="form-label">Avatar</label>
            <input class="form-control" type="file" @change="onFileChange" required/>
          </div>
          <button type="submit" class="btn btn-warning">Submit</button>
        </form>
      </div>
      <!-- Додайте класи колонок для зображення на великому екрані та ховаємо на маленькому екрані -->
      <div class="col-lg-6 d-none d-lg-block text-center"> <!-- Додайте клас text-center для центрування -->
        <img src="../../assets/Pages/Anime_Pastel_Dream_anime_landscape_0.jpg" class="mx-auto rounded-3 img-setups"  alt=""/> <!-- Додайте клас mx-auto для центрування зображення -->
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      formDataImage: null,
      email:'',
      msg: { email: '', password: '' },
      disabled: [true, true],
      password1: '',
      password2: '',
      errorMessages: {},
      formData: {
        username: '',
        gender: '',
        adult: false,
        avatar: null,
      },
    };
  },
  watch: {
    email(value) {
      this.validateEmail(value);
    },
    password1(value) {
      this.validatePassword(value);
    },
    password2(value) {
      this.validatePassword(value);
    },
  },
  methods: {
    async Registr() {
      // Validate username
      if (this.formData.username.length< 3) {
        alert('Username must be at least 3 characters long');
        return;
      }

      if (this.password1 !==this.password2) {
        alert('Passwords do not match');
        return;
      }

      // Validate gender
      if (!this.formData.gender) {
        alert('Please select a gender');
        return;
      }

      try {
        const formData=new FormData();
        formData.append('username', this.formData.username);
        formData.append('email', this.email);
        formData.append('password1', this.password1);
        formData.append('password2', this.password2);
        formData.append('gender', this.formData.gender);
        formData.append('adult', this.formData.adult);
        formData.append('avatar', this.formData.avatar);

        const response =await axios.post('/auth/registration/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error('Error sending data:', error);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          this.errorMessages = {};
          if (errorData.email) {
            this.errorMessages.email = errorData.email.join(', ');
          }
          if (errorData.username) {
            this.errorMessages.username = errorData.username.join(', ');
          }
        }
      }
    },
    onFileChange(e) {
      this.formData.avatar =e.target.files[0];
    },

    validateEmail(value) {
      // Додайте перевірку валідності електронної адреси
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg.email = '';
        this.disabled = [false, this.disabled[1]];
      } else {
        this.msg.email = 'Invalid Email Address';
        this.disabled = [true, this.disabled[1]];
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
.img-setups{
  width: 75%;
  height: 85%
}
</style>