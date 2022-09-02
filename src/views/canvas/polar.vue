<script lang="ts" setup>
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import { polarData } from '@/mock/chartData';
import { ref, onMounted } from 'vue'
const polarEle: any = ref(null)
const init = () => {
    const { DataView } = DataSet
    const dv = new DataView().source(polarData)
    dv.transform({
        type: 'fold',
        fields: ['a', 'b'], // 展开字段集
        key: 'user', // key字段
        value: 'score', // value字段
    })
    polarEle.value = new Chart({
        container: 'polarEle',
        autoFit: true,
    })
    polarEle.value.data(dv.rows)
    polarEle.value.scale('score', {
        min: 0,
        max: 80,
    });
    polarEle.value.coordinate('polar', {
        radius: 0.8,
    });
    polarEle.value.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
            line: {
                style: {
                    lineDash: [4, 4],
                    stroke: '#333'
                }
            }
        }
    });
    polarEle.value.axis('item', {
        line: null,
        tickLine: null,
        grid: {
            line: {
                style: {
                    lineDash: null,
                },
            },
        },
    });
    polarEle.value.axis('score', {
        line: null,
        tickLine: null,
        grid: {
            line: {
                type: 'line',
                style: {
                    lineDash: null,
                },
            },
        },
    });

    polarEle.value
        .line()
        .position('item*score')
        .color('user')
        .size(2);
    polarEle.value
        .point()
        .position('item*score')
        .color('user')
        .shape('circle')
        .size(4)
        .style({
            stroke: '#fff',
            lineWidth: 1,
            fillOpacity: 1,
        });
    polarEle.value
        .area()
        .position('item*score')
        .color('user');
    polarEle.value.render();
}

onMounted(() => {
    init()
})
</script>


<template>
    <div id="polarEle"></div>
</template>


<style lang="less">
#polarEle {
    width: 40vw;
    height: 50vh;
    margin-left: 20px;
}
</style>