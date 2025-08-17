<template>
  <div>
      <div v-for="(errorMessage, fieldName) in errorMessages" :key="fieldName" class="alert alert-danger alert-manga-create">

        {{ fieldName }}: {{ errorMessage }}
      </div>

    <form @submit.prevent="submitForm">
      <main class="container">
        <div class="row g-5">
          <div class="col-md-8">
            <div class="mb-3 col-md-8 mt-5">
              <h1>Name manga</h1>
              <input type="text" class="form-control" maxlength="200" id="FormControlInput1" placeholder="Name manga" required v-model="this.formData.name_manga">
              <label for="FormControlInput1" class="form-label"></label>
            </div>

            <div class="mb-3 col-md-8 mt-5">
              <h1>Name original</h1>
              <input type="text" class="form-control" maxlength="200" id="FormControlInput2" placeholder="Name original" required v-model="this.formData.name_original">
              <label for="FormControlInput2" class="form-label"></label>
            </div>

            <div class="mb-3 col-md-8 mt-5">
              <h1>Name english</h1>
              <input type="text" class="form-control" maxlength="200" id="FormControlInput3" placeholder="English only field" required v-model="this.formData.english_only_field">
              <label for="FormControlInput3" class="form-label"></label>
            </div>

            <div>
              <h1>Decency</h1>
              <p> <em>Work intended for individuals aged 18 and older?</em></p>
              <input type="checkbox" id="checkbox" class="m-1" v-model="this.formData.decency" />
              <label for="checkbox" v-if="this.formData.decency">Yes</label>
              <label for="checkbox" v-else>No</label>
            </div>

            <div class="mb-3 col-md-8 mt-5">
              <h1>Description</h1>
              <label for="exampleFormControlTextarea1" class="form-label"></label>
              <textarea class="form-control" id="exampleFormControlTextarea1" maxlength="1000" rows="3" required v-model="this.formData.review"></textarea>
            </div>

            <div class="mb-3 col-md-8 mt-5">
              <label for="avatar" class="form-label m-1">Avatar</label>
              <input class="form-control" id="avatar" type="file" accept="image/*" required @change="onFileChange" />
            </div>
          </div>
        <div class="col-md-4">
          <div>
            <div class="p-4 mb-3 bg-body-tertiary rounded-4">
                <child-component @update:selectedDataFilter=handleSelectedGenres />
              <AuthorCreate />
            </div>
          </div>
        </div>
          <p class="custom-ms">*If you don't want to specify the genre, author, tags or country, then you don't need to do this. the model will say "The creator didn't want to enter the * field "</p>
          <button type="submit" class="btn btn-warning custom-ms">Submit</button>
      </div>
    </main>
    </form>
  </div>
</template>
<script>
import AuthorCreate from "@/components/Manga/AuthorCreate.vue";
import ChildComponent from "@/components/Manga/Filter.vue";
import api from "@/components/script/inter";
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
        country_name: [],
        genre: [],
        tags: [],
        review:"",
      },
      errorMessages: {},
    };
  },
  components: {
    ChildComponent,
    AuthorCreate
  },
  methods: {
    handleSelectedGenres(selectedDataFilter) {
      this.formData.category = selectedDataFilter.categories;
      this.formData.author = selectedDataFilter.authors;
      this.formData.country_name = selectedDataFilter.countries;
      this.formData.genre = selectedDataFilter.genres;
      this.formData.tags = selectedDataFilter.tags;
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('category', this.formData.category);
        formData.append('decency', this.formData.decency);
        formData.append('avatar', this.formData.avatar);
        formData.append('name_manga', this.formData.name_manga);
        formData.append('name_original', this.formData.name_original);
        formData.append('english_only_field', this.formData.english_only_field);
        for (let i = 0; i < this.formData.author.length; i++) {
          formData.append('author', this.formData.author[i]);
        }
        for (let i = 0; i < this.formData.country_name.length; i++) {
          formData.append('country_name', this.formData.country_name[i]);
        }
        for (let i = 0; i < this.formData.genre.length; i++) {
          formData.append('genre', this.formData.genre[i]);
        }
        for (let i = 0; i < this.formData.tags.length; i++) {
        formData.append('tags', this.formData.tags[i]);
          }
        formData.append('review', this.formData.review);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        };
        const response = await api.post(`/api/v1/manga/`, formData, { headers });
        console.log('Server response:', response.data);
        this.$router.push("/");
      } catch (error) {
        console.error('Error sending data:', error);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          this.errorMessages = {};

          if (errorData.category) {
            this.errorMessages.category = errorData.category.join(', ');
          }
          if (errorData.name_manga) {
            this.errorMessages.name_manga = errorData.name_manga.join(', ');
          }
          if (errorData.name_original) {
            this.errorMessages.name_original = errorData.name_original.join(', ');
          }
          if (errorData.english_only_field) {
            this.errorMessages.english_only_field = errorData.english_only_field.join(', ');
          }
          if (errorData.review) {
            this.errorMessages.review = errorData.review.join(', ');
          }
          if (errorData.avatar) {
            this.errorMessages.avatar = errorData.avatar.join(', ');
          }

        }
      }
    },
    onFileChange(e) {
      this.formData.avatar = e.target.files[0];
    },
  },
};
</script>

<style>
.custom-ms{
margin-left: 40px;
}
.alert-manga-create{
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width:50%;
  height:80px;
}
</style>