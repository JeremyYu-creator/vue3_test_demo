<template>
  <svg :class="svgClass" v-bind="$attrs" :style="style">
    <use :xlink:href="iconName" />
  </svg>
</template>
  
  <script setup lang="ts">


import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  style: {
    type: Object,
    default: {
      width: '168px',
      height: '128px',
    }
  }
})

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  console.log(props.name, 'props.name');
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
});
</script>
  
  <style lang='less'>
  .svg-icon {
    // width: 100vw;
    // height: 100vh;
    fill: currentColor;
    vertical-align: middle;
  }
  </style>
  