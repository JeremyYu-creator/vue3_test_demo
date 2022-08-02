//  src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import contantArray from "@/router/module/contant";
import asyncContantArray from "@/router/module/asyncContant";

const routes: Array<RouteRecordRaw> = [...contantArray, ...asyncContantArray];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
