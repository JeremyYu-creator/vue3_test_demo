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
                alias: '4-1',
                meta: {
                    title: "地图",
                },
                component: () => import('@/views/map/map.vue'),
            },
            {
                path: "data",
                name: "line",
                alias: '3-1',
                meta: {
                    title: "数据",
                },
                component: () => import('@/views/baseData/baseData.vue'),
            },
            {
                path: "commonTable",
                name: "common_table",
                alias: '1-1-1',
                meta: {
                    title: "普通表格",
                },
                component: () => import('@/views/table/commonTable.vue'),
            },
            {
                path: "douban",
                name: "douban_table",
                alias: '1-1-2',
                meta: {
                    title: "豆瓣表格",
                },
                component: () => import('@/views/table/doubanTable.vue'),
            },
            {
                path: "tencent",
                name: "tencent",
                alias: '2-1',
                meta: {
                    title: "腾讯页面",
                },
                component: () => import('@/views/community/index.vue'),
            },
            {
                path: "wechat",
                name: "wechat",
                alias: '2-2',
                meta: {
                    title: "微信页面",
                },
                component: () => import('@/views/table/newDoubanTable.vue'),
            },
            {
                path: "3d",
                name: "3d",
                alias: '5-1',
                meta: {
                    title: "3d页面",
                },
                component: () => import('@/views/canvas/three.vue'),
            },
            {
                path: "chart",
                name: "chart",
                alias: '5-2',
                meta: {
                    title: "图表",
                },
                component: () => import('@/views/canvas/index.vue'),
            },
            {
                path: "canvas",
                name: "canvas",
                alias: '5-3',
                meta: {
                    title: "canvas&svg",
                },
                component: () => import('@/views/canvas/canvas.vue'),
            },
        ]
    },
    {
        path: "/detailMovie",
        name: "detailMovie",
        meta: {
            title: "豆瓣电影详情",
        },
        component: () => import('@/views/table/doubanDetailMovie.vue'),
    },
]
export default asyncContantArray
