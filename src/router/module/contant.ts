const HelloWorld = () => import("@/components/first/HelloWorld.vue");
// const Home = () => import('@/views/Home.vue')
const contantArray = [
    {
        path: "/helloworld",
        name: "helloworld",
        meta: {
            title: "helloworld",
        },
        component: HelloWorld,
    },
    {
        path: "/login",
        name: 'login',
        meta: {
            title: 'login'
        },
        component: () => import('@/components/login/index.vue')
    },
    {
        path: '/:pathMatch(.*)',
        //访问主页的时候 重定向到index页面
        redirect: '/404',
    },
    {
        path: "/404",
        name: '404',
        meta: {
            title: '404'
        },
        component: () => import('@/components/404/404.vue')
    },
]
export default contantArray
