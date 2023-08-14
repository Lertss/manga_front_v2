<template>
<div id="app" class="container mt-5">

<form @submit.prevent="Registr">
  <div class="mb-3">
    <label for="username" class="form-label">Username</label>
    <input v-model="formData.username" type="text" class="form-control" id="username" required>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input v-model="formData.email" type="email" class="form-control" id="email" required>
  </div>
  <div class="mb-3">
    <label for="password1" class="form-label">Password</label>
    <input v-model="formData.password1" type="password" class="form-control" id="password1" required>
  </div>
  <div class="mb-3">
    <label for="password2" class="form-label">Confirm Password</label>
    <input v-model="formData.password2" type="password" class="form-control" id="password2" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Gender</label>
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
    <label class="form-check-label" for="Not Specified">
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
    <input type="file" @change="onFileChange" />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</template>


<script>
import axios from "axios";

export default {
  name: 'Registration',
  data() {
    return {
      formDataImage: null,
      formData: {
        username: "",
        email: "",
        password1: "",
        password2: "",
        gender: "",
        adult: "false",
        avatar: null
      }
    }
  },
  methods: {
    async Registr() {

        try {
          const formData = new FormData();
          formData.append('username', this.formData.username);
          formData.append('email', this.formData.email);
          formData.append('password1', this.formData.password1);
          formData.append('password2', this.formData.password2);
          formData.append('gender', this.formData.gender);
          formData.append('adult', this.formData.adult);
          formData.append('avatar', this.formData.avatar);

          const response = await axios.post('/auth/registration/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Server response:', response.data);
          // Додайте дії, які ви хочете виконати після успішної відправки
        } catch (error) {
          console.error('Error sending data:', error);
          // Додайте дії, які ви хочете виконати в разі помилки
        }


    },
    onFileChange(e) {
      this.formData.avatar = e.target.files[0];
    }
  }
}
</script>
