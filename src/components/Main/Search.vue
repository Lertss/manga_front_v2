<template>
  <div>
    <input v-model="searchTerm" placeholder="Пошук за назвою манги" @input="searchManga">
    <div v-if="searchTerm">
      <div v-for="manga in mangaList" :key="manga.id">
        <a class="nav-link fst-italic border-bottom border-warning" style=" margin: 3%;" :href="manga.slug">
          <p>{{ manga.name_manga }}</p>
      </a>
      </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchTerm: '',
      mangaList: [],
    };
  },
  methods: {
    searchManga() {
      // Виконайте запит до API за допомогою Axios з актуальним значенням searchTerm
      axios.get(`/api/v1/search/?search=${this.searchTerm}`)
          .then((response) => {
            this.mangaList = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
};
</script>
