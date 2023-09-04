<template>
  <main class="container">
    <div class="row g-5 mt-3" >
      <div class="col-md-4">
        <div class="position-sticky">
          <div class="mb-3 bg-light rounded">
            <img class="img-fluid" :src="manga.get_avatar" alt="avatar">
          </div>
          <div class="p-4">
            <h4 class="fst-italic text-center">Information</h4>
            <ol class="list-unstyled mb-0">
              <li> <h6>Author</h6>
                  <p>
                    <em class="text-dark figure-caption">
                      {{manga.author && manga.author[0].last_name}} {{manga.author && manga.author[0].first_name}}
                    </em>
                  </p>
              </li>
              <li> <h6>Country</h6>
                  <p>
                    <em class="text-dark figure-caption">
                      {{manga.counts && manga.counts[0].counts}}
                    </em>
                  </p>
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
        <div>
        <h3 class="">
          {{manga.name_manga}}
        </h3>
        <p class="pb-4 mb-4 fst-italic">
          <em>
            {{manga.name_original}}
          </em>
        </p>
        </div>
        <Rating :average_rating="manga.average_rating"/>
        <div class="border-bottom pb-4 mb-4 fst-italic">



            <h1>Додати оцінку рейтингу</h1>
            <form @submit.prevent="submitRating">
              <label for="rating">Рейтинг:</label>
              <input v-model="rating" type="number" min="1" max="10" required>
              <br>
              <button type="submit">Відправити</button>
            </form>




        </div >

      <div class="bg-dark p-2 text-dark bg-opacity-50">
        <button @click="showComponent(1)">Кнопка 1</button>
        <button @click="showComponent(2)">Кнопка 2</button>
        <button @click="showComponent(3)">Кнопка 3</button>

        <div>
          <div>
            <component1 v-if="currentComponent === 'Component1'" :manga="manga" />
            <component2 v-else-if="currentComponent === 'Component2'" :manga="manga" />
            <component3 v-else />
          </div>
        </div>
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

export default {
  components: {
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

        console.log('Оцінка була успішно додана:', response.data);
      } catch (error) {
        console.error('Помилка при додаванні оцінки:', error);
      }
    }
  },
};
</script>
