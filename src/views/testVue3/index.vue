<script lang="ts" setup>
import { ref, provide } from 'vue';
import TestHeader from '@/components/TestVue3Components/TestHeader.vue';
import TestVue3AnotherHeader from '@/components/TestVue3Components/TestVue3AnotherHeader.vue'
const activeKey = ref('TestHeader')
type TabHeader =  {
    name: string,
    value: Object,
}[]
const textMessage = ref('传递的值from父组件')
const tabHeaderArr: TabHeader = [
    {
        name: 'TestHeader',
        value: TestHeader,
    },
    {
        name: 'TestVue3AnotherHeader',
        value: TestVue3AnotherHeader,
    },
]
const clickmessage = (val: any) => {
    console.log('触发了子组件的事件', val)
}
provide('father-number', 2000)
// const passageValue = ref('asdasdsd')
const passageValue = 'asdasdsd'
const slotName = 'footer'
const eg = () => {
    return new Promise((resolve, reject) => {
        console.log('执行了promise')
        resolve('1')
    })
}
const functionTest = () => {
    setTimeout(() => {
        eg()
    },2000)
}
functionTest()
// console.log(eg())
</script>
<template>
    <div>{{ $translate('greetings.hello') }}</div>
    <div>
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane :key="item.name" :tab="item.name" v-for="item in tabHeaderArr">
                <!-- <div>{{ item.name }}</div> -->
                <!--v-model="passageValue"  组件间的需要是单个的-->
                <keep-alive include="TestHeader,TestVue3AnotherHeader" :max="2">
                    <Transition name="fade" mode="out-in">
                        <!-- <TestHeader/> -->
                        <component :is="item.value" :text-message="textMessage" @send-message="clickmessage" v-model="passageValue">
                            <span>插槽测试{{ item.name }}</span>
                            <template #anotherHeader>
                                <span>特殊的anotherHeader插槽的grandSon插槽
                                </span>
                            </template>
                            <slot name="otherHeader">
                                <span>特殊的anotherHeader插槽的grandHeader插槽</span>
                            </slot>
                            <template #[slotName] message="hello world">
                                <span>footer</span>
                            </template>
                        </component>
                    </Transition>
                </keep-alive>
                <!-- <TestVue3AnotherHeader v-model="passageValue"/> -->
            </a-tab-pane>
        </a-tabs>
    </div>
    <!--<Transition name="fade" mode="out-in">
    <component :is="activeComponent"></component>
  </Transition>-->
</template>
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>