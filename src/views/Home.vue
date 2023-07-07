<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <h2 class="is-size-2 has-text-centered">Latest Mangas</h2>
    </div>

    <manga-box :latest-mangas="latestMangas"></manga-box>
  </div>
</template>

<script>
import axios from 'axios'
import MangaBox from "@/components/MangaBox.vue";

export default {
  name: 'Home',
  data() {
    return {
      latestMangas: []
    }
  },
  components: {
    MangaBox
  },
  mounted() {
    this.getLatestMangas()
    document.title = 'Home | Manga'
  },
  methods: {
    async getLatestMangas() {
      try {
        const response = await axios.get('/api/v1/home/')
        this.latestMangas = response.data[0]
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>