<template>
  <div>
<!--    home-->
<!--    {{message}}-->
<!--    <button @click="provideWay">点击传值</button>-->
<!--    <div>-->
<!--      <Son :message="message"/>-->
<!--      &lt;!&ndash;:message="message"&ndash;&gt;-->
<!--    </div>-->
    <Aside/>
  </div>
</template>

<script lang="ts" setup>
import Son from '@/components/first/son.vue'
import Aside from '@/components/aside/aside.vue'
import { ref, provide,} from 'vue'
import mittEvent from '@/mitt/grandFather'
// mittEvent.on('mittEvent', e => console.log('mittEvent', e)) // 注册
const provideData = ref('provide的方法')
const message = ref('第一层传值')
provide('provide_way',  provideData)
const provideWay = () => {
  // provide('provide_way',  provideData)
  // console.log(provide('provide_way', provideData))
  provideData.value = '改变了'
  mittEvent.emit('mittEvent', '爷组件的mitt')
  console.log('error')
}
</script>
