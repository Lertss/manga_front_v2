<template>

  <div class="rounded" v-for="Manga in latestMangas" :key="Manga.id">
    <div class="box rounded" style="height: 310px; width: 160px; background: #121212; margin: 50px">
      <router-link :to="Manga.get_absolute_url" class="button text-white mt-4 text-decoration-none">
        <figure class="image" style="height: 240px;">
          <img :src="Manga.get_thumbnail" alt="Manga Thumbnail" class="rounded" style="height: 250px; width: 160px;">
          <figcaption class="figure-caption text-white line-clamp-2">
            <em>{{Manga.name_manga}}</em>
          </figcaption>
        </figure>
      </router-link>
    </div>
  </div>
</template>

<style>
.line-clamp-2 {
  margin-left: 5px;
  margin-top:5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Встановлюємо бажану кількість рядків */
}
</style>


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

