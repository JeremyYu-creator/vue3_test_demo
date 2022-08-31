import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import useStore from '@/store'

/***
 * 注意：在这种单独使用的文件时，如果需要引入pinia的内容，需要在里面进行声明，否则会报错
 */
router.beforeEach((to, from, next) => {
    const { user } = useStore()
    nProgress.start()
    if (user.token) {
        next()
    } else if (to.path === '/login') {
        next()
    } else {
        next('/login')
    }

})

router.afterEach((to, from, next) => {
    nProgress.done()
})
