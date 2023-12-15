<template>
  <div class="p-4">
    <h4 class="fst-italic">Welcome new users</h4>
    <ol class="list-unstyled mb-0">
      <li v-for="user in lastUser" :key="user.slug" style="margin: 2%">
        <router-link :to="'/account/' + user.slug + '/'" class="link-unstyled">
          <div style="display: flex; align-items: center;">
            <img :src="user.get_avatar" height="100" width="100" alt="Avatar">
            <p style="margin-left: 10px;">{{ user.username }}</p>
          </div>
        </router-link>
      </li>
    </ol>
  </div>
</template>

<style>
.link-unstyled {
  text-decoration: none;
  color: inherit;
}
</style>



<script>
import api from "@/components/script/inter";
export default {
  name: 'NewUserMainPage',
  data() {
    return {
      lastUser: []
    }
  },
  mounted() {
    this.getLatestMangas()
  },
  methods: {
    async getLatestMangas() {
      try {
        const response = await api.get('/auth/last-users/')
        this.lastUser = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>