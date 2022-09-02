<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Chart } from '@antv/g2'
import { areaData } from '@/mock/chartData'
const areaEle: any = ref(null)
const init = () => {
    areaEle.value = new Chart({
        container: 'areaEle',
        autoFit: true
    })
    areaEle.value.data(areaData)
    areaEle.value.scale('year', {
        type: 'linear',
        tickInterval: 50,
    });
    areaEle.value.scale('value', {
        nice: true,
    });

    areaEle.value.tooltip({
        showCrosshairs: true,
        shared: true,
    });

    areaEle.value
        .area()
        .adjust('stack')
        .position('year*value')
        .color('country');
    areaEle.value
        .line()
        .adjust('stack')
        .position('year*value')
        .color('country');

    areaEle.value.interaction('element-highlight');
    areaEle.value.render();
}

onMounted(() => {
    init()
})

</script>



<template>
    <div id="areaEle"></div>
</template>

<style lang="less">
#areaEle {
    width: 30vw;
    height: 50vh;
    margin-left: 20px;
}
</style>