<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import type { SizeType } from 'ant-design-vue/es/config-provider';
const proxy = getCurrentInstance()?.proxy
const $antIcons = proxy?.$antIcons
const size = ref<SizeType>('large')
type videoUtilsType = {
    name: string,
    icon: string,
    type: string,
}[]
let defaultType = [
    {
        name: '上一个',
        icon: 'StepBackwardOutlined',
        type: 'pre',
        // <step-backward-outlined />
    },
    {
        name: '播放',
        icon: 'PlayCircleOutlined',
        type: 'play',
        // <play-circle-outlined />
    },
    {
        name: '暂停',
        icon: 'PauseCircleOutlined',
        type: 'pause',
        // <pause-circle-outlined />
    },
    {
        name: '刷新',
        icon: 'RedoOutlined',
        type: 'refresh',
        // <redo-outlined />
    },
    {
        name: '下一个',
        icon: 'StepForwardOutlined',
        type: 'next',
        // <step-forward-outlined />
    },
    {
        name: '减慢倍率',
        icon: 'StepForwardOutlined',
        type: 'playDecreaseRate'
    },
    {
        name: '加快倍率',
        icon: 'StepForwardOutlined',
        type: 'playIncreaseRate'
    },
    {
        name: '恢复正常倍率',
        icon: 'StepForwardOutlined',
        type: 'playNormalRate'
    },
]
let drawArr = ref([] as videoUtilsType)
const currentType = ref('play')
const emit = defineEmits(['operate'])
const operate = (type: string) => {
    // console.log(type)
    currentType.value = type
    emit('operate',currentType.value)
}
</script>

<template>
    <div v-for="item in defaultType" :key="item.icon" class="video-all-block">
        <a-button type="primary" :size="size" class="video-single-block" shape="round" @click="operate(item.type)">
            <template #icon>
                <component :is="$antIcons[item.icon]"  style="font-size: 20px"/>
            </template>
            <span>{{ item.name }}</span>
        </a-button>
    </div>
</template>

<style lang="less" scoped>
.video-all-block {
    margin-top: 30px;
}
.video-single-block {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
}
.video-name-style{
    font-size: 16px;
    margin-right: 5px;
    padding: 5px;
}

.video-icon-style {
    width: 20px;
    height: 20px;
}
</style>