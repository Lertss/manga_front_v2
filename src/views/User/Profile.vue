<template>
    <div class="container">
      <div id="content" class="content p-0">
        <div class="card-body">
          <div class="d-flex flex-column align-items-center align-md-start flex-md-row">
            <!-- Profile picture image -->
            <div class="d-flex justify-content-center mb-3 mb-md-0">
              <div class="card-body text-center">
                <!-- Profile picture image-->
                <img class="img-account-profile rounded-circle mb-2" :src="Profile.get_avatar" alt="Avatar">
              </div>
            </div>
            <div class="d-flex flex-column mt-3 mt-md-0 text-center text-md-left">
              <p class="text-uppercase font-weight-bold">{{ Profile.username }}</p>
              <div class="d-flex align-items-center justify-content-center justify-content-md-start">
                <p class="font-italic text-muted mb-0">Chapters read: 0</p>
                <p class="font-italic text-muted mb-0 mx-2">Likes to chapters: 0</p>
                <p class="font-italic text-muted mb-0">Comments: 0</p>
              </div>
            </div>
          </div>

          <div>
            <label for="filterSelect">Filter Manga:</label>
            <select id="filterSelect" v-model="currentFilter">
              <option value="All">All</option>
              <option value="Reading">Reading</option>
              <option value="I will read">I will read</option>
              <option value="Read">Read</option>
              <option value="Abandoned">Abandoned</option>
              <option value="Postponed">Postponed</option>
              <option value="Not interested">Not interested</option>
            </select>
          </div>

          <div style="margin-top:5% ">
            <div class="container">
              <h1>Profile</h1>
              <div class="row align-items-stretch">
                <div class="col-lg-2 col-md-3 col-sm-3 col-4" v-for="manga in filteredManga" :key="manga.id">
                  <MangaData :manga_data = "manga" ></MangaData>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>



<style>
@media (max-width: 767px) {
  .img-account-profile {
    max-width: 130px;
    margin: 0 auto;
  }

  .mt-md-0 {
    margin-top: 0 !important;
  }

  .justify-content-center.justify-content-md-start {
    justify-content: center;
  }
}

@media (min-width: 768px) {
  .d-flex.text-md-left {
    margin-left: 20px;

  }
}
</style>


<script>
import { VueCookieNext } from 'vue-cookie-next';
import MangaData from "@/components/Manga/MangaData.vue";
import api from "@/components/kt/inter";


export default {
  name: 'Profile',
  components: {
    MangaData
  },
  data() {
    return {
      Profile: [],
      currentFilter: "All",
      isLoading: false // Початковий фільтр (змініть за потребою)
    };
  },
  computed: {
    filteredManga() {
      if (this.currentFilter === "All") {
        return this.Profile.list_manga;
      } else {
        return this.Profile.list_manga.filter(manga => manga.name === this.currentFilter);
      }
    }
  },
  methods: {
    async getProfile() {
      try {
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await api.get('/auth/user/', { headers });
        this.Profile = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getProfile();
    document.title = 'Profile | Manga';
  }


};
</script>
