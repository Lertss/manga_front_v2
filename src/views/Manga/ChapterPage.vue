<template>


  <div
      v-for="page in chapter.pages"
      :key="page.id"
      class="d-flex justify-content-center"
  >
    <img :src="page.get_image" alt="Gallery Image" class="img-fluid col-lg-7 col-12">
  </div>

  <div class="d-flex justify-content-center">
    <ChapterComentComponent />
  </div>
</template>



<script>
import api from "@/components/script/inter";
import ChapterComentComponent from "@/components/Manga/ChapterComentComponent.vue";
export default {
  name: 'ChapterPage',
  components: {
    ChapterComentComponent
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
      const mangaSlug = this.$route.params.slug
      const chapterSlug = this.$route.params.slugtwo
      await api
            .get(`/api/v1/${mangaSlug}/${chapterSlug}`)
            .then(response => {
              this.chapter = response.data
              console.log("this.chapter", this.chapter)
              document.title = this.chapter.title + ' | Chapter'
            })
          .catch((error) => {
            if (error.response.status === 404) {
              this.$router.push('/error');
            } else {
              this.$router.push('/errorserver');
            }
          })
    }
  }
}
</script>

