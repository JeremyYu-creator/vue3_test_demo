import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'

router.beforeEach((to, from, next) => {
    nProgress.start()
    console.log('asdsdsa')
    next()
})

router.afterEach((to, from, next) => {
    nProgress.done()
})
