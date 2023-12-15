<template>
<!-- Button trigger modal -->
<button  type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">

  <i class="bi bi-star-fill"></i>
  {{ average_rating }}

</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Select a rating</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>


    <div class="modal-body">
      <div>
        <div class="rating">
      <span
          v-for="(star, index) in stars"
          :key="star"
          @click="updateRating(star)"
          class="star"
      >
        <span :class="star <= rating ? 'filled' : ''">
          {{ star }} &#9733;
        </span>
        - {{ description[index] }} <br>
      </span>
        </div>
      </div>


    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button @click="submitRating" data-bs-dismiss="modal" type="button" class="btn btn-warning">Save changes</button>
    </div>
  </div>
</div>
</div>

</template>

<script>
import index from "vuex";
import {VueCookieNext} from "vue-cookie-next";
import api from "@/components/script/inter";

export default {
  name: 'Rating',
  props: {
    average_rating: {
      type: Number, // Change this to Object
      default:0
    },
  },
  computed: {
    index() {
      return index
    }
  },
  data() {
    return {
      rating: 0,
      stars: [5, 4, 3, 2, 1],
      description:['THIS IS A MASTERPIECE!', 'Good', 'Run-of-the-mill', 'Subpar','Utter Failure']
    };
  },
  methods: {
    async submitRating() {
      try {
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const mangaSlug = this.$route.params.slug
        const response = await api.post('/commn/manga-ratings/', {
              manga_slug: mangaSlug,
              rating: this.rating
            },
            {headers});

      } catch (error) {
        console.error('Помилка при додаванні оцінки:', error);
      }
    },
    updateRating(star) {
      this.rating = star;
    },
  },
};
</script>

<style>
.star {
  cursor: pointer;
  font-size: 24px;
}

.filled {
  color: gold;
}
</style>