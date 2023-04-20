<script lang="ts" setup name="chart">
import { ref, onMounted, onActivated, onDeactivated } from 'vue'
import { Chart, registerInteraction } from '@antv/g2'
import { mapData } from '@/mock/chartData'
const chart: any = ref(null) // 全局只创建一个实例，然后通过对实例进行图形的绘画或者清除
registerInteraction('element-link', { // 创建各个柱状图连接的实例
    start: [
        { trigger: 'interval:mouseenter', action: 'element-link-by-color:link' }
    ],
    end: [
        { trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' }
    ]
});
const init = () => {
    chart.value = new Chart({
        container: 'container',
        autoFit: true,
        appendPadding: [20, 0, 20, 0],
    })
    chart.value.data(mapData);
    // chart.value.animate(true) 是否开启动画
    chart.value.interval().position('year*sold').color('genre')
        .adjust('stack');;
    // chart.value.filterData(mapData)
    // chart.value.filterFieldData('sold', mapData)
    chart.value.interaction('element-highlight-by-color');
    chart.value.interaction('element-link');
    chart.value.render();
}
onActivated(() => {
    console.log('keep-alive路由使用')
})
onMounted(() => {
    init()
    // setTimeout(() => {
    //     chart.value.destroy()
    // }, 5000)
})

</script>
<template>
    <div>
        <div id="container"></div>
        <!-- <el-input v-model=""></el-input> -->
    </div>
</template>
<style lang="less">
#container {
    width: 30vw;
    height: 50vh;
    margin-left: 20px;
}
</style>