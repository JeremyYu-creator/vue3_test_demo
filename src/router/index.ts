//  src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const HelloWorld = () => import("@/components/first/HelloWorld.vue");
// const Home = () => import('@/views/Home.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        meta: {
            title: "首页",
        },
        component: () => import('@/views/Home.vue'),
        // component:Home
    },
    {
        path: "/helloworld",
        name: "helloworld",
        meta: {
            title: "helloworld",
        },
        component: HelloWorld,
    },
    {
        path: "/extra",
        name: "extra",
        meta: {
            title: "额外展示",
        },
        component: () => import ('@/views/extra.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
