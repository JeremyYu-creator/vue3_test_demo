<script lang="ts" setup>
import { ref } from 'vue'
import Chart from '@/views/canvas/chart.vue';
import Line from '@/views/canvas/line.vue'
import Pie from '@/views/canvas/pie.vue'
import Polar from '@/views/canvas/polar.vue';
import Area from '@/views/canvas/area.vue'
const activeKey = ref('1')
const tabList = [
    {
        name: '柱状图',
        icon: 'BarChartOutlined',
        value: '1',
    },
    {
        name: '折线图',
        icon: 'LineChartOutlined',
        value: '2',
    },
    {
        name: '饼状图',
        icon: 'PieChartOutlined',
        value: '3',
    },
    {
        name: '雷达图',
        icon: 'RadarChartOutlined',
        value: '4',
    },
    {
        name: '面积图',
        icon: 'AreaChartOutlined',
        value: '5',
    },
]
</script>


<template>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane :key="item.value" v-for="item in tabList">
            <template #tab>
                <span>
                    <component :is="$antIcons[item.icon]" />
                    {{ item.name }}
                </span>
            </template>
            <Chart v-if="item.value === '1'" />
            <Line v-else-if="item.value === '2'" />
            <Pie v-else-if="item.value === '3'" />
            <Polar v-else-if="item.value === '4'" />
            <Area v-else-if="item.value === '5'" />
        </a-tab-pane>
    </a-tabs>
</template>

<style lang="less">
.block-style {
    width: 30vw;
    height: 50vh;
    margin-left: 20px;
}
</style>