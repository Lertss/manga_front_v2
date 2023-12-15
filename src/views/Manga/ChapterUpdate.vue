<template>
  <main class="container">
    <div class="row g-5">
      <div class="col-md-8">
        <h1>Create New Chapter</h1>
        <div class="mb-3 col-md-8 mt-5">
          <label for="title">Title:</label>
          <input type="text" class="form-control " maxlength="200" required  v-model="chapter.title" /><br />
          <button class="btn btn-warning m-3 float-end" @click="updateTitle('title')">Update Title</button>
        </div>

          <div class="mb-3 col-md-8 mt-5">
          <label for="chapter_number">Chapter Number:</label>
          <input type="number" class="form-control" v-model="chapter.chapter_number" required /><br />
            <button class="btn btn-warning m-3 float-end" @click="updateChapterNumber('title')">Update Chapter Number</button>
          </div>

            <div class="mb-3 col-md-8 mt-5">
          <label for="chapter_number">Volume Number:</label>
          <input type="number" class="form-control" v-model="chapter.volume_number" required /><br />
          <button class="btn btn-warning m-3 float-end" @click="updateVolumeNumber('volume')">Update Volume Number</button>
            </div>

              <div class="mb-3 col-md-8 mt-5">
          <div v-for="(page, index) in chapter.pages" :key="index">
            <input type="file" class="form-control" @change="handlePageChange(index, $event)" />
          </div>
          <button class="btn btn-warning m-3 float-end" type="button" @click="addPageInput">Add Pages</button><br />
              </div>
        <button class="btn btn-warning m-3 float-end" @click="updatePages('pages')">Update Pages</button>
      </div>
    </div>
  </main>
</template>

<script>
import axios, {post} from "axios";
import {VueCookieNext} from "vue-cookie-next";

export default {
  data() {
    return {
      chapter: {
        manga: null,
        title: "",
        chapter_number: null,
        pages: [],
        volume_number: null,
        slug: null
      },
    };
  },
  methods: {
    handlePageChange(index, event) {
      const file = event.target.files[0];
      this.chapter.pages[index] = {
        image: file,
      };
    },
    addPageInput() {
      this.chapter.pages.push({});
    },
    updateTitle(){
      const formData = new FormData();
      formData.append("title", this.chapter.title);
      const accessToken = VueCookieNext.getCookie('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
      };
      const chapterSlug = this.$route.params.slugchap;
      console.log(chapterSlug)
      axios
          .patch(`/api/v1/chapters/${chapterSlug}/update-title/`, formData, {headers
          })
          .then((response) => {
            console.log("Chapter created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating chapter:", error);
          });
    },
    updateChapterNumber(){
      const formData = new FormData();
      formData.append("chapter_number", this.chapter.chapter_number);
      const accessToken = VueCookieNext.getCookie('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
      };
      const chapterSlug = this.$route.params.slugchap;
      console.log(chapterSlug)
      axios
          .patch(`/api/v1/chapters/${chapterSlug}/update-chapter-number/`, formData, {headers
          })
          .then((response) => {
            console.log("Chapter created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating chapter:", error);
          });
    },
    updateVolumeNumber(){
      const formData = new FormData();
      formData.append("volume", this.chapter.volume_number);
      const accessToken = VueCookieNext.getCookie('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
      };
      const chapterSlug = this.$route.params.slugchap;
      console.log(chapterSlug)
      axios
          .patch(`/api/v1/chapters/${chapterSlug}/update-volume/`, formData, {headers
          })
          .then((response) => {
            console.log("Chapter created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating chapter:", error);
          });
    },
  }
};
</script>
