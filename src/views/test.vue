<template>
  <div>
    <a-button type="primary" @click="testRequest">按钮展示</a-button>
    <!-- <Loading v-if="loadingValue"/> -->
    <Calander/>
  </div>
</template>

<script lang="ts" setup>
import Loading from '@/components/loading/loading.vue'
import Calander from '@/components/calendar/index.vue' 
import { ref, onMounted } from 'vue';
const loadingValue = ref(false)
onMounted(() => {
  
})
const testRequest = () => {
  loadingValue.value = true
  setTimeout(() => {
    loadingValue.value = false
  }, 8000)
}

</script>

