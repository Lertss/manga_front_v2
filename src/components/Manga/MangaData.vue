<template>

        <router-link :to="manga_data.manga.slug">
          <div class="card h-100 image-container">
            <img :src="manga_data.manga.thumbnail" class="card-img-top" alt="manga Image" style="width: 100%;">
             <div class="card-body image-overlay">
              <p class="overlay-text  line-clamp"><em>{{ manga_data.manga.name_manga }}</em></p>
            </div>
          </div>
        </router-link>







</template>

<style scoped>

</style>
<script>
export default {
  name: 'MangaData',
  props: {
    manga_data: Object, // Ви можете змінити тип за потреби
  },
}
</script>
