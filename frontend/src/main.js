import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';


const app = createApp(App);

axios.defaults.baseURL = 'http://127.0.0.1:5000';
const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:5000'
});

app.use(router);
app.use(store);
app.use(VueToast);
app.config.globalProperties.$axios = axiosInstance;


app.mount('#app');
