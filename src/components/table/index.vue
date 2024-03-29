<script lang="ts" setup>
import { onMounted, onUnmounted, ref, reactive, computed, unref } from 'vue';
import type { UnwrapRef } from 'vue'
import { AnyObject} from '@/typing/tableComponent'
// 通过这种方式进行props的自定义定义类型
import type { PropType } from "vue"
import { getNoteBookData, deleteNoteBookData, updateNoteBookData } from '@/api/test';
import { NoteBookCommonParams, NoteBookMittType, OperateNoteBookType, DataItem } from '@/typing/noteBook'
import mittEvent from '@/mitt/grandFather'
import { cloneDeep } from 'lodash'
import { message, Table } from 'ant-design-vue';

const props = defineProps(
    {
        tableColumn: {
            type: Object as PropType<AnyObject[]>,
            default: [],
        }
    }
)
type Key = string | number
const totalNum = ref(0)
// const oldVal: any = ref([])
const currentTableColumn = ref([] as AnyObject[])
const dataBase = ref([] as NoteBookCommonParams[])
const dealMitt = (value: NoteBookMittType) => {
    dataBase.value = value.pageData
    totalNum.value = value.total
    pagination.value.current = value.current
    // console.log('发放事件获取到的数据', value, totalNum.value)
    // oldVal.value = value
}
const current = ref(1)
const pageSize = ref(10)
const thingsTable = ref('')
const getInitData = async() => {
    try {
        const res = await getNoteBookData({
            pageNo: current.value,
            pageSize: pageSize.value, 
        })
        // console.log('----获取到的notebook数据---', res)
        dataBase.value = res.data.pageData
        totalNum.value = res.data.total
        pagination.value.total = totalNum.value
    } catch (err: any) {
        dataBase.value = []
        pagination.value.total = 0
        console.log('err',err)
    }
}
onMounted(() => {
    mittEvent.on('dataOn', (value: any) => {
        dealMitt(value)
        thingsTable.value = '记事录'
    })
    currentTableColumn.value = props.tableColumn
})
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
const noticeMessage = (type: string, res: OperateNoteBookType, key: string) => {
    // key: string
    if (res.data === 'success') {
        if (type === 'edit') {
            delete editableData[key];
        }
        current.value = 1
        pagination.value.current = 1
        message.success('操作成功')
        getInitData()
    } else if(res.data === 'failture'){
        message.error('保存失败，请重试')
    }
}
const edit = (key: string) => {
    editableData[key] = cloneDeep(dataBase.value.filter((item: NoteBookCommonParams) => key === item.key)[0]);
};
const save = async (key: string) => {
    try {
        Object.assign(dataBase.value.filter((item: NoteBookCommonParams) => key === item.key)[0], editableData[key]);
        // console.log('--编辑的数据----',editableData[key], key)
        const res = await updateNoteBookData({
            data: editableData[key],
            key: key
        })
        // noticeMessage('edit', res, key)
        noticeMessage('edit', res, key)
    } catch (err: any) {
        console.log('---更新数据的错误--',err)
    }
   
};
const deleteData = async(key: string) => {
    // console.log('--delete的key----', key)
    try {
        const res = await deleteNoteBookData([{ key: key }])
        // noticeMessage('delete', res, key)
        noticeMessage('delete', res, key)
    } catch (err: any) {
        console.log('delete的err', err)
    }
}
interface Keys {
    key: string,
}[]
const deleteManyData = async(keys: Keys) => {
    try {
        const res = await deleteNoteBookData(keys)
        noticeMessage('delete', res, '')
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
let pagination = ref({
    pageSize: 10,
    current: 1,
    showSizeChanger: true,
    showTotal: (total: number) => {
        return `共${total}条`
    },
    // total: totalNum.value
    total: totalNum
}) //分页
const handleTableChange = (e: any) => {
    pagination.value = { ...e,  showTotal: (total: number) => {
        return `共${total}条`
    }, }
    current.value = e.current
    pageSize.value = e.pageSize
    // console.log(e, '修改表单', current.value, pageSize.value)
    getInitData()
}
type SelectType = {
    selectedRowKeys: Key[];
    selectedRows: NoteBookCommonParams[],
    loading: boolean;
}
const state = reactive<SelectType>(
    {
        selectedRowKeys: [],
        selectedRows: [],
        loading: false,
    }
)
// const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const onSelectChange = (selectedRowKeys: Key[], selectedRows: NoteBookCommonParams[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
    state.selectedRowKeys = selectedRowKeys;
    state.selectedRows = selectedRows
}
// 完全融合进来了，所以只需绑定此对象即可
const rowSelection = computed(() => {
    return {
        selectedRowKeys: unref(state.selectedRowKeys),
        onChange: onSelectChange,
        hideDefaultSelections: true,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'deleteMany',
                text: '删除当前选择',
                onSelect: (changableRowKeys: any) => {
                    let arr: any = []
                    state.selectedRows.forEach((item: NoteBookCommonParams) => {
                        arr.push({
                            key: item.key
                        })
                    })
                    console.log('当前已选择的key列表', arr)
                    deleteManyData(arr)
                },
            },
        ],
    }
})
</script>

<template>
    <div class="record_table_style">
        <h4>{{ thingsTable }}</h4>
        <a-table 
            :dataSource="dataBase" :columns="currentTableColumn" bordered :pagination="pagination"
            @change="handleTableChange" :row-selection="rowSelection"
            >
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
                        <!-- <a-typography-link @click="save(record.key)">
                            Save
                        </a-typography-link> -->
                        <a-popconfirm title="Sure to save?" @confirm="save(record.key)">
                            <a>save</a>
                        </a-popconfirm>
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
        
        <!-- <div>
            <span :style="testStyle">asdsasaad</span>
        </div> -->
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