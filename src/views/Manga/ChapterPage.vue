<template>

        <div

            v-for="gallery in glaw.galleries"
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
      glaw: []
    }
  },
  mounted() {
    this.getGlaw()
  },
  methods: {
    async getGlaw() {
      const glawaSlug = this.$route.fullPath
      console.log(glawaSlug)
      await api
                  .get(`/api/v1${glawaSlug}`)
                  .then(response => {
                    this.glaw = response.data
                    document.title = this.glaw.name_original + ' | Djackets'
                  })
    }
  }
}
</script>

