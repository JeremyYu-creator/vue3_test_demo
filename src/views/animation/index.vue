<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import mockVideolist from '@/mock/videoList'
import { message } from 'ant-design-vue';
console.log('初始数据',mockVideolist)
let videoList = ref([] as any)
videoList.value = mockVideolist.map((item) => {
    return {
        post: item.firstFrame.i2160,
        url: item.video.v2160,
    }
})
let currentNum = ref(0)
watch(currentNum, (newVal, oldVal) => {
    console.log('新的', newVal, '旧的', oldVal)
})
const currentStatus = ref(true)
let videoRef: any = ref(null)
// console.log(videoRef.value)
const nextVideo = () => {
    nextTick(() => {
        videoWaysSet()
    })
    console.log('走了这里2')
    currentNum.value + 1 > videoList.value.length - 1? message.info('没有数据了哦') : currentNum.value++
}
const prevVideo = () => {
    currentNum.value - 1 < 0 ? message.info('没有数据了哦',) : currentNum.value--
}
const autoPlayNextVideo = () => {
    console.log('走了这里1')
    nextTick(() => {
        currentNum.value++
    })
}
const pauseVideo = () => {
    check.value.pause()
}
const continueVideo = () => {
    check.value.play()
}
const clearVideo = () => {
    check.value.currentTime = 0
    check.value.play()
}
const endVideo = () => {
    check.value.onended = () => {
        console.log('播放完成')
        nextTick(() => {
            autoPlayNextVideo()
        })
    }
}
const videoWaysSet = () => {
    check.value = document.getElementById('videoDom')
    console.log('dom元素',check.value)
    check.value.addEventListener('play', () => {
        currentStatus.value = true
        console.log('开始播放了')
    })
    check.value.addEventListener('pause', () => {
        console.log('暂停了')
    })
    check.value.onended = () => {
        console.log('播放完成了')
        nextTick(() => {
            autoPlayNextVideo()
        })
    }
    // check.value.addEventListener('ended', () => {
    //     currentStatus.value = false
    //     check.value = document.getElementById('videoDom')
    //     console.log('播放完了')
    //     // currentNum.value++
    //     nextTick(() => {
    //         autoPlayNextVideo()
    //     })
    // })
}
const check:any = ref(null)
onMounted(async () => {
    videoWaysSet()
    // nextTick(() => {
    //     videoWaysSet()
    // })
})


</script>

<template>
    <a-button @click="pauseVideo">点击暂停</a-button>
    <a-button @click="continueVideo">点击播放</a-button>
    <a-button @click="clearVideo">重新播放</a-button>
    <div v-for="(item, index) in videoList" :key="item.post" class="video-block">
        <div v-if="currentNum === index" class="video-style">
            <div class="border-left" @click="prevVideo">
                <span>Left</span>
            </div>
            <video  type="video/.mp4" controls :poster="item.poster"
                    :src="item.url"
                    width="800"  height="450"
                    autoplay ref="videoRef" id="videoDom">
            </video>
            <div class="border-right" @click="nextVideo">
                <span>Right</span>
            </div>
        </div>
        <!-- <div>
            <video  type="video/.mp4" controls 
                    width="800"  height="450"
                    autoplay ref="videoRef" id="videoDom">
                    <source  src="https://prod-streaming-video-msn-com.akamaized.net/35960fe4-724f-44fc-ad77-0b91c55195e4/bfd49cd7-a0c6-467e-ae34-8674779e689b.mp4" type="video/mp4">
            </video>
        </div> -->
    </div>
</template>

<style lang="less">
.box{
    width: 150px;
    height: 150px;
    position:relative;
    background-color: red;
    animation: first 5s infinite;
	animation-direction:alternate;
    // -webkit-animation:first 5s infinite;
	// -webkit-animation-direction:alternate;
}

.video-style {
    display: flex;
    justify-content: center;
    align-items: center;
}
.video-block {
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.border-left, .border-right {
    border: 1px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.border-left, .border-right {
    :hover{
        background-color: brown;
        width: 50px;
        height: 50px;
        border: 1px solid black;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.border-left {
    margin-right: 100px;
}

.border-right {
    margin-left: 100px;
}

@keyframes first {
    0% {
        background-color: red;
        left: 0px;
        top: 0px;
    }

    25% {
        background-color: bisque;
        left: 200px;
        top: 0px;
    }

    50% {
        background-color: aqua;
        left: 200px;
        top: 100px;
    }

    75% {
        background-color: blueviolet;
        left: 0px;
        top: 100px;
    }

    100% {
        background-color: red;
        left: 0px;
        top: 0px;
    }
}

</style>