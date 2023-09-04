<template>
  <div>
    <h1>Create New Chapter</h1>
    <form @submit.prevent="createChapter">
      <label for="manga">Manga ID:</label>
      <input type="number" v-model="chapter.manga" required /><br />

      <label for="title">Title:</label>
      <input type="text" v-model="chapter.title" /><br />


      <label for="chapter_number">Chapter Number:</label>
      <input type="number" v-model="chapter.chapter_number" required /><br />

      <label for="chapter_number">Volume Number:</label>
      <input type="number" v-model="chapter.volume_number" required /><br />

      <div v-for="(page, index) in chapter.pages" :key="index">
        <input type="file" @change="handlePageChange(index, $event)" />
      </div>
      <button type="button" @click="addPageInput">Add Pages</button><br />

      <button type="submit">Create Chapter</button>
    </form>
  </div>
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
    createChapter() {
      const formData = new FormData();
      formData.append("manga", this.chapter.manga);
      formData.append("title", this.chapter.title);
      formData.append("chapter_number", this.chapter.chapter_number);
      formData.append("volume", this.chapter.volume_number);
      formData.append("slug", this.chapter.chapter_number);

      this.chapter.pages.forEach((page, index) => {
        formData.append(`image`, page.image);
        formData.append('page_number', index)
      });
      for (let entry of formData.entries()) {
        console.log("tut",entry[0], entry[1]);
      }

      const accessToken = VueCookieNext.getCookie('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
      };
      axios
          .post("http://127.0.0.1:8000/api/v1/chapters/", formData, {headers
          })
          .then((response) => {
            console.log("Chapter created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating chapter:", error);
          });
    },
  },
};
</script>
