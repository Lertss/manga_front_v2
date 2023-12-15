<template>
  <main class="container">
    <div class="p-4 p-md-5 mb-4 text-white">
      <Carusel />
    </div>
    <RandomTwo />

    <div class="row g-5">
      <div class="col-md-8">
        <h3 class="pb-4 mb-4 fst-italic border-bottom" style=" margin: 3%;">
          Latest updates
        </h3>
          <div>
            <RecentUpdates />
          </div>
      </div>

      <div class="col-md-4">
        <div class="position-sticky" style="top: 2rem;">
          <div class="p-4 mb-3 bg-light rounded">
            <h4 class="fst-italic">About</h4>

            <p>Welcome to our manga website! We are dedicated to bringing you the best manga stories from around the world. Our team works tirelessly to provide you with access to the latest releases and classic masterpieces.</p>

            <p>We aim to create a community of manga enthusiasts where you can discuss your favorite series, share recommendations, and interact with other fans. Whether you're new to the world of manga or an experienced reader, we're delighted to welcome you to our community!</p>

            <p>Join us today and dive into the captivating world of manga!</p>
          </div>

          <NewUserMainPage />

        </div>
      </div>
    </div>

  </main>

</template>

<script>
import RecentUpdates from "@/components/Manga/LatestChapter.vue";
import Carusel from "@/components/Main/Carusel.vue";
import RandomTwo from "@/components/Manga/RandomTwo.vue";
import NewUserMainPage from "@/components/User/NewUserMainPage.vue";
import Search from "@/components/Main/Search.vue";
export default {
  name: 'App',
  components: {
    Search,
    NewUserMainPage,
    RandomTwo,
    RecentUpdates,
    Carusel
  }
}
</script>