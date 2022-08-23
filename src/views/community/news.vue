<script lang="ts" setup>
import { onMounted } from 'vue'
import { getAllNews } from '@/api/news'
onMounted(() => {
    getData()
})
const getData = async() => {
    const params = {
        page: 10,
    }
    const res = await getAllNews(params)
    console.log(res)
}
</script>
<template>
    <div>
        content1
    </div>
</template>
<style lang="less">
</style>