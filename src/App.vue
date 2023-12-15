<template>
  <div id="app">
    <!--    <Header />-->
  <div class="header">
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
import Header from './components/Main/Header.vue'
import Footer from './components/Main/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
.header{
  height:50px;
  margin-bottom: 20px;
}
</style>