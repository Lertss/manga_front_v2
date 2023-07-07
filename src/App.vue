<template>
  <div id="app">
  <div style="height:50px ">
  <Header />
  </div>

    <!--    <Footer />-->

  <router-view/>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Manga_recommendations from './components/MangaBox.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>