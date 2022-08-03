<template>
  <div>
      <span>{{alia}}</span>
      <span>{{sum}}</span>
      <button @click="emitHold">点击</button>
      <button @click="count">点击加一</button>
      <span>{{countNum}}    12312</span>
      <div>{{token}}  999</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useAttrs, toRefs, reactive, } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from "@/store";
defineProps<{
  alia: string,
  sum: number
}>()
const person = reactive({
  name: '张三',
  age: 18
})
const { user } = useStore()
// console.log(user.$patch, 'patch的内容')
const {token, userInfo,} = storeToRefs(user) // 创建store实例，注意这里是响应式的值、但是在取的时候要使用.value形式编写
console.log(token.value, '------初次获取------')
const countNum = ref('1')
const emit = defineEmits(['emitHold', 'count'])
// console.log(toRefs(person))
const emitHold = () => {
  emit('emitHold', person)
}
const count = () => {
  user.setToken(String(Number(token.value) + 1))  // 确实实现了数据的存储化，切记如果不需要存储的话记得删除：使用clear或者remove指定的key名
  user.$patch(
      (state) => {
        state.userInfo = {
          name: '李四',
          age: '20'
        }
      }
  )
  console.log(token.value, userInfo.value)
  emit('count')
}
const city = ref('')
const cityList: any = {
  "1":"北京",
  "2":"上海",
  "3":"苏州",
  "4":"深圳",
  "5":"杭州",
  "6":"长春",
}
const radomCity = () => {
  let num = String(Math.round(Math.random()*5) + 1) // 模拟拿到的区域编号
  if (Reflect.has(cityList, num)) {
    // return city.value = cityList['num']
    return cityList[num]
  }
  // return city.value = '暂无适合城市'
  return '暂无适合城市'
}
console.log(radomCity())
</script>
