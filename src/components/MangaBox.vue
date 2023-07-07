<template>
  <div class="column is-3" v-for="Manga in latestMangas" :key="Manga.id">
    <div class="box" style="height: 123px; width:123px; background: blue; margin:30px">
      <figure class="image mb-4">
        <img :src="Manga.get_thumbnail" alt="Manga Thumbnail">
      </figure>

      <h3 class="is-size-4">{{ Manga.name }}</h3>

      <router-link :to="Manga.get_absolute_url" class="button is-dark mt-4">View details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MangaBox',
  props: {
    latestMangas: {
      type: Array,
      required: true
    }
  }
}
</script>
