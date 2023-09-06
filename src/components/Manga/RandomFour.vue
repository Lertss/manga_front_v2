<template>

  <div class="col-8" style="display: flex; justify-content: center;">
    <div class="row justify-content-around">
      <div
          class="col-lg-4 col-md-4 col-sm-5 col-4"
          v-for="(manga, index) in mangaList"
          :key="index"
          style="margin-top: 5px"
      >
        <router-link :to="manga.url">
          <div class="card h-100 image-container" style="max-height: 300px;">
            <img
                :src="manga.thumbnail"
                class="card-img-top"
                alt="manga Image"
                style="width: 100%;"
            >
            <div class="card-body image-overlay">
              <p class="overlay-text  line-clamp">
                <em>{{ manga.name_manga }}</em>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>




<script>
import api from "@/components/kt/inter";

export default {
  name: 'RandomFour',
  data() {
    return {
      mangaList: []
    }
  },
  mounted() {
    this.getLatestMangas()
  },
  methods: {
    async getLatestMangas() {
      try {
        const response = await api.get('/api/v1/random-manga/')
        this.mangaList = response.data
        console.log(this.mangaList)
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