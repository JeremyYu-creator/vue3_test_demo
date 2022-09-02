<script lang="ts" setup>
import { Chart } from '@antv/g2';
import { ref, onMounted } from 'vue'
import { pieData } from '@/mock/chartData';
const pieElement: any = ref(null)
const init = () => {
    pieElement.value = new Chart({
        container: 'pieEle',
        autoFit: true,
    })
    pieElement.value.coordinate('theta', {
        radius: 0.75
    })
    pieElement.value.data(pieData)
    pieElement.value.scale('percent', {
        formatter: (val: number | string) => {
            val = Number(val) * 100 + '%';
            return val;
        },
    })
    pieElement.value.tooltip({ // 不展示提示的标题、点
        showTitle: false,
        showMarkers: false,
    })
    pieElement.value
        .interval()
        .position('percent')
        .color('item')
        .label('percent', {
            layout: [{ type: 'limit-in-plot', cfg: { action: 'ellipsis'/** 或 translate */ } }],
            content: (data: any) => {
                return `${data.item}: ${data.percent * 100}%`;
            },
        })
        .adjust('stack');

    pieElement.value.interaction('element-active');
    pieElement.value.render()
}

onMounted(() => {
    init()
})


</script>

<template>
    <div id="pieEle"></div>
</template>

<style lang="less">
#pieEle {
    width: 30vw;
    height: 50vh;
    margin-left: 20px;
}
</style>