<script lang="ts" setup>
import { getTableData } from '@/api/table'
import { onMounted, ref } from 'vue';
import { subjectsData } from '@/typing/movie'
onMounted(() => {
    getData()
})
const doubanData = ref([] as subjectsData)
const title = ref('')
const getData = async () => {
    const params = {
        apikey: '0df993c66c0c636e29ecbb5344252a4a'
    }
    try {
        const res = await getTableData(params)
        doubanData.value = res.subjects
        title.value = res.title
        star.value = res.subjects[currentIndex.value].rating.average / 10 * 5
        realStar.value = res.subjects[currentIndex.value].rating.average
        loading.value = false
        console.log(doubanData.value[0], star.value)
    } catch (err) {
        console.log(err)
        doubanData.value = []
        loading.value = false
    }
}
const loading = ref(true)
const currentIndex = ref(0) // 设置初始的电影索引值
const star = ref(0) // 计算渲染星星的评分
const realStar = ref(0) // 真实评分
const visible = ref(false)
const seeDetail = (url: string) => {
    window.open(url, '__blank')
}
const seeMore = () => {
    visible.value = true
}
const checkDetail = (index: number) => {
    currentIndex.value = index
    visible.value = false
}

</script>
<template>
    <a-card :loading="loading" :title="title">
        <div class="block-style" v-for="(item, index) in doubanData" :key="item.id">
            <div v-if="index === currentIndex">
                <h1>{{  item.title  }}({{  item.original_title  }})</h1>
                <div class="up-style">
                    <a-image :src="item.images.large" class="cover-style" />
                    <div class="right-style">
                        <div class="row-style">上线年份: {{  item.year  }}年</div>
                        <div class="row-style">时长: {{  item.durations[0]  }}</div>
                        <div class="tag-block-style">
                            <div v-for="iitem in item.genres" :key="iitem">
                                <a-tag color="#2db7f5" class="tag-style">{{  iitem  }}</a-tag>
                            </div>
                        </div>
                        <div class="tag-block-style">
                            <span>上映: </span>
                            <div v-for="iitem in item.pubdates" :key="iitem">
                                {{  iitem  }}
                            </div>
                        </div>
                        <div>
                            <span>评分: </span>
                            <a-rate v-model:value="star" disabled allow-half />
                            <span style="margin-left: 10px">{{  realStar  }}</span>
                        </div>
                        <div class="edit-style">
                            <a-button type="primary" @click="seeMore">查看更多</a-button>
                            <a-button type="primary" @click="seeDetail(item.alt)">查看详情</a-button>
                        </div>
                    </div>
                </div>
                <div class="down-style">
                    <div class="title-style">
                        <span style="margin-right:300px">演员表</span>
                        <span>导演表</span>
                    </div>
                    <div style="display: flex; align-items: center">
                        <div class="actor-style">
                            <a-carousel autoplay arrows :dots="false">
                                <!-- <template #customPaging="props">
                                    <a>
                                        <img :src="item.casts[props.i].avatars.large" style="width: 100px;height: 50px;" />
                                    </a>
                                </template> -->
                                <div v-for="iitem in item.casts" :key="iitem.id">
                                    <div>
                                        <a-image :src="iitem.avatars.large" class="actor-pic-style" />
                                    </div>
                                    <div class="actor-name-style">
                                        {{  iitem.name  }}({{  iitem.name_en  }})
                                    </div>
                                </div>
                            </a-carousel>
                        </div>
                        <div class="actor-style">
                            <a-carousel autoplay :dots="false">
                                <div v-for="iitem in item.directors" :key="iitem.id">
                                    <div>
                                        <a-image :src="iitem.avatars.large" class="actor-pic-style" />
                                    </div>
                                    <div class="actor-name-style">
                                        {{  iitem.name  }}({{  iitem.name_en  }})
                                    </div>
                                </div>
                            </a-carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-card>
    <a-drawer v-model:visible="visible" title="近期电影详情" placement="right" size="large">
        <div v-for="(item, index) in doubanData" :key="item.id">
            <a-card class="movie-card-style">
                <div class="movie-row-style">
                    <a-image :src="item.images.large" style="card-image-style" />
                    <div class="movie-column-style">
                        <div class="movie-title-style" @click="checkDetail(index)">{{  item.title  }}({{
                             item.original_title  }})</div>
                        <div class="movie-year-style">{{  item.year  }}</div>
                    </div>
                </div>
            </a-card>
        </div>
    </a-drawer>
</template>
<style lang="less">
.block-style {
    display: flex;
    flex-direction: column;
}

.up-style {
    display: flex;
}

.ant-image-img{
    width: 270px;
}

.cover-style {
    width: 270px;
    height: 380px;
}

.right-style {
    font-size: 16px;
    margin-left: 80px;
}

.row-style {
    margin-bottom: 20px;
}

.tag-block-style {
    display: flex;
    margin-bottom: 20px;
}

.tag-style {
    width: 60px;
    height: 30px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border-radius: 4px;
}

.actor-style {
    width: 168px;
    height: 170px;
    margin-top: 20px;
    margin-right: 185px;
}

.actor-pic-style {
    width: 168px;
    height: 128px;
    object-fit: cover;
}

.down-style {
    margin-top: 30px;
}

.title-style {
    font-size: 18px;
    font-weight: 500;
}

.actor-name-style {
    display: flex;
    justify-content: center;
    margin-top: 5px;
}

.edit-style {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.movie-row-style {
    display: flex;
}

.movie-column-style {
    margin-left: 30px;
}

.movie-title-style {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 20px;
    cursor: pointer;
}

.movie-year-style {
    font-size: 16px;
}

.card-image-style {
    width: 270px;
    height: 405px;
    object-fit: cover;
    .ant-image-img{
        width: 270px;
    }
}

// .ant-carousel :deep(.slick-dots) {
//     position: relative;
//     height: auto;
// }

// .ant-carousel :deep(.slick-slide img) {
//     border: 5px solid #fff;
//     display: block;
//     margin: auto;
//     // max-width: 80%;
// }

// .ant-carousel :deep(.slick-arrow) {
//     display: none !important;
// }

// .ant-carousel :deep(.slick-thumb) {
//     bottom: 0px;
// }

// .ant-carousel :deep(.slick-thumb li) {
//     width: 100px;
//     height: 50px;
// }

// .ant-carousel :deep(.slick-thumb li img) {
//     width: 100%;
//     height: 100%;
//     filter: grayscale(100%);
//     display: block;
// }

// .ant-carousel :deep .slick-thumb li.slick-active img {
//     filter: grayscale(0%);
// }
</style>