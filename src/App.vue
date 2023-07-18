<template>
  <div id="app">
    <!--    <Header />-->
  <div style="height:50px ">
  <Header />
  </div>
    <!--    <Other />-->
  <router-view/>
    <!--    <Footer />-->
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>