<template>
  <div>
    extra
    <Hold :alia="alia" @emitHold="emitClick" @count="sonCount" :sum="sum"/>
<!--    <Hold @doSth="sayHello"  @emitHold="emitClick" @count="sonCount" :alia="alia"/>-->
<!--    <button @click="count">点击加1</button>-->
    <span>{{sum}}</span>
  </div>
</template>
<script lang="ts" setup>
import Hold from '@/components/second/hold.vue'
import { ref } from 'vue'
const alia = ref('asd')
const emitClick = (value: any) => {
    console.log(value, '子组件的传值')
}
const sum = ref(0)
const sonCount = () => {
  console.log('父被触发了')
  sum.value = sum.value + 1
}
const sayHello = () => {
  console.log("hello world!")
  sum.value = sum.value + 1
}
</script>
