<script lang="ts" setup>
import { ref } from 'vue'
// 暂时废除
const emits = defineEmits(['search'])
const cityName = ref('')
const search = () => {
  console.log('调用了')
}
</script>

<template>
  <div>
    <a-input-search v-model:value="cityName" placeholder="请输入城市" enter-button @search="search" addon-before="查询城市" />
  </div>
</template>

<style lang="less">
</style>
