<template>
  <h2>Description</h2>
  <p>{{ manga.review }}</p>
</template>

<style scoped>

</style>

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
