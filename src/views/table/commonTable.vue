<script lang="ts" setup>
import {people, column, mockDataColumn} from '@/mock/tableData'
import axios from 'axios'
import type { TableProps } from 'ant-design-vue';
import { usePagination } from 'vue-request';
import { computed } from 'vue';
import { APIParams, APIResult } from '@/typing/tableRequest'

const queryData = (params: APIParams) => {
  return axios.get<APIResult>('https://randomuser.me/api?noinfo', { params });
}
const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
    /**
     * 详情见https://gitee.com/attojs/vue-request/，看一下相关的钩子怎么使用的
     * **/
} = usePagination(queryData, {
  formatResult: res  => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});

const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange: TableProps['onChange'] = (
    pag: { pageSize: number; current: number },
    filters: any,
    sorter: any,
) => {
  run({
    results: pag.pageSize!,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

</script>

<template>
  <!--表格的列和数据是分开进行的，但是列的key同数据的属性名相关联-->
  <div>
    <a-table :dataSource="people" :columns="column" :pagination="false"/>
  </div>
  <div>
    <a-table
        :columns="mockDataColumn"
        :row-key="record => record.login.uuid"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        bordered
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
      </template>
    </a-table>
  </div>
</template>

<style lang="less">

</style>
