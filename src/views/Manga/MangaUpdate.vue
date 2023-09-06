<template>
  <div>
    <div v-if="errorMessages" class="alert alert-danger">
      {{errorMessages}}
    </div>
    <main class="container">
      <div class="row g-5">
        <div class="col-md-8">
          <h1>Update Manga</h1>

          <!-- Update Name Manga -->
          <div class="mb-3 col-md-8 mt-5">
            <h2>Name Manga</h2>
            <input type="text" class="form-control " maxlength="200" required v-model="formData.name_manga">
            <button class="btn btn-warning m-3 float-end" @click="updateNameManga">Update Name Manga</button>
          </div>

          <!-- Update Name Original -->
          <div class="mb-3 col-md-8 mt-5">
            <h2>Name Original</h2>
            <input type="text" class="form-control " maxlength="200" required v-model="formData.name_original">
            <button class="btn btn-warning m-3 float-end" @click="updateNameOriginal">Update Original Name Manga</button>
          </div>

          <!-- Update Name English -->
          <div class="mb-3 col-md-8 mt-5">
            <h2>Name English</h2>
            <input type="text" class="form-control" maxlength="200" required v-model="formData.english_only_field">
            <button class="btn btn-warning m-3 float-end" @click="updateEnglishName">Update English Name Manga</button>
          </div>


          <!-- Update Decency -->
          <div class=" mb-3 mt-5">
            <h1>Decency</h1>
            <p> <em>Work intended for individuals aged 18 and older?</em></p>
            <input type="checkbox" id="checkbox" class="m-1" v-model="this.formData.decency" />
            <label for="checkbox" v-if="this.formData.decency">Yes</label>
            <label for="checkbox" v-else>No</label>
            <button class="btn btn-warning m-3 float-end"  @click="updateDecency">Update Decency</button>

          </div>

          <!-- Update Description -->
          <div class="mb-3 mt-5 col-md-8">
            <h2>Description</h2>
            <textarea class="form-control" required rows="3" maxlength="1000" v-model="formData.review"></textarea>
            <button class="btn btn-warning m-3 float-end"  @click="updateReview">Update Description</button>
          </div>
          <!-- Update Avatar -->
          <div class="mb-3 mt-5 col-md-8 ">
            <label for="avatar" class="form-label">Avatar</label>
            <input class="form-control" id="avatar" required type="file" accept="image/*" @change="onFileChange" />
            <button class="btn btn-warning m-3 float-end" @click="updateAvatar">Update Avatar</button>
          </div>
        </div>

        <div class="col-md-4 mt-5">
          <div class="position-sticky" style="top: 2rem;">
            <div class="p-4 mb-3 bg-body-tertiary rounded">
              <!-- Child Component for Filters -->
              <child-component @update:selectedDataFilter="handleSelectedGenres" />

              <!-- Buttons to update different categories -->
              <button class="btn btn-warning m-2" @click="updateCategory">Update Category</button>

              <!-- Buttons to update genres -->
              <button class="btn btn-warning m-2" @click="updateGenre">Update Genre</button>

              <!-- Buttons to update tags -->
              <button class="btn btn-warning m-2" @click="updateTag">Update Tag</button>

              <!-- Buttons to update authors -->
              <button class="btn btn-warning m-2" @click="updateAuthor">Update Author</button>

              <!-- Buttons to update counts -->
              <button class="btn btn-warning m-2" @click="updateCounts">Update Counts</button>
            </div>
          </div>
        </div>



      </div>
    </main>
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
      errorMessages: null,
    };
  },
  components: {
    ChildComponent,
  },
  methods: {
    handleSelectedGenres(selectedDataFilter) {
      this.formData.category = selectedDataFilter.categories;
      this.formData.author = selectedDataFilter.authors;
      this.formData.counts = selectedDataFilter.countries;
      this.formData.genre = selectedDataFilter.genres;
      this.formData.tags = selectedDataFilter.tags;

    },
    async updateNameManga() {
      try {
        if (!this.formData.name_manga) {
          // Виводимо повідомлення про помилку, якщо поле пусте
          console.error("The 'Name Manga' field cannot be empty.");
          this.errorMessages = "The 'Name Manga' field cannot be empty."
          return;
        }

        const formData = new FormData();
        formData.append('name_manga', this.formData.name_manga);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug;

        console.log("this.formData.name_manga", this.formData.name_manga);
        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-name-manga/`, {
          "name_manga": this.formData.name_manga,
        }, { headers });
        console.log("Server response:", response.data);
        this.errorMessages = null
      } catch (error) {
        this.errorMessages = error
        console.log("Error", error);
      }
    },

    async updateEnglishName() {
      try {
        if (!this.formData.english_only_field) {
          // Виводимо повідомлення про помилку, якщо поле порожнє
          console.error("The 'English Name' field cannot be empty.");
          this.errorMessages = "The 'English Name' field cannot be empty."
          return;
        }

        const formData = new FormData();
        formData.append('name_manga', this.formData.english_only_field);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug;

        console.log("this.formData.english_only_field", this.formData.english_only_field);
        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-english-only-field/`, {
          "english_only_field": this.formData.english_only_field,
        }, { headers });
        console.log("Server response:", response.data);
        this.errorMessages = null

      } catch (error) {
        console.log("Error", error);
      }
    },

    async updateNameOriginal() {
      try {
        if (!this.formData.name_original) {
          // Виводимо повідомлення про помилку, якщо поле порожнє
          console.error("The 'Name Original' field cannot be empty.");
          this.errorMessages = "The 'Name Original' field cannot be empty."
          return;
        }

        const formData = new FormData();
        formData.append('name_manga', this.formData.name_original);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug;

        console.log("this.formData.name_original", this.formData.name_original);
        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-name-original/`, {
          "name_original": this.formData.name_original,
        }, { headers });
        console.log("Server response:", response.data);
        this.errorMessages = null
      } catch (error) {
        console.log("Error", error);
      }
    },

    async updateGenre() {
      try {
        const formData = new FormData();
        for (let i = 0; i < this.formData.genre.length; i++) {
          formData.append(`genre`, this.formData.genre[i]);
        }

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        };
        const mangaSlug = this.$route.params.slug;

        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-genre/`, formData, { headers });
        console.log("Server response:", response.data);
      } catch (error) {
        console.log("Error", error);
      }
    },

    async updateTag() {
      try {
        const formData = new FormData();
        for (let i = 0; i < this.formData.tags.length; i++) {
          formData.append(`tags`, this.formData.tags[i]);
        }

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        };
        const mangaSlug = this.$route.params.slug;

        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-tags/`, formData, { headers });
        console.log("Server response:", response.data);
      } catch (error) {
        console.log("Error", error);
      }
    },
    async updateCategory() {
      try {
        const formData = new FormData();
        formData.append(`category`, this.formData.category);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        };
        const mangaSlug = this.$route.params.slug;

        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-category/`, formData, { headers });
        console.log("Server response:", response.data);
      } catch (error) {
        console.log("Error", error);
      }
    },
    async updateAuthor() {
      try {
        const formData = new FormData();
        for (let i = 0; i < this.formData.author.length; i++) {
          formData.append(`author`, this.formData.author[i]);
        }

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        };
        const mangaSlug = this.$route.params.slug;

        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-author/`, formData, { headers });
        console.log("Server response:", response.data);
      } catch (error) {
        console.log("Error", error);
      }
    },
    async updateCounts() {
      try {
        const formData = new FormData();
        for (let i = 0; i < this.formData.counts.length; i++) {
          formData.append(`counts`, this.formData.counts[i]);
        }

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        };
        const mangaSlug = this.$route.params.slug;

        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-counts/`, formData, { headers });
        console.log("Server response:", response.data);
      } catch (error) {
        console.log("Error", error);
      }
    },
    async updateDecency(){

      try {
        const formData = new FormData();
        formData.append('decency', this.formData.decency);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug;

        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-decency/`, formData, { headers });
        console.log("Server response:", response.data);
      }
      catch (error){
        console.log("Error", error)
      }
    },
    async updateReview(){

      try {
        const formData = new FormData();
        formData.append('review', this.formData.review);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug;

        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-review/`, formData, { headers });
        console.log("Server response:", response.data);
      }
      catch (error){
        console.log("Error", error)
      }
    },
    async updateAvatar(){

      try {
        const formData = new FormData();
        formData.append('avatar', this.formData.avatar);

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug;

        console.log("this.formData.name_manga", this.formData.name_manga)
        const response = await api.patch(`/api/v1/manga/${mangaSlug}/update-avatar/`, formData, { headers });
        console.log("Server response:", response.data);
      }
      catch (error){
        console.log("Error", error)
      }
    },
    onFileChange(e) {
      this.formData.avatar = e.target.files[0];
    },
  },
};
</script>
