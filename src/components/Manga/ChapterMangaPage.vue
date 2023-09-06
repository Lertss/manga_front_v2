<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h2>Chapters</h2>
      <router-link to="chapter/create" class="text-decoration-none m-1 router-link-exact-active">
        <i class="bi bi-journal-plus"></i>
      </router-link>
    </div>
    <div>
      <div class="rounded-4" v-for="chap in manga.chapters" :key="chap.id">
        <div style="display: flex; align-items: flex-start;">
          <div style="flex-grow: 1;">
            <router-link :to="chap.slug" class="no-underline">
              <h4 class="text-dark figure-caption ms-3">{{chap.title}}</h4>
              <p>
                <em class="text-dark figure-caption ms-2">
                  Tom {{chap.volume}} Chapter {{ chap.num }}
                </em>
              </p>
            </router-link>
          </div>
          <div>
            <router-link :to="'chapter/update/' + chap.slug" class=" m-1 float-end router-link-exact-active">
              <i class="bi bi-gear"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: 'one',
  props: {
    manga: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log(this.$route.params);
  },
};
</script>

<style>
.router-link-exact-active {
  color: inherit; /* Колір тексту буде таким же, як відразу у батьківському елементі */
  text-decoration: none; /* Видалення підкреслення */
}
</style>