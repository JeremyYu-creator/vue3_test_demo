<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getAllNews } from '@/api/news'
import { newsColumn } from '@/mock/tableData'
import { isMaxHeight } from '@/utils/browser'
import { listType } from '@/typing/news'
onMounted(() => {
    setScrollY()
    console.log(isMaxHeight())
    getData()
})
const tableScrollY = ref(0)
const imgWidth = ref(0)
const setScrollY = () => {
    isMaxHeight() ? tableScrollY.value = 570 : tableScrollY.value = 350
    isMaxHeight() ? imgWidth.value = 200 : imgWidth.value = 120
}
const newsArr = ref([] as listType)
const loading = ref(true)
const getData = async () => {
    const params = {
        page: currentNum.value,
        col: 56261
    }
    const res = await getAllNews(params)
    loading.value = false
    newsArr.value = res.data.result.data.list
    console.log(res, newsArr.value)
}
const seeDetail = (url: string) => {
    window.open(url, '__blank')
}
const currentNum = ref(1)
const onChange = (page: number) => {
    getData()
}
</script>
<template>
    <div>
        <a-table :dataSource="newsArr" :columns="newsColumn" :loading="loading" bordered :pagination="false" sticky
            :scroll="{ y: tableScrollY }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.title === 'URL'">
                    <span class="link-style" @click="seeDetail(record.URL)">
                        查看
                    </span>
                </template>
                <template v-else-if="column.key === 'allPics'">
                    <!-- <img :src="record.allPics.pics[0]?.imgurl"  style="width: 120px; height: 90px;" alt="暂无图片"> -->
                    <a-image :src="record.allPics.pics[0]?.imgurl" alt="暂无图片" :width="imgWidth"></a-image>
                    <!-- <span>{{record.allPics.pics[0]?.imgurl}}</span> -->
                </template>
            </template>
        </a-table>
        <div class="pagination-style">
            <a-pagination v-model:current="currentNum" :total="300" show-quick-jumper @change="onChange"
                :show-size-changer="false" />
        </div>
    </div>
</template>
<style lang="less">
.link-style {
    color: @link-color;
    cursor: pointer;
}

.pagination-style {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>