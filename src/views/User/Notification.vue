<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="list-group rounded-4">
          <router-link
              v-for="notification in notifications"
              :key="notification.id"
              :to="notification.chapter.manga.url + notification.chapter.slug"
              @click="markAsRead(notification.id)"
              class="list-group-item list-group-item-action flex-column align-items-start rounded-2 m-1 border border-warning bg-light"
          >
            <div class="d-flex w-100 justify-content-between">
              <div class="order-2"> <!-- Зміна порядку елементів тексту і картинки -->
                <h5 class="mb-1">
                  Chapter <strong>{{ notification.chapter.chapter_number }}</strong>
                  of Volume <strong>{{ notification.chapter.volume }}</strong>
                  was added to the <strong>{{ notification.chapter.manga.name_manga }}</strong> manga.
                </h5>
              </div>

              <div class="d-flex align-items-center order-1"> <!-- Зміна порядку елементів тексту і картинки -->
                <img
                    :src="notification.chapter.manga.thumbnail"
                    alt="s"
                    width="40"
                    height="60"
                    class="me-3"
                >
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { VueCookieNext } from "vue-cookie-next";
import api from "@/components/kt/inter";

export default {
  name: "Notification",
  data() {
    return {
      notifications: [],
    };
  },
  created() {
    const accessToken = VueCookieNext.getCookie("accessToken");
    if (accessToken) {
      this.getNotification();
    }
  },
  methods: {
    async getNotification() {
      try {
        const accessToken = VueCookieNext.getCookie("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };
        const response = await api.get(`/auth/notifications/`, { headers });
        this.notifications = response.data;
        console.log("Notification", this.notifications);
      } catch (error) {
        console.log(error);
      }
    },
    async markAsRead(notification) {
      try {
        const accessToken = VueCookieNext.getCookie("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };
        const not_id = notification
        console.log("kuda", notification)
        // Оновлюємо статус is_read для повідомлення через API
        await api.patch(`/auth/notifications/${not_id}/mark-as-read/`, {}, { headers });
        // Оновлюємо статус is_read локально в компоненті
        notification.is_read = true;
        console.log("Marked as read:", notification);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
