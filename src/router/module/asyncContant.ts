import HomeVue from '@/views/Home.vue'
import extraVue from '@/views/extra.vue'
const asyncContantArray = [
    // {
    //     path: "/extra",
    //     name: "extra",
    //     meta: {
    //         title: "额外展示",
    //     },
    //     component: () => import('@/views/extra.vue'),
    // },
    {
        path: "/",
        name: "index",
        meta: {
            title: "首页",
        },
        // components: () => import('@/views/Home.vue'),
        components: {
            default: HomeVue,
            extra: extraVue,
        },
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
            {
                path: "3dWhole",
                name: "3dWhole",
                alias: '5-4',
                meta: {
                    title: "3D环形",
                },
                component: () => import('@/views/three/wholeHouse.vue'),
            },
            {
                path: "animation",
                name: "animation",
                alias: '5-5',
                meta: {
                    title: "animation",
                },
                component: () => import('@/views/animation/index.vue'),
            },
            {
                path: "/test",
                name: "test",
                alias: '5-5',
                meta: {
                    title: "测试组件引用",
                },
                component: () => import('@/views/test.vue'),
            },
            {
                path: "/createvue",
                name: "create",
                alias: '6-1',
                meta: {
                    title: "测试vue3",
                },
                component: () => import('@/views/testVue3/index.vue'),
            },
            {
                path: "/waterfall",
                name: "waterfall",
                alias: '6-2',
                meta: {
                    title: "瀑布流初探",
                },
                component: () => import('@/views/waterfall/index.vue'),
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
