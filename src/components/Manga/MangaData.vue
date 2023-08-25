<template>
  {{ console.log(manga_data)}}

        <router-link :to="manga_data.manga.url">
          <div class="card h-100">
            <img :src="manga_data.manga.thumbnail" class="card-img-top" alt="manga Image" style="width: 100%;">
            <div class="card-body">
              <!--            <p style="margin: 0px;">3</p> оценка-->
              <p class="card-title line-clamp"><em>{{ manga_data.manga.name_manga }}</em></p>

            </div>
          </div>
        </router-link>

</template>

<style scoped>

</style>
<script>
export default {
  name: 'MangaProfile',
  props: {
    manga_data: Object, // Ви можете змінити тип за потреби
  },
}
</script>
