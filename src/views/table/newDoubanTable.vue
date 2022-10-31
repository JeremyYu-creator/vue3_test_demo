<script lang="ts" setup>
import { onMounted, ref, } from 'vue';
import { getDoubanNewData } from '@/api/douban'
import { topRequestParams } from '@/typing/newMovieData'
const getDoubanList = async () => {
    const params: topRequestParams = {
        type: 'Imdb',
        skip: 0,
        limit: 10,
        lang: 'Cn',
    }
    const res = await getDoubanNewData(params)
    console.log(res)
}
onMounted(() => {
    getDoubanList()
})
</script>
<template>
    <!--卡片形式的内容-->
    <div>

    </div>
</template>
<style lang="less">

</style>