<template>
  <div>
    <label for="filterButtons">Filter Manga:</label>
    <div id="filterButtons">
      <button class="btn btn-outline-warning m-2" v-for="filter in filters" @click="currentFilter = filter">{{ filter }}</button>
    </div>
    <div style="margin-top: 5%">
      <div class="container">
        <div class="row align-items-stretch">
          <div class="col-lg-2 col-md-3 col-sm-3 col-4" v-for="manga in filteredManga" :key="manga.id">
            <router-link :to="manga.manga.url">

            <div class="card h-100 image-container">
              <img :src="manga.manga.thumbnail" class="card-img-top responsive-img" alt="manga Image">
              <div class="card-body image-overlay">
                <p class="overlay-text  line-clamp"><em>{{ manga.manga.name_manga }}</em></p>
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
export default {
  props: {
    mangas: Object, // Pass the Profile object as a prop to access it
  },
  data() {
    return {
      currentFilter: "All",
      filters: ['All', 'Reading', 'I will read', 'Read', 'Abandoned', 'Postponed', 'Not interested'],
    };
  },
  computed: {
    filteredManga() {
      if (this.mangas && this.mangas) {
        if (this.currentFilter === "All") {
          return this.mangas;
        } else {
          return this.mangas.filter((manga) => manga.name === this.currentFilter);
        }
      } else {
        return [];
      }
    },
  },
};
</script>

<style>
@media {
  #filterButtons {
    overflow-x: auto;
    white-space: nowrap;
  }
}


  .responsive-img {
    width: 100%;
    height: auto;
  }


</style>