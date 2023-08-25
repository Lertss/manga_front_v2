<template>
  <div>
    <div>
      <h1>Genres</h1>
      <div v-for="(genre, index) in dataFilter.genres" :key="index">
        <input
            type="checkbox"
            :id="genre.genr_name"
            :value="genre.id"
            v-model="selectedDataFilter.genres"
        />
        <label :for="genre.genr_name">{{ genre.genr_name }}</label>
      </div>
    </div>
    <div>
      <h1>Tag</h1>
      <div v-for="(tag, index) in dataFilter.tags" :key="index">
        <input
            type="checkbox"
            :id="tag.tag_name"
            :value="tag.id"
            v-model="selectedDataFilter.tags"
        />
        <label :for="tag.tag_name">{{ tag.tag_name }}</label>
      </div>
    </div>
    <div>
      <h1>Country</h1>
      <div v-for="(country, index) in dataFilter.countries" :key="index">
        <input
            type="checkbox"
            :id="country.counts"
            :value="country.id"
            v-model="selectedDataFilter.countries"
        />
        <label :for="country.counts">{{ country.counts }}</label>
      </div>
    </div>
    <div>
      <h1>Authors</h1>
      <div v-for="(author, index) in dataFilter.authors" :key="index">
        <input
            type="checkbox"
            :id="author.last_name + author.first_name"
            :value="author.id"
            v-model="selectedDataFilter.authors"
        />
        <label :for="author.last_name + author.first_name">{{ author.first_name }} {{ author.last_name }}</label>
      </div>
    </div>
  </div>
</template>


<script>
import api from "@/components/kt/inter";

export default {
  data() {
    return {
      dataFilter: { authors: [], countries: [], genres: [], tags: [] },
      selectedDataFilter: { authors: [], countries: [], genres: [], tags: [] },
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
        console.log("datafilter", this.dataFilter)
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