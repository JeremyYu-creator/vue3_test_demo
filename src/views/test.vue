<template>
  <div>
    <a-button type="primary" @click="testRequest">按钮展示</a-button>
    <Loading v-if="loadingValue"/>
  </div>
</template>

<script lang="ts" setup>
import Loading from '@/components/loading/loading.vue'
import { ref, onMounted } from 'vue';
const loadingValue = ref(false)
onMounted(() => {
  // setTimeout(() => {
  //   loadingValue.value = false
  // }, 12000)
})
const testRequest = () => {
  loadingValue.value = true
  setTimeout(() => {
    loadingValue.value = false
  }, 8000)
}

</script>

