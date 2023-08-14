<template>
  <div class="text-center">
    <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }" class="color-line">
      <span class="text">Sukces!</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      token: null,
      colors: ["red"]
    };
  },
  mounted() {
    // Extract token from URL
    const tokenPattern = /\/account-confirm-email\/(.*)$/;
    const match = window.location.href.match(tokenPattern);

    if (match && match[1]) {
      this.token = match[1];
      // Call ConfirmEmail() function
      this.ConfirmEmail();
    } else {
      console.error('Token not found in URL');
    }
    window.location.href = '/log-in';
  },
  methods: {
    async ConfirmEmail() {
      try {
        console.log(this.token)
        const response = await axios.get(`/auth/registration/account-confirm-email/${this.token}/`);

        console.log('Email confirmation successful:', response.data);
        // Redirect to login page or display a success message
      } catch (error) {
        console.error('Error confirming email:', error);
        // Display an error message
      }
    },
  },
};
</script>

<style scoped>
.color-line {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.text {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>