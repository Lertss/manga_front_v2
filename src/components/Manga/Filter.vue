<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Categories
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <!-- Список категорій тут -->
          <div v-for="(category, index) in dataFilter.categories" class="btn-warning-container" :key="index">
            <input
                type="radio"
                :id="category.category_name"
                :value="category.id"
                v-model="selectedDataFilter.categories"
                class="btn-check"
            />
            <label :for="category.category_name" class="btn btn-outline-warning">{{ category.category_name }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Genres
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse scrolling-accordion" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <!-- Список жанрів тут -->
          <div v-for="(genre, index) in dataFilter.genres" class="btn-warning-container" :key="index">
            <input
                type="checkbox"
                :id="genre.genre_name"
                :value="genre.id"
                v-model="selectedDataFilter.genres"
                class="btn-check"
                :autocomplete="'off'"
            />
            <label :for="genre.genre_name" class="btn  btn-outline-warning">{{ genre.genre_name }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Tags
          </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse scrolling-accordion" data-bs-parent="#accordionExample">
        <div class="accordion-body">

      <div v-for="(tag, index) in dataFilter.tags" class="btn-warning-container" :key="index">
        <input
            type="checkbox"
            :id="tag.tag_name"
            :value="tag.id"
            v-model="selectedDataFilter.tags"
            class="btn-check"
            :autocomplete="'off'"
        />
        <label :for="tag.tag_name"  class="btn  btn-outline-warning">{{ tag.tag_name }}</label>
      </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Countries
        </button>
      </h2>
      <div id="collapseFour" class="accordion-collapse collapse scrolling-accordion" data-bs-parent="#accordionExample">
        <div class="accordion-body">

      <div v-for="(country, index) in dataFilter.countries" class="btn-warning-container" :key="index">
        <input
            type="checkbox"
            :id="country.country_name"
            :value="country.id"
            v-model="selectedDataFilter.countries"
            class="btn-check"
            :autocomplete="'off'"
        />
        <label :for="country.country_name"  class="btn  btn-outline-warning">{{ country.country_name }}</label>
      </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            Authors
          </button>
        </h2>
        <div id="collapseFive" class="accordion-collapse collapse scrolling-accordion" data-bs-parent="#accordionExample">
          <div class="accordion-body">

      <div v-for="(author, index) in dataFilter.authors" class="btn-warning-container" :key="index">
        <input
            type="checkbox"
            :id="author.last_name + author.first_name"
            :value="author.id"
            v-model="selectedDataFilter.authors"
            class="btn-check tr"
            :autocomplete="'off'"
        />
        <label :for="author.last_name + author.first_name"  class="btn  btn-outline-warning">{{ author.first_name }} {{ author.last_name }}</label>
      </div>

          </div>
        </div>
      </div>
    </div>
</template>


<script>
import api from "@/components/script/inter";
import AuthorCreate from "@/components/Manga/AuthorCreate.vue";

export default {
  components: {AuthorCreate},
  data() {
    return {
      dataFilter: { authors: [], countries: [], genres: [], tags: [], categories: []},
      selectedDataFilter: { authors: [], countries: [], genres: [], tags: [], categories: [] },
    };
  },
  created() {
    this.getDataFilter(); // Виклик функції при створенні компонента
  },
  methods: {
    async getDataFilter() {
      try {
        const response = await api.get("/api/v1/all-data/");
        this.dataFilter = response.data;
      } catch (error) {
        // Обробка помилок
      }
    },
  },
  watch: {
    selectedDataFilter: {
      handler(newSelectedData) {
        this.$emit("update:selectedDataFilter", newSelectedData);
      },
      deep: true,
    },
  },
};
</script>

<style>
.btn-warning-container {
  margin: 5px; /* Задайте бажаний відступ між кнопками */
}

   /* Стиль для контейнера акордеону "Country" */
 .scrolling-accordion {
   max-height: 300px; /* Встановіть бажану максимальну висоту контейнера */
   overflow-y: scroll; /* Включіть прокрутку по вертикалі */
 }
</style>
