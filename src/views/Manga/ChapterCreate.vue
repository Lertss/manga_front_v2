<template>
  <div class="container">
    <div class="row">
      <h1>Create New Chapter</h1>
      <div class="row">
        <div class="col-lg-6 col-12">
          <form @submit.prevent="createChapter">
            <label for="title">Title:</label>
            <input type="text" class="form-control" placeholder="Optional field" v-model="chapter.title" /><br />

            <label for="chapter_number">Chapter Number:</label>
            <input type="number" class="form-control" placeholder="Required field" v-model="chapter.chapter_number" required /><br />

            <label for="chapter_number">Volume Number:</label>
            <input class="form-control" placeholder="Required field" type="number" v-model="chapter.volume_number" required /><br />

            <div>
              <div v-for="(page, index) in chapter.pages" :key="index">
                <input class="form-control" accept="image/*" type="file" @change="handlePageChange(index, $event)" />
              </div>
              <div class="btn-group ">
                <button class="btn btn-outline-warning" type="button" @click="addPageInput">Add Pages</button>
                <button class="btn btn-outline-danger" type="button" @click="removePageInput(index)">Remove Page</button>
              </div>
            </div>

            <button class="btn btn-warning float-end m-4" type="submit">Create Chapter</button>
          </form>
        </div>
        <div class="col-lg-6 col-12">
          <div v-for="(page, index) in chapter.pages" :key=index>
            <img v-if=page.url :src=page.url class="img-fluid col-lg-7 col-12"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";

export default {
  data() {
    return {
      chapter: {
        manga: null,
        title: "",
        chapter_number: null,
        pages: [],
        volume_number: null,
        slug: null,
      },
    };
  },
  methods: {
    handlePageChange(index, event) {
      const file = event.target.files[0];
      this.chapter.pages[index] = {
        image: file,
        url: URL.createObjectURL(file),
      };
    },
    addPageInput() {
      this.chapter.pages.push({});
    },
    removePageInput() {
      this.chapter.pages.pop();
    },
    createChapter() {
      const mangaSlug = this.$route.params.slug;
      const formData = new FormData();
      formData.append("manga", mangaSlug);
      formData.append("title", this.chapter.title);
      formData.append("chapter_number", this.chapter.chapter_number);
      formData.append("volume", this.chapter.volume_number);
      formData.append("slug", this.chapter.chapter_number);

      this.chapter.pages.forEach((page, index) => {
        formData.append(`image`, page.image);
        formData.append("page_number", index);
      });
      for (let entry of formData.entries()) {
      }

      const accessToken = VueCookieNext.getCookie("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };
      axios
          .post("http://127.0.0.1:8000/api/v1/chapters/", formData, { headers })
          .then((response) => {
            this.$router.push(`/${this.$route.params.slug}`);
          })
          .catch((error) => {
            console.error("Error creating chapter:", error);
          });
    },
  },
};
</script>
