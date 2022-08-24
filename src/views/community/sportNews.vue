<script lang="ts" setup>
import { onMounted } from 'vue'
import { getAllNews } from '@/api/news'
onMounted(() => {
    getData()
})
const allNews: any = []
const getData = async () => {
    const params = {
        page: 10,
    }
    const res = await getAllNews(params)
    console.log(res.data)
}
</script>
<template>
    <div>
        content3
    </div>
</template>
<style lang="less">
</style>