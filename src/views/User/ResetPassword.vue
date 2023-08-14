<!--Цей код виглядає правильним і добре структурованим для відновлення пароля через API з використанням Vue.js та
Axios для HTTP-запитів. На перший погляд він має вигляд функціонального та безпечного способу зміни пароля для
користувачів.-->

<!--Проте, є деякі зауваження та практики, які варто розглянути для забезпечення більшої безпеки та зручності:-->

<!--Перевірка складності паролів: Наразі ваш код не має логіки для перевірки складності нового пароля (наприклад,
 мінімальна довжина, наявність великих літер, цифр, спеціальних символів). Рекомендується додати таку перевірку
  перед відправкою запиту на сервер, щоб забезпечити безпеку пароля.-->

<!--Перевірка співпадіння нових паролів: Вже зараз у вашій формі є вимога для підтвердження нового пароля. Однак,
ви можете додати додаткову перевірку, щоб переконатися, що обидва поля "New password" та "Confirm new password"
 мають однакове значення перед відправкою на сервер.-->

<!--Обробка помилок: У вас вже є обробка помилок під час виконання POST-запиту з допомогою блоку try...catch.
Додатково, ви можете розглянути використання глобальної обробки помилок (error handler) у вашому Vue.js додатку,
щоб стандартизувати обробку помилок у всьому коді.-->

<!--Зберігання паролів: Зберігання паролів у текстовому форматі є небезпечним, особливо у випадку, якщо ваше
з'єднання не є зашифрованим. Рекомендованим методом зберігання паролів є зберігання їх у хеш-форматі з солью.
Однак, здається, що вам це не потрібно додавати до вашого Vue.js коду, оскільки зміна паролів відбувається на
стороні сервера, який, сподіваємося, вже правильно обробляє цей аспект.-->

<!--У загальному, якщо ви гарантуєте, що ваш сервер забезпечує безпечний та належний спосіб зміни пароля,
 код Vue.js, який ви надали, виглядає адекватним і має все необхідне для взаємодії зі зміною пароля через API.
  Запевняю вас, що є багато речей, які можна оптимізувати і розширити, але ці додаткові зауваження будуть корисні
   для забезпечення надійності та безпеки вашого додатку.-->





<template>
  <div>
    <form @submit.prevent="resetPassword">
      <label>New password:</label>
      <input type="password" v-model="newPassword1" required>
      <label>Confirm new password:</label>
      <input type="password" v-model="newPassword2" required>
      <button type="submit">Reset password</button>
    </form>
  </div>
</template>

<script>
import api from "@/components/kt/inter";

export default {
  data() {
    return {
      uid: null,
      token: null,
      newPassword1: '',
      newPassword2: '',
    };
  },
  mounted() {
    // Extract uid and token from URL
    const urlParts = window.location.pathname.split('/');
    const tokenIndex = urlParts.indexOf('password') + 4;
    this.uid = urlParts[tokenIndex - 1];
    this.token = urlParts[tokenIndex];
  },
  methods: {
    async resetPassword() {
      const data = {
        uid: this.uid,
        token: this.token,
        new_password1: this.newPassword1,
        new_password2: this.newPassword2,
      };
      try {
        const response = await api.post(`auth/password/reset/confirm/${this.uid}/${this.token}/`, data);
        console.log('Password reset successful:', response.data);
        // Redirect to login page or display a success message
      } catch (error) {
        console.error('Error resetting password:', error);
        // Display an error message
      }
    },
  },
};
</script>