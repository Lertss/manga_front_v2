<template>
  <main class="container" style="width: 90%;">
    <div class="row g-5 mt-3">
      <div class="col-md-4">
        <div class="position-sticky">
          <div class="mb-3 bg-light image-user mx-auto d-block">
            <img class="rounded-3" :src="manga.get_avatar" style="height: 100%; width: 100%" alt="avatar">
          </div>
          <div v-if="isUserAuthenticated">
            <MangaListMangaPage />
          </div>
          <div class="p-4 ms-5">
            <div >
              <h3 class="border-bottom border-warning">{{ manga.name_manga }}</h3>
              <p class="fst-italic border-bottom border-warning mb-4"><em>{{ manga.name_original }}</em></p>
            </div>
            <h4 class="fst-italic text-center">Information</h4>
            <ol class="list-unstyled mb-0">
              <li>
                <h6>Author</h6>
                <p>
                  <em class="text-dark figure-caption border-bottom border-warning">
                    {{
                      manga.author && manga.author[0] && manga.author[0].last_name
                          ? manga.author[0].last_name + ' ' + manga.author[0].first_name
                          : 'Not specified'
                    }}
                  </em>
                </p>
              </li>
              <li>
                <h6>Country</h6>
                <p>
                  <em class="text-dark figure-caption border-bottom border-warning">
                    {{
                      manga.counts && manga.counts[0] && manga.counts[0].counts
                          ? manga.counts[0].counts
                          : 'Not specified'
                    }}
                  </em>
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div class="col-md-7 m-3 pt-5 ">
        <div class="p-2 border border-warning text-dark bg-opacity-50 components-user rounded-3">
          <button class="btn btn-warning m-1" @click="showComponent(1)">Description</button>
          <button class="btn btn-warning m-1" @click="showComponent(2)">Chapters</button>
          <button class="btn btn-warning m-1" @click="showComponent(3)">Comments</button>
          <div class="float-end btn-group" role="group">
            <Rating :average_rating="manga.average_rating"/>
            <router-link to="manga/update" class="btn btn-outline-secondary"><i class="bi bi-gear"></i></router-link>
          </div>
            <div>
            <div>
              <component1 v-if="currentComponent === 'Component1'" :manga="manga" />
              <component2 v-else-if="currentComponent === 'Component2'" :manga="manga" />
              <component3 v-else />
            </div>
          </div>
        </div>


        <div style="display: flex; justify-content: center; align-items: center;" class="mt-5">
          <h3 style="margin-right: 10px;">We also recommend reading</h3>
          <RandomFour />
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import Component1 from '@/components/Manga/RewiewMangaPage.vue';
import Component2 from '@/components/Manga/ChapterMangaPage.vue';
import Component3 from '@/components/Manga/CommentsMangaPage.vue';
import api from "@/components/kt/inter";
import {VueCookieNext} from "vue-cookie-next";
import Rating from "@/components/Manga/Rating.vue";
import RandomFour from "@/components/Manga/RandomFour.vue";
import MangaListMangaPage from "@/components/Manga/MangaListMangaPage.vue";

export default {
  components: {
    MangaListMangaPage,
    RandomFour,
    Rating,
    Component1,
    Component2,
    Component3,
  },
  data() {
    return {
      currentComponent: 'Component1', // По замовчуванню відображаємо Component1
      manga: [],
      rating: '',
    };
  },
  mounted() {
    this.getManga()
  },
  computed:{
    isUserAuthenticated() {
      // Проверяем наличие токена авторизации
      return VueCookieNext.getCookie('accessToken') !== null;
    },
  },

  methods: {
    showComponent(componentNumber) {
      if (componentNumber === 1) {
        this.currentComponent = 'Component1';
      } else if (componentNumber === 2) {
        this.currentComponent = 'Component2';
      } else if (componentNumber === 3) {
        this.currentComponent = 'Component3';
      }
    },
    async getManga() {
      const mangaSlug = this.$route.params.slug
      await api
          .get(`/api/v1/${mangaSlug}/`)
          .then(response => {
            this.manga = response.data
            console.log(this.manga)
            document.title = this.manga.name_manga + ' | Manga'
        })
    },
    async submitRating() {
      try {
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug
        const response = await api.post('/commn/manga-ratings/', {
          manga_slug: mangaSlug,
          rating: this.rating
        },
        {headers});

        console.log('The score was successfully added:', response.data);
      } catch (error) {
        console.error('Error when adding a score:', error);
      }
    }
  },
};
</script>

<style>
.image-user{
  width:250px;
  height: 350px;
}
.components-user{
  background: #fafafa;
}
</style>
