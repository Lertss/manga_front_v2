<template>
  <h1 style=" margin: 3%;">Random Manga</h1>
  <div v-if="randomManga.length >= 2" class="row mb-2">
    <div class="col-md-6 d-flex">
      <div class="row g-0 border rounded overflow-hidden flex-md-row flex-fill mb-4 shadow-sm h-md-300 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <router-link v-if="randomManga[0] && randomManga[0].url" :to="randomManga[0].url" class="no-underline">          <strong class="d-inline-block mb-2 text-primary">{{ randomManga[0].category_title }}</strong>
          <h3 class="mb-0">{{ randomManga[0].name_manga }}</h3>
          <p class="card-text mb-auto">{{ truncateText(randomManga[0].review, 100)  }}</p>
          </router-link>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img class="bd-placeholder-img" :src="randomManga[0].thumbnail" alt="Thumbnail" width="200" height="250" role="img" aria-label="Placeholder: Thumbnail" style="object-fit: cover;" focusable="false">
        </div>
      </div>
    </div>
    <div class="col-md-6 d-flex">
      <div class="row g-0 border rounded overflow-hidden flex-md-row flex-fill mb-4 shadow-sm h-md-300 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <router-link v-if="randomManga[1] && randomManga[1].url" :to="randomManga[1].url" class="no-underline">          <strong class="d-inline-block mb-2 text-success">{{ randomManga[1].category_title }}</strong>
          <h3 class="mb-0">{{ randomManga[1].name_manga }}</h3>
          <p class="mb-auto">{{ truncateText(randomManga[1].review, 100) }}</p>
          </router-link>
            </div>
        <div class="col-auto d-none d-lg-block">
          <img class="bd-placeholder-img" :src="randomManga[1].thumbnail" alt="Thumbnail" width="200" height="250" role="img" aria-label="Placeholder: Thumbnail" style="object-fit: cover;" focusable="false">
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import api from "@/components/script/inter";

export default {
  name: 'RandomTwo',
  data() {
    return {
      randomManga: []
    }
  },
  mounted() {
    this.getLatestMangas()
  },
  methods: {
    async getLatestMangas() {
      try {
        const response = await api.get('/api/v1/random-manga/')
        this.randomManga = response.data

      } catch (error) {
        console.log(error)
      }
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "..."
      }
      return text
    }
  }
}
</script>

<style>
.no-underline {
  text-decoration: none;
  color: inherit;

}
</style>