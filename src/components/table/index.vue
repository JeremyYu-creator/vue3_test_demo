<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { AnyObject} from '@/typing/tableComponent'
// 通过这种方式进行props的自定义定义类型
import type { PropType } from "vue"
import mittEvent from '@/mitt/grandFather'

const props = defineProps(
    {
        tableColumn: {
            type: Object as PropType<AnyObject[]>,
            default: [],
        }
    }
)


const currentTableColumn = ref([] as AnyObject[])
const dataBase: any = ref([])
const dealMitt = (value: any) => {
    console.log('发放事件获取到的数据', value)
        const { name, time } = value
        dataBase.value.push({
            name,
            time,
            type: '1',
        })
}
const thingsTable = ref('')
onMounted(() => {
    mittEvent.on('dataOn', (value) => {
        dealMitt(value)
        thingsTable.value = '记事录'
    })
    // dataBase.value.push({
    //     name: 
    // })
    // mittEvent.on('test', (value:any) => {
    //     console.log('发放事件获取到的数据',value)
    // })
    console.log('mitt',mittEvent)
    currentTableColumn.value = props.tableColumn
    console.log(currentTableColumn.value, 'asdasdasdasdasdd')
})
onUnmounted(() => {
    mittEvent.off('dataOn')
})
</script>

<template>
    <div class="record_table_style">
        <h4>{{thingsTable }}</h4>
        <a-table :dataSource="dataBase" :columns="currentTableColumn" bordered />
    </div>
</template>
<style lang="less">
.record_table_style{
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>