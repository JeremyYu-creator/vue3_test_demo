<template>
  <div>
    <a-button type="primary" @click="testRequest">按钮展示</a-button>
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
const loadingValue = ref(false)
const dataSource = ref([] as DataType[])
const tableColumn = [
  {
    title: '事件名称',
    dataIndex: 'name',
    objectKey: 'name', 
    // width: 100,     
  },
  {
    title: '时间',
    dataIndex: 'time',
    objectKey: 'time',  
    // width: 100,         
  },
  {
    title: '类型',
    dataIndex: 'type',
    objectKey: 'type',  
    // width: 100,         
  },
]
onMounted(() => {

})
const testRequest = () => {
  loadingValue.value = true
  setTimeout(() => {
    loadingValue.value = false
  }, 8000)
}

</script>
<style lang="less">
.row-style {
  display: flex;
}
</style>

