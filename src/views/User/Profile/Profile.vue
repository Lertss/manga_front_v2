<template>
    <div class="container" style="  margin: auto; width: 50%;">
      <div id="content" class="content p-0">
        <div class="card-body">
          <div class="d-flex flex-column align-items-center align-md-start flex-md-row">
            <!-- Profile picture image -->
            <div class="d-flex justify-content-center mb-3 mb-md-0">
              <div class="card-body text-center">
                <!-- Profile picture image-->
                <img class="img-account-profile rounded-circle mb-2" :src="Profile.get_avatar" style="max-width: 130px; height: 180px" alt="Avatar">
              </div>
            </div>

            <div class="d-flex flex-column mt-3 mt-md-0 text-center text-md-left">
              <h2 class="text-uppercase font-weight-bold">{{ Profile.username }}</h2>
              <div class="d-flex align-items-center justify-content-center justify-content-md-start">
                <p class="font-italic text-muted m-1">Chapters in the list: {{filteredManga.length}}</p>
                <p class="font-italic text-muted m-1">Comments: {{ Profile && Profile.comments ? Profile.comments.length : 0 }}</p>
              </div>
            </div>
            <div class="m-2">
              <Settings/>
            </div>
          </div>
        </div>
      </div>
    </div>



  <div class="responsive-width mt-4">
    <div class="p-2 border border-warning text-dark bg-opacity-50 components-user rounded-3">
      <button class="btn btn-warning m-1" @click="showComponent(1)">Manga</button>
      <button class="btn btn-warning m-1" @click="showComponent(2)">Comments</button>
      <button class="btn btn-warning m-1" @click="showComponent(3)">Notifications</button>
      <div class="float-end"></div>
      <div>
        <div>
          <MangaProfile :mangas="Profile.list_manga" v-show="currentComponent === 'MangaProfile'" />
          <CommentsProfile :comments="Profile.comments" v-show="currentComponent === 'CommentsProfile'" />
          <NotificationAll v-show="currentComponent === 'NotificationAll'" />
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { VueCookieNext } from 'vue-cookie-next';
import MangaData from "@/components/Manga/MangaData.vue";
import api from "@/components/script/inter";
import MangaProfile from "@/components/User/MangaProfile.vue";
import CommentsProfile from "@/components/User/CommentsProfile.vue";
import Settings from "@/components/User/SettingsUser.vue";
import NotificationAll from "@/components/User/NotificationAll.vue";


export default {
  name: 'Profile',
  components: {
    Settings,
    MangaProfile,
    CommentsProfile,
    MangaData,
    NotificationAll, // Добавьте эту строку
  },
  data() {
    return {
      currentComponent: 'MangaProfile',
      Profile: [],
      currentFilter: "All",
      isLoading: false,
      filters: ['All', 'Reading', 'I will read', 'Read', 'Abandoned', 'Postponed', 'Not interested']
    };
  },
  computed: {
    filteredManga() {
      if (this.Profile && this.Profile.list_manga) {
        if (this.currentFilter === "All") {
          return this.Profile.list_manga;
        } else {
          return this.Profile.list_manga.filter(
              (manga) => manga.name === this.currentFilter
          );
        }
      } else {
        return [];
      }
    },
  },

  methods: {
      showComponent(componentIndex) {
        if (componentIndex === 1) {
          this.currentComponent = 'MangaProfile';
        } else if (componentIndex === 2) {
          this.currentComponent = 'CommentsProfile';
        } else if (componentIndex === 3) {
          this.currentComponent = 'NotificationAll';
        }
      },
    async getProfile() {
      try {
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await api.get('/auth/user/', {headers});
        console.log("djg5555555555", response)
        this.Profile = response.data;

      } catch (error) {
        if (error.response.status === 404) {
          this.$router.push('/error');
        } else {
          this.$router.push('/errorserver');
        }
      }
    },
  },
  mounted() {
    this.getProfile();
    document.title = 'Profile | Manga';

  }


};
</script>





<style>
@media (max-width: 767px) {
  .responsive-width {
    margin: auto;
    width: 90%;
  }
}

@media (min-width: 768px) {
  .responsive-width {
    margin: auto;
    width: 50%;
  }
}

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