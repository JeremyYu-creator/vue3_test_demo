<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getChannelNews } from '@/api/news'
import { channelColumn } from '@/mock/tableData'
import { channelList } from '@/typing/news'
const props = defineProps({
    type: String
})
const channelLoading = ref(true)
onMounted(() => {
    getData()
})
const entData = ref([] as channelList)
const seeDetail = (url: string) => {
    window.open(url, '__blank')
}
const getData = async () => {
    const { type } = props
    const params = {
        page: 1,
        ch: type === '2' ? 'ent' : 'sports'
    }
    const res = await getChannelNews(params)
    channelLoading.value = false
    entData.value = res.data.data
}
</script>
<template>
    <div>
        <a-table :dataSource="entData" :columns="channelColumn" bordered :pagination="false" :loading="channelLoading">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'img'">
                    <a-image :src="record.img" class="record-style"></a-image>
                    <!--style="width:120px; height: 80px;"-->
                </template>
                <template v-if="column.key === 'link'">
                    <span class="link-style" @click="seeDetail(record.link)">
                        查看
                    </span>
                </template>
            </template>
        </a-table>
    </div>
    <a-back-top />
</template>
<style lang="less">
.record-style {
    width: 120px;
    height: 80px;
}
</style>