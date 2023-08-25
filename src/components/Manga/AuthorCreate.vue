<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Create new Author
  </button>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Enter your first and last name</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createAuthors">
            <div class="mb-3">
              <label for="username" class="form-label">First Name</label>
              <input v-model="first_name" type="text" class="form-control" id="first_name" required>
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Last Name</label>
              <input v-model="last_name" type="text" class="form-control" id="last_name" required>
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
import api from "@/components/kt/inter";
import {VueCookieNext} from "vue-cookie-next";

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      respon: null
    };
  },
  methods: {
    async createAuthors() {
      const accessToken = VueCookieNext.getCookie('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
      };

      try {
        const response = await api.post('/api/v1/authors/', {
          first_name: this.first_name,
          last_name: this.last_name
        }, {headers});
        this.respon = response.data;
        console.log(this.respon);

        window.location.reload()
      } catch (error) {
        console.error('Помилка при створенні автора:', error);
      }
    },
  }
};
</script>
