import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import api from "@/components/script/inter";
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

app.use(store).use(router, axios, api).mount('#app')

