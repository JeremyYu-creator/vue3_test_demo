<template>
  <div class="waterfall">
    <div v-for="(item, index) in items" :key="index" :style="{ height: item.height + 'px', marginBottom: '20px', marginRight:'20px' }">
      <img :src="item.image" alt="Image">
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import example1 from '@/assets/waterfall/exmaple1.jpg'
import example2 from '@/assets/waterfall/exmaple2.jpg'
import example3 from '@/assets/waterfall/exmaple3.jpg'
import example4 from '@/assets/waterfall/exmaple4.jpg'
import example5 from '@/assets/waterfall/exmaple5.jpg'
import example6 from '@/assets/waterfall/exmaple6.jpg'

interface Item {
  content: string;
  height: number;
  image: string
}
const items = ref<Item[]>([]);
const generateItems = () => {
  // 模拟生成一些随机高度和内容的项
  for (let i = 0; i < 10; i++) {
    const item: Item = {
      content: `Item ${i + 1}`,
      height: Math.floor(Math.random() * (300 - 100 + 1)) + 100,
      image: i % 2 === 0 ? example4 : example5
    };
    items.value.push(item);
  }
};

onMounted(() => {
  generateItems();
});

onUnmounted(() => {
  // 清理操作（如果需要）
});
</script>

<style scoped lang="less">
.waterfall {
  display: flex;
  flex-wrap: wrap;
  height: 800px;
  overflow: auto;
  overflow-x: hidden;
}
.waterfall > div {
  flex: 1 0 20%;
  padding: 10px;
}
.waterfall img {
  width: 100%;
  height: auto;
}
</style>