const asyncContantArray = [
    {
        path: "/extra",
        name: "extra",
        meta: {
            title: "额外展示",
        },
        component: () => import('@/views/extra.vue'),
    },
    {
        path: "/test",
        name: "test",
        meta: {
            title: "测试组件引用",
        },
        component: () => import('@/views/test.vue'),
    },
]
export default asyncContantArray
