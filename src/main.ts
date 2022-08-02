import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import store from '@/store/index'
import "@/assets/style/global.less"
import router from "@/router";
import {createPinia} from "pinia";
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia(); // 声明pinia在main.ts里调用，并添加了可持续化
pinia.use(piniaPersist);

const app = createApp(App)

// createApp(App).mount('#app')
app
    .use(pinia)
    .use(router)
    .mount('#app')

