<script lang="ts" setup>
import { onMounted, ref, } from 'vue';
import { getDoubanNewData } from '@/api/douban'
import { topRequestParams, wmdbResponse } from '@/typing/newMovieData'
// import type { SelectProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { selectOptions }  from '@/typing/options'
import { message } from 'ant-design-vue';
import Loading from '@/components/loading/loading.vue'
import { CompareOptions } from '@/utils/compareNum'
import Error from '@/components/error/error.vue';
const router = useRouter()
const movieListData = ref([] as wmdbResponse)
// a-select使用官方的ts写法

const doubanSelectOptions = ref([
    {
        value: '10',
        label: '10',
        count: 10, 
    },
    {
        value: '20',
        label: '20',
        count: 20,
    },
    {
        value: '50',
        label: '50',
        count: 50,
    },
    {
        value: '100',
        label: '100',
        count: 100,
    },
] as selectOptions[])

const selectType = ref('10')
const isNormal = ref(true)
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
        // console.log(movieListData.value)
    } catch (err) {
        spinning.value = false
        console.log(err)
    }

}
const handleChange = async() => {
    try {
        await getDoubanList()
        isNormal.value = true
    } catch (err: any) {
        isNormal.value = false
        message.error('请求数据出错')
    }
}
const searchTimer = ref(null as any)
const handleSearch = (val: string) => {
    if (searchTimer.value) {
        clearTimeout(searchTimer.value)
    }
    /** 
     * 进行条件的限制及处理，如果不是正常的数据无法进行数据的传值
     * */ 
    if (val && !isNaN(Number(val)) && val.indexOf('.') < 0 && Number(val) < 251) {
        let arr = doubanSelectOptions.value?.map((item: selectOptions) => {
            return item.value 
        })
        if (!arr?.includes(val)) {
            searchTimer.value = setTimeout(() => {
                doubanSelectOptions.value.push(
                    {
                        value: val,
                        label: val,
                        count: Number(val),
                    }
                )
                CompareOptions(doubanSelectOptions.value)
            },700) 
        }
    } else {
        searchTimer.value = setTimeout(() => {
            message.warning('当前只支持小于250的整数查询，请输入正确查询数字！')
        },500)
    }
};
const spinning = ref(true)
const pageTitle = ref('')
const onClick = (id: string) => {
    // console.log('onClick', id)
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
        isNormal.value = true
    } catch (err) {
        isNormal.value = false
        console.log(err)
    }
})
</script>
<template>
    <Loading v-if="spinning"/>
    <!-- <a-spin class="loading-style" :spinning="spinning"> -->
        <!--卡片形式的内容-->
        <div class="main-block" v-if="isNormal">
            <h2>{{ pageTitle }}</h2>
            <div class="douban-block-select-style">
                <span>选择条数：</span>
                <a-select :options="doubanSelectOptions" v-model:value="selectType" @change="handleChange"
                    class="douban-single-select-style" show-search @search="handleSearch">
                </a-select>
            </div>
            <!-- <div class="movie-block-style">
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
            </div> -->
            <div class="movie-block-new-style">
                <a-card v-for="item in movieListData" class="movie-single-new-style" :key="item.id" hoverable>
                    <div v-for="iitem in item.data" :key="iitem.id">
                        <div class="movie-pic-style">
                            <div class="movie-detail-info-style" @click="onClick(item.doubanId)">
                                <a-tooltip>
                                    <template #title>{{ iitem.name }}</template>
                                    <div class="tooltip-style">
                                        <b>电影名：</b>{{ iitem.name }}
                                    </div>
                                </a-tooltip>
                                <!-- <section class="movie-row-style"><b>电影名：</b>{{ iitem.name }}</section> -->
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
        <Error v-if="!isNormal"/>
    <!-- </a-spin> -->
    <a-back-top />
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
    height: 100%;
    display: flex;
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

.movie-block-new-style {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    padding: 20px;
}

.movie-single-new-style{
    margin: 10px;
}

.poster-style {
    width: 100px;
    height: 130px;
    border-radius: 8px;
    object-fit: cover;
}

.movie-row-style {
    margin: 5px 0;
}

.movie-pic-style {
    display: flex;
    justify-content: space-between;
    .ant-image {
        .ant-image-img {
            width: 100px;
            height: 130px;
        }
        .ant-image-mask {
            width: 100px;
            height: 130px;
        }
    }
}

.tooltip-style {
    width: 170px;
    overflow: hidden;        /*内容会被修剪，并且其余内容是不可见的*/
    text-overflow:ellipsis;  /*显示省略符号来代表被修剪的文本。*/
    white-space: nowrap;     /*文本不换行*/
}

.movie-detail-info-style {
    display: flex;
    flex-direction: column;
}
</style>