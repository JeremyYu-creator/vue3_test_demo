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
    {
        path: "/",
        name: "index",
        meta: {
            title: "首页",
        },
        component: () => import('@/views/Home.vue'),
        // component:Home
        children: [
            {
                path: "map",
                name: "map",
                meta: {
                    title: "地图",
                },
                component: () => import('@/views/map/map.vue'),
            },
            {
                path: "data",
                name: "line",
                meta: {
                    title: "数据",
                },
                component: () => import('@/views/baseData/baseData.vue'),
            },
            {
                path: "commonTable",
                name: "common_table",
                meta: {
                    title: "普通表格",
                },
                component: () => import('@/views/table/commonTable.vue'),
            },
            {
                path: "douban",
                name: "douban_table",
                meta: {
                    title: "豆瓣表格",
                },
                component: () => import('@/views/table/doubanTable.vue'),
            },
            {
                path: "tencent",
                name: "qq",
                meta: {
                    title: "腾讯页面",
                },
                component: () => import('@/views/community/index.vue'),
            },
            {
                path: "3d",
                name: "3d",
                meta: {
                    title: "3d页面",
                },
                component: () => import('@/views/canvas/three.vue'),
            },
            {
                path: "chart",
                name: "chart",
                meta: {
                    title: "图表",
                },
                component: () => import('@/views/canvas/index.vue'),
            },
        ]
    },
]
export default asyncContantArray
