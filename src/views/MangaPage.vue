<template>
  <main class="container">
    <div class="row g-5 mt-3" >
      <div class="col-md-4">
        <div class="position-sticky">
          <div class="mb-3 bg-light rounded">
            <img class="img-fluid" :src="manga.get_avatar">
          </div>
          <div class="p-4">
            <h4 class="fst-italic text-center">Information</h4>
            <ol class="list-unstyled mb-0">
              <li> <h6>Author</h6>
                <router-link v-if="manga.author && manga.author.length" :to="manga.author[0].get_absolute_url">
                    <p>
                      <em class="text-dark figure-caption">
                        {{manga.author && manga.author[0].last_name}} {{manga.author && manga.author[0].first_name}}
                      </em>
                    </p>
                </router-link>
              </li>

              <li> <h6>Country</h6>
                <router-link v-if="manga.counts && manga.counts.length" :to="manga.counts[0].counts">
                  <p>
                    <em class="text-dark figure-caption">
                      {{manga.counts && manga.counts[0].counts}}
                    </em>
                  </p>
                </router-link>
              </li>
            </ol>
          </div>

          <div class="p-4">
            <h4 class="fst-italic">Elsewhere</h4>
            <ol class="list-unstyled">
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ol>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <h3 class="">
          {{manga.name_manga}}
        </h3>
        <p class="border-bottom pb-4 mb-4 fst-italic">
          <em>
            {{manga.name_original}}
          </em>
        </p>
        <div>
          <p class="border-bottom pb-4 mb-4 fst-italic">
            <em>
              Description
            </em>
          </p>
          <p>{{manga.review}}</p>
        </div>


<!--        Glaws-->
        <div>
        <div class="rounded" v-for="glaws in manga.glaws" :key="glaws.id">


          <div style="display: flex; align-items: flex-start;">
            <div>
              <router-link :to="glaws.get_absolute_url">
                <h4 class="text-dark figure-caption " style="margin-top: 0;">{{glaws.title}}</h4>
              </router-link>
              <router-link to="/">
                <p>
                  <em class="text-dark figure-caption">
                    Tom 1 Chapter {{ glaws.num }}
                  </em>
                </p>
              </router-link>
            </div>
          </div>
        </div>
        </div>
<!--        Glaws end-->


      </div>
    </div>
  </main>


</template>


<script>
import axios from 'axios'

export default {
  name: 'MangaPage',
  components: {
  },
  data() {
    return {
      manga: []
    }
  },
  mounted() {
    this.getManga()
  },
  // watch: {
  //   $route(to, from) {
  //     if (to.name === 'Manga') {
  //       this.getManga()
  //     }
  //   }
  // },
  methods: {
    async getManga() {
      const mangaSlug = this.$route.params.slug
      await axios
          .get(`/api/v1/${mangaSlug}/`)
          .then(response => {
            this.manga = response.data
            document.title = this.manga.name_original + ' | Djackets'
          })

    }
  }
}
</script>