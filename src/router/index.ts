//  src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import contantArray from "@/router/module/contant";
import asyncContantArray from "@/router/module/asyncContant";

const routes: Array<RouteRecordRaw> = [...contantArray, ...asyncContantArray] // 将两种类别的路由数组归于一个总route列表

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
