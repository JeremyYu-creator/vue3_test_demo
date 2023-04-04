import { createApp } from 'vue'
// import './style.css'
import '@/permisson.ts'
import App from './App.vue'
// import store from '@/store/index'
import "@/assets/style/global.less"
import router from "@/router";
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue';
import svgIcon from '@/components/svgComponent/svgIcon.vue'
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import translate from './plugins/translate';
const pinia = createPinia(); // 声明pinia在main.ts里调用，并添加了可持续化
pinia.use(piniaPersist);
import * as antIcons from '@ant-design/icons-vue'
import './assets/fontFamily/font.less'

const app = createApp(App)
// 注册组件
Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key as keyof typeof antIcons])
})
// 添加到全局
app.config.globalProperties.$antIcons = antIcons
app.config.errorHandler = (err, vm, info) => {
    console.warn('---全局app.vue报错----',info)
}
// vue自定义指令
app.directive('color', (el, binding) => {
    // 这会在 `mounted` 和 `updated` 时都调用
    el.style.color = binding.value
})
app.use(translate, {
    greetings: {
        hello: 'Bonjour!'
    }
})
app
    .component('svg-icon', svgIcon)
    .use(pinia)
    .use(router)
    .use(Antd)
    .mount('#app')

