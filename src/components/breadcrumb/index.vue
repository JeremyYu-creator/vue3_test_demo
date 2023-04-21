<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import router from '@/router';
import { watch, ref, onMounted, onUnmounted } from 'vue';
import useStore from '@/store/index'
import mittEvent from '@/mitt/grandFather'


const currentRouter = useRouter()
// const route = useRoute()
// const currentRoute = ref('')
watch(() => currentRouter.currentRoute.value, (newValue, oldValue) => {
    console.log('---监听到router变化---', newValue.name, oldValue)
},
    { immediate: true })
const routes = router.getRoutes()
// console.log('--头部拿的router---', currentRouter.currentRoute.value, route.fullPath)
console.log('--当前路由列表--', routes)
const basePath = 'Home'
const jumpRouter = (path: any) => {
    console.log(123312,path)
}

// test
const { menu } = useStore()
const breadcrumbList = ref(menu.breadcrumbArr)

onMounted(() => {
    breadcrumbList.value = menu.breadcrumbArr
})
// 修改breadcrumb
mittEvent.on('breadCrumb' ,(breadcrumbArr: any ) => {
    breadcrumbList.value = breadcrumbArr
})
// 销毁breadcrumb事件
onUnmounted(() => {
    mittEvent.off('breadCrumb')
})
</script>
<template>
    <div>
        <a-breadcrumb style="margin: 16px 0;">
            <template v-for="(item, index) in breadcrumbList" ::key="index">
                <a-breadcrumb-item v-if="!item.child">
                    <router-link :to="{name: item.path}">{{ item.name }}</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item v-else>
                    {{ item.name }}
                </a-breadcrumb-item>
            </template>
        </a-breadcrumb>
    </div>
</template>
<style lang="less">
</style>