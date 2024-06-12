<!-- <template>
  <div class="waterfall">
    <div class="column" v-for="(column, columnIndex) in columns" :key="`column-${columnIndex}`">
      <div class="item" v-for="item in column" :key="item.id">
        <img :src="item.src" alt="item.description" class="preview" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Mock data with image URLs
const mockItems = [
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' },
  // Add more mock items with image URLs...
];

const items = ref(mockItems);

const columns = computed(() => {
  const columnCount = 3; // Example for 3 columns
  const columnsArray = Array.from({ length: columnCount }, () => []);
  items.value.forEach((item, index) => {
    columnsArray[index % columnCount].push(item);
  });
  return columnsArray;
});
</script>

<style scoped>
.waterfall {
  display: flex;
}
.column {
  flex: 1;
  padding: 0 4px;
}
.item {
  margin-bottom: 8px;
}
.preview {
  width: 100%; /* Adjust the width as needed */
  height: auto; /* Adjust the height as needed */
  object-fit: cover; /* This will cover the area without stretching the image */
}
</style> -->
<template>
  <div class="waterfall">
    <div class="column" v-for="(column, columnIndex) in columns" :key="`column-${columnIndex}`">
      <div class="item" v-for="item in column" :key="item.id" :style="{ height: item.height + 'px' }">
        <img :src="item.src" alt="item.description" class="preview" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Mock data with image URLs and heights
const mockItems = [
  // { id: 1, src: 'path-to-your-image-1.jpg', description: 'Image 1', height: 200 },
  // { id: 2, src: 'path-to-your-image-2.jpg', description: 'Image 2', height: 300 },
  {
    id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 300},
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1' ,height: 200},
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 100 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 100 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 200 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 300 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 200 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 200 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 200 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 200 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 200 },
  { id: 1, src: 'https://cdn-fop-fitcamp-resource.aikangwellness.com/7536cf92-f5b4-44b5-96d5-0118a3400885.png', description: 'Image 1',height: 200 },
  // Add more mock items with image URLs and heights...
];

const items = ref(mockItems);

const columns = computed(() => {
  const columnCount = 3; // Example for 3 columns
  const columnsArray = Array.from({ length: columnCount }, () => []);
  items.value.forEach((item, index) => {
    columnsArray[index % columnCount].push(item);
  });
  return columnsArray;
});
</script>

<style scoped>
.waterfall {
  display: flex;
  justify-content: space-between;
}
.column {
  width: calc(100% / 3); /* Adjust the width based on column count */
}
.item {
  margin: 8px;
  overflow: hidden; /* Optional, in case of very tall images */
}
.preview {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>