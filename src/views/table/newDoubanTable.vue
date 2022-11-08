<script lang="ts" setup>
import { onMounted, ref, } from 'vue';
import { getDoubanNewData } from '@/api/douban'
import { topRequestParams, wmdbResponse } from '@/typing/newMovieData'
import type { SelectProps } from 'ant-design-vue';
const movieListData = ref([] as wmdbResponse)
// a-select使用官方的ts写法
const doubanSelectOptions = ref<SelectProps['options']>([
    {
        value: '50',
        label: '50',
    },
    {
        value: '100',
        label: '100',
    },
])
const selectType = ref('50')
const getDoubanList = async () => {
    const params: topRequestParams = {
        type: 'Douban', // 注意好类型，否则请求会报错, whiteList[Imdb, Douban]
        skip: 0, // 起始number
        limit: 10, // 取得长度值
        lang: 'Cn', // 语言类型
    }
    const res = await getDoubanNewData(params)
    movieListData.value = res
    spinning.value = false
    console.log(movieListData.value)
}
const handleChange = () => {
    console.log('触发了change事件', selectType.value)
}
const spinning = ref(true)
onMounted(async () => {
    try {
        await getDoubanList()
    } catch (err) {
        console.log(err)
    }
})
</script>
<template>
    <a-spin :spinning="spinning" class="loading-style">
        <!--卡片形式的内容-->
        <div class="main-block">
            <div class="douban-block-select-style">
                <a-select :options="doubanSelectOptions" v-model:value="selectType" @change="handleChange"
                    class="douban-single-select-style">
                </a-select>
            </div>
            <div class="movie-block-style">
                <a-card v-for="item in movieListData" class="movie-single-style" :key="item.id" hoverable>
                    <div v-for="iitem in item.data" :key="iitem.id">
                        <section class="movie-row-style"><b>电影名：</b>{{ iitem.name }}</section>
                        <section class="movie-row-style">上映国家：{{ iitem.country }}</section>
                        <section class="movie-row-style">类型：{{ iitem.genre }}</section>
                        <section class="movie-row-style">语言：{{ iitem.language }}</section>
                        <section class="movie-row-style">电影id：{{ iitem.id }}</section>
                        <section class="movie-row-style">影片描述：{{ iitem.description }}</section>
                        <a-image :src="iitem.poster" class="poster-style"></a-image>
                    </div>
                </a-card>
            </div>
        </div>
    </a-spin>
</template>
<style lang="less">
.main-block {
    height: 100%;
    width: 100%;
}

.douban-block-select-style {
    margin: 20px 0;
}

.douban-single-select-style {
    width: 120px;
}

.movie-block-style {
    height: 500px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: auto;
}

.movie-single-style {
    width: 350px;
    height: 400px;
    margin: 20px 0;
}

.poster-style {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
}

.movie-row-style {
    margin: 5px 0;
}

// .loading-style {
//     position: absolute;
//     top: 50%;
//     left: 50%;
// }
</style>