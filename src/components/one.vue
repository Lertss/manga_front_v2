<template>
  <p>{{manga.review}}</p>
</template>

<style scoped>

</style>
<script>
export default {
  name: 'one',
  props: {
    manga: {
      type: Array,
      required: true
    }
  }
}
</script>