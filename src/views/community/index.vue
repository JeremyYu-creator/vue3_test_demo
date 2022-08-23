<script lang="ts" setup>
import { ref } from 'vue'
import News from '@/views/community/news.vue'
import EntNews from '@/views/community/entNews.vue'
import SportNews from '@/views/community/sportNews.vue'
const activeKey =  ref('1')
const tabPaneData = [
    {
        name: 'Tab 1',
        key: '1',
        content: 'Content of Tab Pane 1',
        icon: 'AppleOutlined'
    },
    {
        name: 'Tab 2',
        key: '2',
        content: 'Content of Tab Pane 2',
        icon: 'AndroidOutlined',
    },
    {
        name: 'Tab 3',
        key: '3',
        content: 'Content of Tab Pane 3',
        icon: 'AndroidOutlined',
    },
]
</script>
<template>
    <a-tabs v-model:activeKey = 'activeKey' size="large" >
        <a-tab-pane v-for="item in tabPaneData" :key="item.key">
            <template #tab>
                <span>
                    <component :is="$antIcons[item.icon]"/>
                    {{item.name}}
                </span>
            </template>
            <!-- {{item.content}} -->
            <News v-if="item.key === '1'"/>
            <EntNews v-else-if="item.key === '2'"/>
            <SportNews v-else-if="item.key === '3'"/>
        </a-tab-pane>
    </a-tabs>
</template>
<style lang="less">
</style>