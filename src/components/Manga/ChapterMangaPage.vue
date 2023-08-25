<template>
  <div>
    <div class="rounded" v-for="chap in manga.chapter" :key="chap.id">
      <div style="display: flex; align-items: flex-start;">
        <div>
          <router-link :to="chap.get_absolute_url">
            <h4 class="text-dark figure-caption " style="margin-top: 0;">{{chap.title}}</h4>
            <p>
              <em class="text-dark figure-caption">
                Tom 1 Chapter {{ chap.num }}
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