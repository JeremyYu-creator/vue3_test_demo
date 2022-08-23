<template>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      {{ steps[current].content }}
    </div>
    <!-- <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
    </div> -->
    <div class="progress-style">
       <a-progress type="circle" :percent="currentPercent" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { onMounted } from 'vue';

const current = ref(0);
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};

const steps =  [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ]
const currentPercent = ref(0)
const setTimeCount = () => { // 模拟进度加载的完成事件
  if (currentPercent.value <= 100) {
    setTimeout(() => {
      currentPercent.value = currentPercent.value + 1
      if (currentPercent.value === 50) {
        current.value = 1
      } else if (currentPercent.value === 100){
        current.value = 2
      }
      setTimeCount()
    }, 100)
  }
}
onMounted(() => {
  setTimeCount()
})
</script>
<style scoped lang="less">
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
.progress-style {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>

