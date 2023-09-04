<template>
  <div id="visa">
    <h1 class="display-4">Create a New Vue Account</h1>
    <form @submit.prevent="handleSubmission">
      <div class="mb-3">
        <label for="fullName" class="form-label">Full Name:</label>
        <input type="text" class="form-control" id="fullName" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email Address:</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
        <span v-if="msg.email" class="text-danger">{{ msg.email }}</span>

      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
        <span v-if="msg.password" class="text-danger">{{ msg.password }}</span>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!disabled.every(i => i === false)">Create Account</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      name: '',
      password: '',
      email: '',
      msg: { email: '', password: '' },
      disabled: [true, true],
    };
  },
  watch: {
    email(value) {
      this.validateEmail(value);
    },
    password(value) {
      this.validatePassword(value);
    },
  },
  methods: {
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
