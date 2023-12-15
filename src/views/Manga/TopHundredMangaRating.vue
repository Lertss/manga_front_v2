<template>
  <div class="container">
    <h1>Каталог товарів</h1>
    <div class="row align-items-stretch">
      <div class="col-lg-2 col-md-3 col-sm-3 col-4" v-for="(manga, index) in latestMangas" :key="index">
        <router-link :to="manga.url">
          <div class="card h-100">
            <img :src="manga.thumbnail" class="card-img-top" alt="manga Image" style="width: 100%;">
            <div class="card-body">
              <p class="card-title line-clamp"><em>{{ manga.name_manga }}</em></p>

            </div>
          </div>
        </router-link>

      </div>
    </div>
  </div>
</template>


<script>
import api from "@/components/script/inter";

export default {
  name: 'Catalog',
  data() {
    return {
      latestMangas: []
    }
  },
  components: {
  },
  mounted() {
    this.getLatestMangas()
    document.title = 'Catalog | Manga'
  },
  methods: {
    async getLatestMangas() {
      try {
        const response = await api.get('/api/v1/top-manga-sto/')
        this.latestMangas = response.data
        console.log(this.latestMangas)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.line-clamp{
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Встановлюємо бажану кількість рядків */
}

 .line-clamp {
   font-size: 1rem; /* Базовий розмір шрифту */
 }


@media (max-width: 1400px) {
  .line-clamp {
    font-size: 0.8rem; /* Розмір шрифту на малих екранах */
  }
}

@media (max-width: 1200px) {
  .line-clamp {
    font-size: 0.7rem; /* Розмір шрифту на малих екранах */
  }
}
@media (max-width: 750px) {
  .line-clamp {
    font-size: 0.6rem; /* Розмір шрифту на малих екранах */
  }
}
@media (max-width: 578px) {
  .line-clamp {
    font-size: 0.6rem; /* Розмір шрифту на малих екранах */
  }
}

@media (max-width: 450px) {
  .line-clamp {
    font-size: 0.5rem; /* Розмір шрифту на найменших екранах */
  }
}

</style>
