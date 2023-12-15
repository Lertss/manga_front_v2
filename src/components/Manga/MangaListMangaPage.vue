<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      {{ selectedOption || 'Add to favorites' }}
    </button>
    <ul class="dropdown-menu">
      <li v-for="(option, index) in options" :key="index">
        <a class="dropdown-item" @click="selectOption(option)">{{ option }}</a>
      </li>
      <li v-if="statusManga && statusManga.in_list">
        <a class="dropdown-item" @click="delateStatus">Delete</a>
      </li>
    </ul>
  </div>
</template>


<script>
import api from "@/components/script/inter";
import {VueCookieNext} from "vue-cookie-next";

export default {
  name: "MangaListMangaPage",
  data() {
    return {
      selectedOption: null, // Вибрана опція
      options: ['Reading', 'I will read', 'Read', 'Abandoned', 'Postponed', 'Not interested'], // Варіанти
      statusManga: null,
    };
  },
  created() {
    const accessToken = VueCookieNext.getCookie('accessToken');
    if (accessToken) {
      this.getStatus();
    }
  },
  watch: {
    statusManga(newVal) {
      if (newVal && newVal.in_list) {
        this.selectedOption = newVal.list_name;
      } else {
        this.selectedOption = null;
      }
    }
  },
  methods: {
      selectOption(option) {
        this.selectedOption = option;
        this.postStatus(option);
      },
    async getStatus() {
      try {
        const mangaSlug = this.$route.params.slug;
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'  // Corrected content type
        };
        const response = await api.get(`/api/v1/manga_in_user_list/${mangaSlug}/`, {headers});
        this.statusManga = response.data;

      } catch (error) {
        console.log(error);
      }
    },

    async postStatus(newStatus) {
      try {
        const mangaSlug = this.$route.params.slug;
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'  // Corrected content type
        };

        const response = await api.post(`/api/v1/add-manga-list/`,{"slug": mangaSlug, "name": newStatus}, {headers});
        this.statusManga = response.data;

      } catch (error) {
        console.log(error);
      }
    },
    async delateStatus() {
      try {
        const mangaSlug = this.$route.params.slug;
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        };
        const response = await api.post(`/api/v1/remove-manga-list/`,{"slug": mangaSlug}, {headers});
        this.statusManga = response.data;

      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
