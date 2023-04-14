<script lang="ts" setup>
import { computed , onActivated, onDeactivated, onMounted} from 'vue';
const props = defineProps({
    textMessage: {
        type: String,
        default: ''
    },
    passageValue: {
        type: String,
        default: '',
    }
})
onMounted(() => {
    console.log('初次加载')
})
const emit = defineEmits(['sendMessage', 'updateValue'])
// const sendMessage = () => {
//     emit('sendMessage',1)
//     console.log('send了message')
// }
const sendRealMessage = () => {
    emit('sendMessage',1)
}
onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  console.log('keep-alive二次加载')
})
onDeactivated(() => {
    console.log('keep-alive的二次卸载')
})
// const value = computed({
//     get() {
//         return props.passageValue
//     },
//     set(val: any) {
//         emit('updateValue', val)
//     }
// })
</script>
<template>
    <div>
        <div>
        tab1
        </div>
        <div :style="{'background-color': 'red', width: '100px', height: '200px' }">

        </div>
        <!-- <a-input v-model="value"/> -->
        <slot></slot>
    </div>
</template>
<style lang="less">
</style>