<template>
  <main class="container">
    <div class="p-4 p-md-5 mb-4 text-white">
      <Carusel />
    </div>

    <Random />

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
            <p class="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
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
import Random from "@/components/Manga/Random.vue";
import NewUserMainPage from "@/components/User/NewUserMainPage.vue";
export default {
  name: 'App',
  components: {
    NewUserMainPage,
    Random,
    RecentUpdates,
    Carusel
  }
}
</script>