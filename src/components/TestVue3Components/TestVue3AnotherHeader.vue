<script lang="ts" setup>
import '@/assets/style/global.less'
import { message } from 'ant-design-vue';
import { computed, useAttrs, inject, onActivated, onDeactivated, ref } from 'vue';
import { useHookByMyself } from '@/utils/hook';
import GrandSon from './GrandSon.vue';
import GrandHeader from '@/components/TestVue3Components/GrandHeader.vue'
const props = defineProps({
    textMessage: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: '',
    }
})
const {increaseNum, decreaseNum, num } = await useHookByMyself()
const numFather = inject('father-number')
const attrs = useAttrs()
const emit = defineEmits(['sendMessage', 'update:modelValue'])
// const sendMessage = () => {
//     emit('sendMessage',1)
//     console.log('send了message')
// }
const sendRealMessage = () => {
    emit('sendMessage',1)
}
const passage = ref('neveda')
const value = computed({
    get() {
        // console.log('获取到的value值',props.modelValue)
        return props.modelValue
    },
    set(val: any) {
        emit('update:modelValue', val)
    }
})
onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  console.log('keep-alive二次加载')
})
onDeactivated(() => {
    console.log('keep-alive的二次卸载')
})
const color = "red"
// console.log('已获取到的value值', attrs)
</script>
<template v-slot="{message}"> 
    <div >
        <div>tab2</div>
        <div>{{ passage }}</div>
        <div class="common-column-style">
            <slot name="anotherHeader">
                <!-- <template #grandSon>
                    <span>grandSon</span>
                </template> -->
                <GrandSon/>
            </slot>
            <slot name="otherHeader">
                <GrandHeader/>
            </slot>
            <slot></slot>
        </div>
        <slot name="footer">
            <!-- <span>{{ message }}</span> -->
            <span>{{ numFather }}</span>
        </slot>
        <!-- <div v-color="color">测试</div> -->
        <!-- <a-button @click="sendRealMessage" type="primary">点击触发</a-button> -->
        <a-input v-model.value="value"/>
        <a-button @click="increaseNum">点击加一</a-button>
        <a-button @click="decreaseNum">点击减一</a-button>
        <div>{{ num }}</div>
        <div class="square"></div>
    </div>
</template>
<style lang="less" scoped>
.square {
    aspect-ratio: 1;
    // padding-top: 20%;
    border: 1px solid black;
    width: 20%;
}
// .slot-style {
//     display: flex;
//     flex-direction: column;
// }

</style>