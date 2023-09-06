<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-3">
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
                <div v-for="(category, index) in dataFilter.categories" class="btn-container" :key="index">
                  <input
                      type="checkbox"
                      :id="category.cat_name"
                      :value="category.cat_name"
                      v-model="selectedDataFilter.categories"
                      @change="getMangaList"
                      class="btn-check"
                  />
                  <label :for="category.cat_name" class="btn btn-outline-warning">{{ category.cat_name }}</label>
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
                <div v-for="(genre, index) in dataFilter.genres" class="btn-container" :key="index">
                  <input
                      type="checkbox"
                      :id="genre.genr_name"
                      :value="genre.genr_name"
                      v-model="selectedDataFilter.genres"
                      @change="getMangaList"
                      class="btn-check"
                      :autocomplete="'off'"
                  />
                  <label :for="genre.genr_name" class="btn  btn-outline-warning">{{ genre.genr_name }}</label>
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

                <div v-for="(tag, index) in dataFilter.tags" class="btn-container" :key="index">
                  <input
                      type="checkbox"
                      :id="tag.tag_name"
                      :value="tag.tag_name"
                      v-model="selectedDataFilter.tags"
                      @change="getMangaList"
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

                <div v-for="(country, index) in dataFilter.countries" class="btn-container" :key="index">
                  <input
                      type="checkbox"
                      :id="country.counts"
                      :value="country.counts"
                      v-model="selectedDataFilter.countries"
                      @change="getMangaList"
                      class="btn-check"
                      :autocomplete="'off'"
                  />
                  <label :for="country.counts"  class="btn  btn-outline-warning">{{ country.counts }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- Decency -->
        <div>
          <label>Decency:</label>
          <select v-model="selectedDecency" @change="getMangaList">
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>


        <div class="accordion" id="accordionExample">
          <div v-for="(param, paramIndex) in Object.keys(dataFilter)" :key="paramIndex">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapseTwo' + paramIndex" aria-expanded="false" :aria-controls="'panelsStayOpen-collapseTwo' + paramIndex">
                  <label>Exclude {{ param }}:</label><br />
                </button>
              </h2>
              <div :id="'panelsStayOpen-collapseTwo' + paramIndex" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <div v-for="(value, valueIndex) in dataFilter[param]" :key="value.id" class="btn-container">
                    <input type="checkbox"
                           :id="'checkbox_' + param + '_' + paramIndex + '_' + (value.counts || value.genr_name || value.tag_name || value.cat_name)"
                           :value="value.counts || value.genr_name || value.tag_name || value.cat_name"
                           v-model="excluded[param]"
                           @change="getMangaList"
                           class="btn-check"
                    />
                    <label :for="'checkbox_' + param + '_' + paramIndex + '_' + (value.counts || value.genr_name || value.tag_name || value.cat_name)" class="btn btn-outline-danger">{{ value.counts || value.genr_name || value.tag_name || value.cat_name }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




        <!-- Min Rating -->
        <div>
          <label>Minimum Rating:</label><br />
          <input type="number" min="0" max="5" step=".5" v-model.number="minRating" @change="getMangaList" />
        </div>
      </div>

      <!-- Manga List -->
      <div class="col-8">
        <div class="row justify-content-around">
          <div
              class="col-lg-2 col-md-3 col-sm-3 col-4"
              v-for="(manga, index) in mangaList"
              :key="index"
              style="margin-top: 5px"
          >
            <router-link :to="manga.get_absolute_url">
              <div class="card h-100 image-container" style="max-height: 300px;">
                <img
                    :src="manga.get_avatar"
                    class="card-img-top"
                    alt="manga Image"
                    style="width: 100%; height: 200px;"
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

    </div>
  </div>
</template>


<script>
import axios from 'axios';
import ChildComponent from "@/components/Manga/Filter.vue";
import api from "@/components/kt/inter";


export default {
  name: 'MangaList',
  components: {ChildComponent},

  data() {
    return {
      selectedDataFilter: { authors: [], countries: [], genres: [], tags: [], categories: [] },

      selectedGenres: [],
      selectedTags: [],
      selectedCategory: '',
      selectedCountries: [],
      selectedDecency: '',
      excluded: {
        genres: [],
        tags: [],
        categories: [],
        countries: []
      },
      minRating: 0,
      mangaList: [],
      dataFilter:[]
    }
  },
  created() {
    this.getDataFilter(); // Виклик функції при створенні компонента
  },
  methods: {
    async getDataFilter() {
      try {
        const response = await api.get("/api/v1/all-data/");
        this.dataFilter = response.data;
        delete this.dataFilter.authors;
      } catch (error) {
        // Обробка помилок
      }
    },
    getMangaList() {
      let params = new URLSearchParams();

      for (let genre of this.selectedDataFilter.genres) {
        params.append('genres', genre);
      }

      for (let tag of this.selectedDataFilter.tags) {
        params.append('tags', tag);
      }

      for (let category of this.selectedDataFilter.categories) {
        params.append('category', category);

      }

      for (let country of this.selectedDataFilter.countries) {
        params.append('counts', country);
      }

      if (this.selectedDecency) {
        params.append('decency', this.selectedDecency);
      }
      for (let [param, values] of Object.entries(this.excluded)) {
        try {
          for (let value of values) {
            params.append('exclude_' + param, value);
          }
        }
        catch (error){
          console.log(error)}
      }
      if (this.minRating > 0) {
        params.append('min_rating', this.minRating);
      }

      axios.get(`api/v1/allManga/?${params.toString()}`)
          .then(response => {
            this.mangaList = response.data;
          });
    }

  },
  mounted() {
    this.getMangaList();
  }
}
</script>

<style>
.btn-container {
  margin: 5px; /* Задайте бажаний відступ між кнопками */
}
table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}
.image-container {
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 2)); /* Градієнт затемнення */
  display: flex;
  align-items: center; /* Вирівнювання тексту по вертикалі */
}

.overlay-text {
  color: white; /* Колір тексту */
  text-align: center; /* Вирівнювання тексту по центру */
  box-sizing: border-box;
  margin: 0;
  padding: 5px; /* Відступи від тексту */
  width: 100%; /* Ширина тексту по ширині контейнера */
}
</style>

