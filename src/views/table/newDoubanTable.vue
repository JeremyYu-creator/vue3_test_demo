<script lang="ts" setup>
import { onMounted, ref, } from 'vue';
import { getDoubanNewData } from '@/api/douban'
import { topRequestParams, wmdbResponse } from '@/typing/newMovieData'
import type { SelectProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const movieListData = ref([] as wmdbResponse)
// a-select使用官方的ts写法
const doubanSelectOptions = ref<SelectProps['options']>([
    {
        value: '10',
        label: '10',
    },
    {
        value: '20',
        label: '20',
    },
    {
        value: '50',
        label: '50',
    },
    {
        value: '100',
        label: '100',
    },
])
const selectType = ref('10')
const getDoubanList = async () => {
    spinning.value = true
    try {
        const params: topRequestParams = {
            type: 'Douban', // 注意好类型，否则请求会报错, whiteList[Imdb, Douban]
            skip: 0, // 起始number
            // limit: 10, // 取得长度值
            limit: Number(selectType.value), // 取得长度值
            lang: 'Cn', // 语言类型
        }
        const res = await getDoubanNewData(params)
        movieListData.value = res
        spinning.value = false
        pageTitle.value = `豆瓣高分榜TOP${selectType.value}`
        console.log(movieListData.value)
    } catch (err) {
        spinning.value = false
        console.log(err)
    }

}
const handleChange = () => {
    console.log('触发了change事件', selectType.value)
    getDoubanList()
}
const spinning = ref(true)
const pageTitle = ref('')
const onClick = (id: string) => {
    console.log('onClick', id)
    router.push(
        {
            name: 'detailMovie',
            query: {
                id: id
            }
        }
    )
}
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
            <h2>{{ pageTitle }}</h2>
            <div class="douban-block-select-style">
                <span>选择条数：</span>
                <a-select :options="doubanSelectOptions" v-model:value="selectType" @change="handleChange"
                    class="douban-single-select-style">
                </a-select>
            </div>
            <div class="movie-block-style">
                <a-card v-for="item in movieListData" class="movie-single-style" :key="item.id" hoverable>
                    <div v-for="iitem in item.data" :key="iitem.id" @click="onClick(item.doubanId)">
                        <div class="movie-pic-style">
                            <div class="movie-detail-style">
                                <section class="movie-row-style"><b>电影名：</b>{{ iitem.name }}</section>
                                <section class="movie-row-style">上映国家：{{ iitem.country }}</section>
                                <section class="movie-row-style">上映时间：{{ item.dateReleased }}</section>
                                <section class="movie-row-style">类型：{{ iitem.genre }}</section>
                                <section class="movie-row-style">语言：{{ iitem.language }}</section>
                            </div>
                            <a-image :src="iitem.poster" class="poster-style"></a-image>
                        </div>
                        <section class="movie-row-style">电影id：{{ iitem.id }}</section>
                        <section class="movie-row-style">影片描述：{{ iitem.description }}</section>
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
    // justify-content: space-around;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow: auto;
}

.movie-single-style {
    // width: 350px;
    width: 31%;
    height: 380px;
    margin: 20px 10px;
}

.poster-style {
    width: 100px;
    height: 140px;
    border-radius: 8px;
}

.movie-row-style {
    margin: 5px 0;
}

.movie-pic-style {
    display: flex;
    justify-content: space-between;
}
</style>