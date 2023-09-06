<template>
  <div class="container">
    <div v-for="comment in comments" :key="comment.content" class="rounded border border-warning m-3 p-3">
      <!-- Виклик методу extractChapterIdentifier для виводу ідентифікатора розділу в консоль -->
      <div v-if="comment.manga !== null">
        <router-link :to="comment.manga_url" class="no-underline fw-bold">Manga: {{ comment.manga_name }}</router-link>
      </div>
      <div v-else>
        <router-link :to="'/' + extractChapterIdentifier(comment.chapter_url) + '/' + comment.chapter_url" class="no-underline fw-bold">
          <!-- Виведення ідентифікатора розділу в консоль -->
          Chapter: {{ comment.chapter_name }} || Manga: {{ extractChapterIdentifier(comment.chapter_url) }}
        </router-link>
      </div>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>



<script>
export default {
  name: "CommentsProfile",
  props: {
    comments: Object,
  },
  methods: {
    extractChapterIdentifier(chapterUrl) {
      // Використовуємо регулярний вираз для виділення ідентифікатора розділу
      const regex = /(.+)-\d+$/;
      const match = chapterUrl.match(regex);

      if (match) {
        // Якщо є збіг, виводимо результат в консоль
        console.log("Chapter Identifier:", match[1]);
        return match[1];
      } else {
        // Якщо збіг не знайдено, виводимо повідомлення про помилку
        console.error("Invalid chapter URL format:", chapterUrl);
        return null;
      }
    },
  },
};
</script>
