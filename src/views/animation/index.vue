<script lang="ts" setup>
import { ref, onMounted, nextTick, } from 'vue'
import mockVideolist from '@/mock/videoList'
import { message } from 'ant-design-vue';
let videoList = ref([] as any)
videoList.value = mockVideolist.map((item) => {
    return {
        post: item.firstFrame.i2160,
        url: item.video.v2160,
    }
})
let videoUrl = ref({
    poster: '',
    url: '',
})
const check:any = ref(null)
let currentNum = ref(0)
let videoRef: any = ref(null)
const nextVideo = () => {
    currentNum.value + 1 > videoList.value.length - 1 ? message.info('没有数据了哦') : currentNum.value++
    changeUrl()
}
const prevVideo = () => {
    currentNum.value - 1 < 0 ? message.info('没有数据了哦',) : currentNum.value--
    changeUrl()
}
const autoPlayNextVideo = () => {
    currentNum.value++
	changeUrl()
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
// const endVideo = () => {
//     check.value.onended = () => {
//         console.log('播放完成')
//         nextTick(() => {
//             autoPlayNextVideo()
//         })
//     }
// }
// 切换video的src和poste +自动播放
const changeUrl = () => {
    videoUrl.value = videoList.value[currentNum.value]
    check.value.src = videoUrl.value.url
    check.value.poster = videoUrl.value.poster
    check.value.load()
    // const timer = setTimeout(() => {
    //     check.value.play()
    // }, 100)
}
const videoWaysSet = () => {
    console.log('dom元素',check.value)
    check.value.addEventListener('play', () => {
        console.log('开始播放了')
    })
    check.value.addEventListener('pause', () => {
        console.log('暂停了')
    })
    check.value.onended = () => {
        console.log('播放完成了')
        currentNum.value + 1 > videoList.value.length - 1 ? message.info('没有数据了哦') : autoPlayNextVideo()
    }
}
onMounted(async () => {
    /**
     * by 旭bro：使用v-for会导致创造出多个dom结点，后续更改会使用多次nextTick进行更新，因此可以考虑只创建一个dom，后续只更改src即可
     */
    videoUrl.value = videoList.value[0]
    check.value = document.getElementById('videoDom')
    videoWaysSet()
})


</script>

<template>
    <a-button @click="pauseVideo">点击暂停</a-button>
    <a-button @click="continueVideo">点击播放</a-button>
    <a-button @click="clearVideo">重新播放</a-button>
    <!-- <div v-for="(item, index) in videoList" :key="item.post" class="video-block">
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
    </div> -->
    <div class="video-block">
		<div class="border-left" @click="prevVideo">
		    <span>Left</span>
		</div>
		<video  type="video/.mp4" controls :poster="videoUrl.poster"
		        :src="videoUrl.url"
		        width="800"  height="450"
		        autoplay ref="videoRef" id="videoDom">
		</video>
		<div class="border-right" @click="nextVideo">
		    <span>Right</span>
		</div>
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