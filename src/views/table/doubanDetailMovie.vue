<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getDoubanDetail } from '@/api/douban'
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { detailMovieMessage, movieDataType, writerData } from '@/typing/newMovieData'

const router = useRouter()
const route = useRoute()
const doubanId = ref('')
const spanningLogo = ref(false)
const detailMovieIfnfo = ref({} as detailMovieMessage)
const movieDataArr = ref([] as movieDataType)
const actoDatarArr = ref([] as writerData)
const directorDataArr = ref([] as writerData)
const getDetailMovieMessage = async (id: string) => {
    spanningLogo.value = true
    try {
        const res = await getDoubanDetail({ id: id })
        detailMovieIfnfo.value = res
        movieDataArr.value = detailMovieIfnfo.value.data
        actoDatarArr.value = detailMovieIfnfo.value.actor
        directorDataArr.value = detailMovieIfnfo.value.director
        spanningLogo.value = false
        console.log(res)
    } catch (err: any) {
        message.error(`${err.response.data}`)
        spanningLogo.value = false
        console.log(err.response.data)
    }
}
const getParams = () => {
    doubanId.value = route.query.id as string
}
// const setTitle = (index: number) => {
//     return index === 0 ? '中文版' : '英文版'
// }
// const setTitle = enum {}
enum setTitle {
    '中文版',
    '英文版'
}
onMounted(async () => {
    // route.query
    // doubanId.value = route.query.id
    console.log(route.query)
    await getParams()
    getDetailMovieMessage(doubanId.value)
})
</script>

<template>
    <div>
        <a-spin :spinning="spanningLogo">
            <a-card class="movie-detail-style">
                <div class="movie-introduce-style" v-for="item, index in movieDataArr" :key="item.id">
                    <a-image :src="item.poster" class="movie-poster-style"></a-image>
                    <div class="movie-introduce-text-style">
                        <h3>{{ setTitle[index] }}</h3>
                        <span class="common-text-style">电影名：{{ item.name }}</span>
                        <span class="common-text-style">类型：{{ item.genre }}</span>
                        <span class="common-text-style">语言：{{ item.language }}</span>
                        <span class="common-text-style">国家：{{ item.country }}</span>
                        <span class="common-text-style">语言：{{ item.lang }}</span>
                        <span class="common-text-style">详情简介：{{ item.description }}</span>
                        <div class="movie-introduce-special-style" v-if="index === 0">
                            <span class="common-text-style">电影别名：{{ detailMovieIfnfo.alias }}</span>
                            <span class="common-text-style">上映日期：{{ detailMovieIfnfo.dateReleased }}</span>
                            <span class="common-text-style">IMB评分：{{ detailMovieIfnfo.imdbRating }}</span>
                            <span class="common-text-style">IMB评论：{{ detailMovieIfnfo.imdbVotes }}</span>
                            <span class="common-text-style">豆瓣评论：{{ detailMovieIfnfo.doubanVotes }}</span>
                            <span class="common-text-style">豆瓣评分：{{ detailMovieIfnfo.doubanRating }}</span>
                        </div>
                    </div>
                    <div class="movie-image-style">
                        <a-image :src="item.shareImage" class="movie-share-style" v-if="item.shareImage"></a-image>
                    </div>
                </div>
                <div class="actor-introduce-style">

                </div>
                <div class="director-introduce-style">

                </div>
                <a-back-top />
            </a-card>
        </a-spin>
    </div>
</template>


<style lang="less">
.movie-detail-style {
    display: flex;
    flex-direction: column;
    margin: 20px;
}

.movie-introduce-style {
    display: flex;
    margin: 10px 10px 30px 10px;
}

.movie-introduce-text-style {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-right: 30px;
}

.movie-image-style {
    display: flex;
    // flex-direction: column;
}

.common-text-style {
    font-size: 16px;
}

.movie-poster-style {
    width: 200px;
    height: 260px;
    border-radius: 8px;
    margin: 0 20px;
}

.movie-share-style {
    width: 600px;
    height: 250px;
}

.movie-introduce-special-style {
    display: flex;
    flex-direction: column;
}

.actor-introduce-style {}

.director-introduce-style {}
</style>