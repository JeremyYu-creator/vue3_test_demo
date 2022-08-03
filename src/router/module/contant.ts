const HelloWorld = () => import("@/components/first/HelloWorld.vue");
// const Home = () => import('@/views/Home.vue')
const contantArray = [
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
                component: () => import ('@/views/map/chart.vue'),
            },
        ]
    },
    {
        path: "/helloworld",
        name: "helloworld",
        meta: {
            title: "helloworld",
        },
        component: HelloWorld,
    },
]
export default contantArray
