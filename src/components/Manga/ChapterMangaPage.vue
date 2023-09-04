<template>
  <div>
    {{console.log("rota", manga)}}
    <div class="rounded" v-for="chap in manga.chapters" :key="chap.id">
      <div style="display: flex; align-items: flex-start;">
        <div>
          <router-link :to="chap.slug">
            <h4 class="text-dark figure-caption " style="margin-top: 0;">{{chap.title}}</h4>
            <p>
              <em class="text-dark figure-caption">
                Tom {{chap.volume}} Chapter {{ chap.num }}
              </em>
            </p>
          </router-link>
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
      type: Object, // Change this to Object
      required: true,
    },
  },
};
</script>