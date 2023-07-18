<template>
  <div class="container-fluid">
    <p>Trons</p>
    <div v-for="chapter in latestChapter" :key="chapter.id" style="margin: 10px" class="border-bottom ">
      <div style="display: flex; align-items: flex-start;">
        <router-link :to="chapter.manga.url">
        <div style="margin-right: 10px;">
          <img :src="chapter.manga.thumbnail" class="card-img-top" alt="manga Image" style="width: 64px; height: 96px; margin: 5px">
        </div>
        </router-link>
        <div>
          <router-link :to="chapter.manga.url">
            <h4 class="text-dark figure-caption " style="margin-top: 0;">{{ chapter.manga.name_manga }}</h4>
          </router-link>
          <router-link to="/">
          <p>
            <em class="text-dark figure-caption">
              Tom 1 Chapter {{ chapter.num }} {{ title }} {{ formatRelativeDate(chapter.data_g) }}
            </em>
          </p>
          </router-link>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'RecentUpdates',
  data() {
    return {
      latestChapter: [],
    };
  },
  mounted() {
    this.getLatestMangas();
  },
  methods: {
    async getLatestMangas() {
      try {
        const response = await axios.get('/api/v1/latest_chapter/');
        this.latestChapter = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatRelativeDate(date) {
      const currentDate = moment();
      const targetDate = moment(date, 'MM/DD/YYYY');
      const diffInDays = currentDate.diff(targetDate, 'days');

      if (diffInDays === 0) {
        return 'сегодня';
      } else if (diffInDays === 1) {
        return 'вчера';
      } else {
        return `${diffInDays} дня(ей) назад`;
      }
    }
  },
};
</script>
