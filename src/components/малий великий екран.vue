<template>
  <div>
    <header v-if="isLargeScreen" class="large-screen-header">
      <!-- Ваш код для великого екрану тут -->
    </header>
    <header v-else class="small-screen-header">
      <!-- Ваш код для малого екрану тут -->
    </header>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const isLargeScreen = ref(window.innerWidth > 800);

    const updateScreenSize = () => {
      isLargeScreen.value = window.innerWidth > 800;
    };

    onMounted(() => {
      window.addEventListener('resize', updateScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateScreenSize);
    });

    return { isLargeScreen };
  },
};
</script>

<style scoped>
.large-screen-header {
  /* Ваші стилі для великого екрану тут */
}

.small-screen-header {
  /* Ваші стилі для малого екрану тут */
}
</style>

<!--Сірі букви class add :font-italic text-muted-->