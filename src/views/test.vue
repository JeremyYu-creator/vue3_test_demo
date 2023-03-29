<template>
  <div>
    <!--测试总页面-->
    <!-- <Loading v-if="loadingValue"/> -->
        <div class="row-style">
          <Calander/>
          <TableComponent :tableColumn="tableColumn"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import Loading from '@/components/loading/loading.vue'
import Calander from '@/components/calendar/index.vue'
import TableComponent from '@/components/table/index.vue'
import { DataType} from '@/typing/tableComponent'
import { ref, onMounted } from 'vue';
// const loadingValue = ref(false)
// const dataSource = ref([] as DataType[])
// 定义的列名
const tableColumn = [
  {
    title: '事件名称',
    dataIndex: 'name',
    objectKey: 'name', 
    // width: 100,     
  },
  {
    title: '时间',
    dataIndex: 'date',
    objectKey: 'date',  
    // width: 100,         
  },
  {
    title: '类型',
    dataIndex: 'type',
    objectKey: 'type',  
    // width: 100,         
  },
  {
    title: '操作',
    dataIndex: 'operation',
    objectKey: 'operation', 
  }
]
onMounted(async() => {

})

</script>
<style lang="less">
.row-style {
  display: flex;
}
</style>

