<script lang="ts" setup>
import { computed } from 'vue';
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
const emit = defineEmits(['sendMessage', 'updateValue'])
// const sendMessage = () => {
//     emit('sendMessage',1)
//     console.log('send了message')
// }
const sendRealMessage = () => {
    emit('sendMessage',1)
}
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
        <!-- <a-input v-model="value"/> -->
        <slot></slot>
    </div>
</template>
<style lang="less">
</style>