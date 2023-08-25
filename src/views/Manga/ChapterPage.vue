<template>

        <div

            v-for="gallery in chapter.galleries"
            :key="gallery.id"
            class="d-flex justify-content-center"
        >
          <img :src="gallery.get_image" alt="Gallery Image" class="img-fluid col-lg-7 col-12">
      </div>

</template>


<script>
import api from "@/components/kt/inter";
export default {
  name: 'ChapterPage',
  components: {
  },
  data() {
    return {
      chapter: []
    }
  },
  mounted() {
    this.getChapter()
  },
  methods: {
    async getChapter() {
      const chapterSlug = this.$route.fullPath
      console.log(chapterSlug)
      await api
            .get(`/api/v1/${chapterSlug}`)
            .then(response => {
              this.glaw = response.data
              document.title = this.chapter.name_original + ' | Manga'
            })
    }
  }
}
</script>

