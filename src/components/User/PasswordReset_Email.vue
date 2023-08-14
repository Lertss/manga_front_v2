<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Reset Password
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
              <input v-model="email" type="text" class="form-control" id="email" required>
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
        email: '',
    };
  },
  methods: {
    async reset() {
      try {
        const response = await axios.post('/auth/password/reset/', { email: this.email });
        this.respon = response.data;
        console.log(this.respon)

      } catch (error) {
        console.error('Password reset failed:', error);
      }
    },
  }
};
</script>
