<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <h1>Category</h1>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="Manga" value="1" v-model="this.formData.category">
          <label class="form-check-label" for="Manga">
            Manga
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" value="2" v-model="this.formData.category" id="Other" checked>
          <label class="form-check-label" for="Other">
            Other
          </label>
        </div>
      </div>
      <div class="mb-3">
        <h1>Name manga</h1>
        <input type="text" class="form-control" id="FormControlInput1" placeholder="Name manga" v-model="this.formData.name_manga">
        <label for="FormControlInput1" class="form-label"/>
      </div>

      <div class="mb-3">
        <h1>Name original</h1>
        <input type="text" class="form-control" id="FormControlInput2" placeholder="Name original" v-model="this.formData.name_original">
        <label for="FormControlInput2" class="form-label"/>
      </div>

      <div class="mb-3">
        <h1>Name english</h1>
        <input type="text" class="form-control" id="FormControlInput3" placeholder="English only field" v-model="this.formData.english_only_field">
        <label for="FormControlInput3" class="form-label"/>
      </div>


      <child-component @update:selectedDataFilter=handleSelectedGenres />

      <div>
        <h1>Decency</h1>
        <label for="checkbox">{{ this.formData.decency }}</label>
        <input type="checkbox" id="checkbox" v-model="this.formData.decency" />
      </div>

      <div class="mb-3">
        <h1>Description</h1>
        <label for="exampleFormControlTextarea1" class="form-label"></label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="this.formData.review"></textarea>
      </div>

      <div class="mb-3">
        <label for="avatar" class="form-label">Avatar</label>
        <input id="avatar" type="file" @change="onFileChange" />
      </div>

      <button @click="updateSelectedFilter" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script>
import ChildComponent from "@/components/Manga/Filter.vue";
import api from "@/components/kt/inter";
import {VueCookieNext} from "vue-cookie-next";

export default {
  data() {
    return {
      formData: {
        category: "",
        decency: false,
        avatar: null,
        name_manga: "",
        name_original: "",
        english_only_field: "",
        author: [],
        counts: [],
        genre: [],
        tags: [],
        review:"",
      },
    };
  },
  components: {
    ChildComponent,
  },
  methods: {
    handleSelectedGenres(selectedDataFilter) {
      this.formData.author = selectedDataFilter.authors;
      this.formData.counts = selectedDataFilter.countries;
      this.formData.genre = selectedDataFilter.genres;
      this.formData.tags = selectedDataFilter.tags;

    },
    async submitForm() {
      console.log('category', this.formData.category);
      console.log("category:",this.formData.category)
      console.log('decency', this.formData.decency);
      console.log('avatar', this.formData.avatar);
      console.log('name_manga', this.formData.name_manga);
      console.log('name_original', this.formData.name_original);
      console.log('english_only_field', this.formData.english_only_field);
      console.log('author', this.formData.author);
      console.log('counts', this.formData.counts);
      console.log('genre', this.formData.genre);
      console.log('tags', this.formData.tags);
      console.log('review', this.formData.review);
      try {
        const formData = new FormData();
        formData.append('category', this.formData.category);
        console.log("category:",this.formData.category)
        formData.append('decency', this.formData.decency);
        formData.append('avatar', this.formData.avatar);
        formData.append('name_manga', this.formData.name_manga);
        formData.append('name_original', this.formData.name_original);
        formData.append('english_only_field', this.formData.english_only_field);
        for (let i = 0; i < this.formData.author.length; i++) {
          formData.append('author', this.formData.author[i]);
        }
        for (let i = 0; i < this.formData.counts.length; i++) {
          formData.append('counts', this.formData.counts[i]);
        }
        for (let i = 0; i < this.formData.genre.length; i++) {
          formData.append('genre', this.formData.genre[i]);
          console.log(i)
        }
        for (let i = 0; i < this.formData.tags.length; i++) {
          formData.append('tags', this.formData.tags[i]);
        }
        formData.append('review', this.formData.review);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug
        console.log(mangaSlug)
        const response = await api.put(`/api/v1/manga-update/${mangaSlug}/`, formData, { headers });
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error sending data:', error);
        console.error('Erroщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщ:', error.request.response);
        console.log(this.formData);
      }
    },

    onFileChange(e) {
      this.formData.avatar = e.target.files[0];
    },
  },
};
</script>
