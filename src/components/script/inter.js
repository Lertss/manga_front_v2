import axios from 'axios';
import { VueCookieNext } from "vue-cookie-next";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

api.interceptors.request.use(
    config => {
        const refreshToken = VueCookieNext.getCookie('refreshToken');
        if (!refreshToken) {
            localStorage.setItem('isLoggedIn', 'false');

        }
        return config;
    },)


api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        let expirationDate
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = VueCookieNext.getCookie('refreshToken');

            if (!refreshToken) {
                // Відхиляємо запит,
                localStorage.setItem('isLoggedIn', 'false');
                // Оновити поточну сторінку
                location.reload();

                console.log("оскільки refreshToken відсутній")
                return Promise.reject(error);
            }
            //time Token
            if (refreshToken) {
                const refreshTokenData = JSON.parse(atob(refreshToken.split('.')[1])); // Декодування JWT
                const expirationTimestamp = refreshTokenData.exp * 1000; // Конвертація у мілісекунди
                expirationDate = new Date(expirationTimestamp);

                console.log('Час активності refreshToken:', expirationDate);
            } else {
                console.log('refreshToken не знайдено у куках.');
            }
            console.log(expirationDate)
            //time UTC
            const now = new Date();
            const utcTimestamp = now.getTime();
            if (utcTimestamp> expirationDate){
                console.log('token delate')
                // Термін дії refreshToken минув, видаляємо кукі та переадресовуємо користувача на сторінку входу
                VueCookieNext.removeCookie('refreshToken');
                VueCookieNext.removeCookie('accessToken');
                localStorage.setItem('isLoggedIn', 'false');
                // Оновити поточну сторінку
                location.reload();
                // Змініть шлях відповідно до вашої реалізації маршрутів
                return Promise.reject(error);
            }

            try {


                const response = await api.post('/auth/token/refresh/', { refresh: refreshToken })

                // Оновіть токен у вашому стані або локальному сховищі
                const newAccessToken = response.data.access;

                // Оновлюємо заголовок Authorization у вихідному запиті
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                VueCookieNext.setCookie('accessToken', newAccessToken, '2m');
                // Повторно виконуємо вихідний запит з оновленими заголовками
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.setItem('isLoggedIn', 'false');
                // Оновити поточну сторінку
                location.reload();

                console.error('Помилка оновлення токену:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default api;
