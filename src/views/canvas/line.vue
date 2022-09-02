<script lang="ts" setup>
import { Chart } from '@antv/g2'
import { lineData } from '@/mock/chartData'
import { ref, onMounted } from 'vue'
const chart: any = ref(null)
const init = () => {
    chart.value = new Chart({
        container: 'element',
        autoFit: true,
        appendPadding: [20, 0, 20, 0],
    })
    chart.value.data(lineData)
    chart.value.scale({ // 设置每个属性的初始值及范围等属性
        month: {
            range: [0, 1],
        },
        temperature: {
            // min: 0,
            nice: true,
        },
    });

    chart.value.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
    });
    chart.value.axis('temperature', {
        label: {
            formatter: (val: string) => {
                return val + ' °C';
            },
        },
    });
    /**
     * 通过链式的方式来进行属性的定义，感觉没有顺序的要求
     * */
    chart.value.line().position('month*temperature').shape('smooth').color('city')
    // label('temperature').
    chart.value.point().position('month*temperature').color('city').shape('circle')
    chart.value.render()
}
onMounted(() => {
    init()
})

</script>
<template>
    <div id="element"></div>
</template>

<style lang="less">
#element {
    width: 30vw;
    height: 50vh;
    margin-left: 20px;
}
</style>