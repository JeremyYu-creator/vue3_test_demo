<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getDoubanDetail } from '@/api/douban'
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { detailMovieMessage, movieDataType, commonType } from '@/typing/newMovieData'

const router = useRouter()
const route = useRoute()
const doubanId = ref('')
const spanningLogo = ref(false)
const detailMovieIfnfo = ref({} as detailMovieMessage)
const movieDataArr = ref([] as movieDataType)
const actorDataArr = ref([] as commonType)
const directorDataArr = ref([] as commonType)
const writerDataArr = ref([] as commonType)
const isNormal = ref(false);
const errorMessage = ref('')
const getDetailMovieMessage = async (id: string) => {
    spanningLogo.value = true
    try {
        const res = await getDoubanDetail({ id: id })
        isNormal.value = true
        detailMovieIfnfo.value = res
        movieDataArr.value = detailMovieIfnfo.value.data
        actorDataArr.value = detailMovieIfnfo.value.actor
        directorDataArr.value = detailMovieIfnfo.value.director
        writerDataArr.value = detailMovieIfnfo.value.writer
        spanningLogo.value = false
        console.log(res)
    } catch (err: any) {
        message.error(`${err.response.data}`)
        isNormal.value = false
        spanningLogo.value = false
        console.log(err.response.data)
        errorMessage.value = err.response.data
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
            <a-card class="movie-detail-style" v-if="isNormal">
                <h3>电影详情</h3>
                <div class="movie-introduce-style" v-for="item, index in movieDataArr" :key="item.id">
                    <a-image :src="item.poster" class="movie-poster-style"></a-image>
                    <div class="movie-introduce-text-style">
                        <h3>{{ setTitle[index] }}</h3>
                        <span class="common-text-style"><b>电影名：</b>{{ item.name }}</span>
                        <span class="common-text-style"><b>类型：</b>{{ item.genre }}</span>
                        <span class="common-text-style"><b>语言：</b>{{ item.language }}</span>
                        <span class="common-text-style"><b>国家：</b>{{ item.country }}</span>
                        <span class="common-text-style"><b>语言：</b>{{ item.lang }}</span>
                        <span class="common-text-style"><b>详情简介：</b>{{ item.description }}</span>
                        <div class="movie-introduce-special-style" v-if="index === 0">
                            <span class="common-text-style">
                                <b>电影别名：</b>{{ detailMovieIfnfo.alias }}</span>
                            <span class="common-text-style"><b>上映日期：</b>{{ detailMovieIfnfo.dateReleased }}</span>
                            <span class="common-text-style"><b>IMB评分：</b>{{ detailMovieIfnfo.imdbRating }}</span>
                            <span class="common-text-style"><b>IMB评论：</b>{{ detailMovieIfnfo.imdbVotes }}</span>
                            <span class="common-text-style"><b>豆瓣评论：</b>{{ detailMovieIfnfo.doubanVotes }}</span>
                            <span class="common-text-style"><b>豆瓣评分：</b>{{ detailMovieIfnfo.doubanRating }}</span>
                        </div>
                    </div>
                    <div class="movie-image-style">
                        <a-image :src="item.shareImage" class="movie-share-style" v-if="item.shareImage"></a-image>
                    </div>
                </div>
                <div class="person-introduce-style">
                    <div class="common-introduce-style">
                        <h3>演员表</h3>
                        <div class="common-row-style" v-for="item in actorDataArr" :key="item.id">
                            <div v-for="iitem in item.data" :key="iitem.id" class="common-single-style">
                                <span>{{ iitem.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="common-introduce-style">
                        <h3>导演表</h3>
                        <div class="common-row-style" v-for="item in directorDataArr" :key="item.id">
                            <div class="common-single-style" v-for="iitem in item.data" :key="iitem.id">
                                <span>{{ iitem.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="common-introduce-style">
                        <h3>编剧表</h3>
                        <div class="common-row-style" v-for="item in writerDataArr" :key="item.id">
                            <div class="common-single-style" v-for="iitem in item.data" :key="iitem.id">
                                <span>{{ iitem.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <a-back-top />
            </a-card>
            <Error v-if="!isNormal" :message="errorMessage"/>
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
    .ant-image {
        .ant-image-img {
            width: 250px;
            height: 370px;
        }
        .ant-image-mask {
            width: 250px;
            height: 370px;
        }
    }
}

.movie-introduce-text-style {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: 0 30px;
}

.movie-image-style {
    display: flex;
    // flex-direction: column;
    .ant-image {
        .ant-image-img {
            width: 650px;
            height: 300px;
        }
        .ant-image-mask {
            width: 650px;
            height: 300px;
        }
    }
}

.common-text-style {
    font-size: 15px;
    font-family: PingFangSC-Regular;
}




.movie-share-style {
    width: 650px;
    height: 300px;
}

.movie-introduce-special-style {
    display: flex;
    flex-direction: column;
}

.person-introduce-style {
    display: flex;
    justify-content: flex-start;
}

// .common-introduce-style {
//     width: 400px;
// }

.common-row-style {
    display: flex;
    justify-content: flex-start;
    margin-right: 30px;
}

.common-single-style {
    margin-right: 30px;
}

// .director-introduce-style {
//     display: flex;
//     justify-content: flex-start;
//     margin-right: 100px;
// }
</style>