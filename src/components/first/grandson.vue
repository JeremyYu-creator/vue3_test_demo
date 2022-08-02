<template>
  <div>
    grandson
    {{message}}
    {{deepData}}
    <button @click="handle">
        点击孙组件
    </button>
    {{sum}}
    {{mit}}
  </div>
</template>
<script lang="ts" setup>
import { inject , ref } from 'vue'
import mittEvent from "@/mitt/grandFather";
const props = defineProps({
  message: String,
})
const mit = ref('1')
const emits = defineEmits(['handle'])
const handle = () => {
  console.log('点击了')
  emits('handle', '孙组件的方法调用')
}
const deepData = inject('provide_way')
const name = ref("孙组件的暴露属性")
export interface API {
  name: String,
  count: Function
}
const handleCallBack = (e: string) => {
    mit.value = e
    console.log('孙子组件的mitt', e)
}
mittEvent.on('mittEvent',
    e =>
    handleCallBack(e)
)
const sum = ref(0)
const count = () => {
  console.log('触发了count函数', sum.value)
  sum.value = sum.value + 1
}
defineExpose({
  name,
  count
})
// console.log(inject('provide_way'), '孙组件调用provide方法')
</script>
