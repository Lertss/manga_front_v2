<template>
  <div class="container-fluid">
    <div v-for="chapter in latestChapter" :key="chapter.id" style="margin: 10px" class="border-bottom">
      {{console.log(chapter)}}
      <div style="display: flex; align-items: flex-start;">
        <router-link :to="chapter.manga.url">
          <div style="margin-right: 10px;">
            <img :src="chapter.manga.thumbnail" class="card-img-top" alt="manga Image" style="width: 64px; height: 96px; margin: 5px">
          </div>
        </router-link>
        <div style="flex-grow: 1;">
          <router-link :to="chapter.manga.url">
            <h4 style="margin-left: 2%" class="text-dark figure-caption mb-0 d-inline-block">{{ chapter.manga.name_manga }}</h4>
          </router-link>
          <hr style="border-color: #ff8800; border-width: 3px; margin: 3px"> <!-- Змінено стиль лінії -->
          <router-link :to="`${chapter.manga.url}${chapter.slug}`">
            <p style="background-color: #cbcbcb; margin: 0; border-radius: 10px; padding: 3px;">
              <em style="margin-left: 1%;" class="text-dark figure-caption right-align">
                <span style="display: inline-block;">Tom {{ chapter.volume }} Chapter {{ chapter.chapter_number}}</span>
                <span class="relative-date">{{ formatRelativeDate(chapter.data_g) }}</span>
              </em>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.right-align .relative-date {
  float: right;
  margin-right: 2%;
}

.right-align::after {
  content: "";
  display: table;
  clear: both;
}
</style>

<script>
import moment from 'moment';
import api from "@/components/script/inter";

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
        const response = await api.get('/api/v1/last-chapters/');
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
        return 'today';
      } else if (diffInDays === 1) {
        return 'yesterday';
      } else {
        return `${diffInDays} day(s) ago`;
      }

    }
  },
};
</script>

