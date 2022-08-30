<script lang="ts" setup>
import { ref } from 'vue'
import News from '@/views/community/news.vue'
import ChannelNews from '@/views/community/channelNews.vue'
import dayjs from 'dayjs';
import data from "@/mock/mock.json"
// import SportNews from '@/views/community/sportNews.vue'
const activeKey = ref('1')
const currentDay = dayjs().format('YYYY-MM-DD HH:mm:ss')
/**
 * 以下方法是拿到url及对url的相关属性获取
 * **/
const currentUrl = import.meta.url
let urlDetail = new URL(currentUrl)
// const str = "'{''name': 'lisi', 'age': '21''}'"
const str = '{ "name": "zhangsan", "content": [{ "path": "baidu", "link": "https://www.baidu.com" }] }'
const obj = {
    name: 'wangwu'
}
// console.log(currentDay, currentUrl, urlDetail)
console.log(JSON.stringify(data), JSON.parse(str), JSON.parse(JSON.stringify(data)))
Object.defineProperty(obj, 'name', {
    writable: false,
    enumerable: true,
    configurable: true,
    value: 'zhaoliu'
})
console.log(obj)
const tabPaneData = [
    {
        name: '国内新闻',
        key: '1',
        // content: 'Content of Tab Pane 1',
        icon: 'AppleOutlined',
    },
    {
        name: '娱乐新闻',
        key: '2',
        // content: 'Content of Tab Pane 2',
        icon: 'AndroidOutlined',
    },
    {
        name: '体育新闻',
        key: '3',
        // content: 'Content of Tab Pane 3',
        icon: 'WindowsOutlined',
    },
]
</script>
<template>
    <a-tabs v-model:activeKey='activeKey' size="large">
        <a-tab-pane v-for="item in tabPaneData" :key="item.key">
            <template #tab>
                <span>
                    <component :is="$antIcons[item.icon]" />
                    {{  item.name  }}
                </span>
            </template>
            <!-- {{item.content}} -->
            <News v-if="item.key === '1'" />
            <ChannelNews v-else-if="item.key === '2' || item.key === '3'" :type="item.key" />
            <!-- <SportNews v-else-if="item.key === '3'" /> -->
        </a-tab-pane>
    </a-tabs>
</template>
<style lang="less">
</style>