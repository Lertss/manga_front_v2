<template>
<!-- Button trigger modal -->
<button  type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">

  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
  </svg>
  {{ average_rating }}

</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
      <button @click="submitRating" type="button" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>
</div>

</template>

<script>
import index from "vuex";
import {VueCookieNext} from "vue-cookie-next";
import api from "@/components/kt/inter";

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

        console.log('Оцінка була успішно додана:', response.data);
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