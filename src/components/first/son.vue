<template>
  <div>
    son
    {{ message }}
    {{ childData }}
    <div>
      <GrandSon :message="message" @handle="handler" ref="grandSon" />
      <button @click="sonRef">触发孙组件的内容</button>
      <!--      <button @click="clickBtn">触发emit事件</button>-->
      <!--      <span>{{sonText}}</span>-->
    </div>
  </div>
</template>
<script lang="ts" setup>
import GrandSon, { API as GrandSonAPI } from '@/components/first/grandson.vue'
import { inject, ref } from 'vue'
import mittEvent from "@/mitt/grandFather";
// component: {
//   GrandSon
// }
const props = defineProps({
  message: String
})
const handler = (value: any) => {
  console.log(value, '123123313')
}
const childData = inject('provide_way')
const grandSon = ref<null | GrandSonAPI>(null)
const sonText = ref('儿子组件的内容')
const sonRef = () => {
  if (grandSon) {
    console.log(grandSon.value?.name) // 这个地方主要是可能出现该ref为空的情况，所以需要注意
    grandSon.value?.count()
  }
}
mittEvent.on('mittEvent', (e: any) => {
  console.log('儿子组件的mitt', e)
  sonText.value = e
})
</script>
