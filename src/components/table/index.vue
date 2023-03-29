<script lang="ts" setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import type { UnwrapRef } from 'vue'
import { AnyObject} from '@/typing/tableComponent'
// 通过这种方式进行props的自定义定义类型
import type { PropType } from "vue"
import { getNoteBookData, deleteNoteBookData, updateNoteBookData } from '@/api/test';
import mittEvent from '@/mitt/grandFather'
import { cloneDeep } from 'lodash'

interface DataItem  {
    name: string,
    date: string,
    type: string,
}
const props = defineProps(
    {
        tableColumn: {
            type: Object as PropType<AnyObject[]>,
            default: [],
        }
    }
)

// const oldVal: any = ref([])
const currentTableColumn = ref([] as AnyObject[])
const dataBase: any = ref([])
const dealMitt = (value: any) => {
    console.log('发放事件获取到的数据', value)
    dataBase.value = value
    // oldVal.value = value
}
const thingsTable = ref('')
const getInitData = async() => {
    try {
        const res = await getNoteBookData({})
        console.log('----获取到的notebook数据---', res)
        dataBase.value = res.data
    } catch (err: any) {
        console.log('err',err)
    }
}
onMounted(() => {
    mittEvent.on('dataOn', (value) => {
        dealMitt(value)
        thingsTable.value = '记事录'
    })
    // console.log('mitt',mittEvent)
    currentTableColumn.value = props.tableColumn
    // console.log(currentTableColumn.value, 'asdasdasdasdasdd')
})
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (key: string) => {
    editableData[key] = cloneDeep(dataBase.value.filter((item: any) => key === item.key)[0]);
};
const save = async (key: string) => {
    try {
        Object.assign(dataBase.value.filter((item: any) => key === item.key)[0], editableData[key]);
        console.log('--编辑的数据----',editableData[key], key)
        const res = await updateNoteBookData({
            data: editableData[key],
            key: key
        })
        delete editableData[key];
        console.log('res返回值', res)
        getInitData()
    } catch (err: any) {
        console.log('---更新数据的错误--',err)
    }
   
};
const deleteData = async(key: string) => {
    console.log('--delete的key----', key)
    try {
        const res = await deleteNoteBookData({ key: key })
        console.log('---delete成功---', res)
        getInitData()
    } catch (err: any) {
        console.log('delete的err', err)
    }
}
const cancel = (key: string) => {
    delete editableData[key];
};
onUnmounted(() => {
    mittEvent.off('dataOn')
})
</script>

<template>
    <div class="record_table_style">
        <h4>{{ thingsTable }}</h4>
        <a-table :dataSource="dataBase" :columns="currentTableColumn" bordered>
            <template #bodyCell="{ column, text, record }">
                <template v-if="['name', 'date', 'type'].includes(column.dataIndex)">
                    <div>
                        <a-input
                            v-if="editableData[record.key]"
                            v-model:value="editableData[record.key][column.dataIndex]"
                            style="margin: -5px 0"
                        />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                    <span v-if="editableData[record.key]">
                        <a-typography-link @click="save(record.key)">Save</a-typography-link>
                        <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                            <a>Cancel</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
                        <a @click="edit(record.key)">Edit</a>
                        <a-popconfirm title="Sure to delete?" @confirm="deleteData(record.key)">
                            <a>Delete</a>
                        </a-popconfirm>
                        <!-- <a @click="deleteData(record.key)">Delete</a> -->
                    </span>
                    </div>
                </template>
            </template>
        </a-table>
    </div>
</template>
<style lang="less">
.record_table_style{
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.editable-row-operations a {
    margin-right: 8px;
}
</style>