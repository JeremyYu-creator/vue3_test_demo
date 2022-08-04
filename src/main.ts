import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import store from '@/store/index'
import "@/assets/style/global.less"
import router from "@/router";
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue';
import {createPinia} from "pinia";
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia(); // 声明pinia在main.ts里调用，并添加了可持续化
pinia.use(piniaPersist);
import * as antIcons from '@ant-design/icons-vue'

const app = createApp(App)
// 注册组件
Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key as keyof typeof antIcons])
})
// 添加到全局
app.config.globalProperties.$antIcons = antIcons

app
    .use(pinia)
    .use(router)
    .use(Antd)
    .mount('#app')

