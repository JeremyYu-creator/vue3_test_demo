<script lang="ts" setup>
import { ref, onMounted } from 'vue'
/**
 * todo:需要知道当前窗口的宽和高，然后去动态设置，目前尚未得知
 */
const width = ref(0)
const height = ref(0)
onMounted(() => {
    width.value = window.innerWidth
    height.value = window.innerHeight
    console.log('宽高获取',width.value, height.value)
})
</script>
<template>
    <div class="loading-screen-style">
        <div class="loading-dot-style">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>
</template>
<style lang="less">
// 小球的尺寸
@ballSize: 10px;
@containerSize: 150px;
@n: 36;
@pdeg: (360deg / @n);
@ani-duration: 1000ms;
// 背景阴影的大小
@width: 100vw;
@height: 100vh;
.loading-screen-style {
    background-color: black;
    width: @width;
    height: @height;
    position: absolute;
    top:0;
    left:0;
    z-index: 999;
    // 暂时使用opacity做为loading的背景图
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-dot-style{
        width: @containerSize;
        height: @containerSize;
        margin: 50px auto;
        position: relative;
        // 变成圆
        border-radius: 50%;
        // outline: 1px solid #fff;
        .dot{
            position: absolute;
            left: 50%;
            top: 50%;
            width: @ballSize;
            height: @ballSize;
            margin-left: (-@ballSize / 2);
            margin-top: (-@ballSize / 2);
            perspective: 70px;
            transform-style: preserve-3d;
            // background-color: red;
            &::before, &::after{
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            &::before {
                background: #3883f7;
                top: -100%;
                animation: moveBlack @ani-duration infinite;
            }
            &::after {
                background: #fff;
                top: 100%;
                animation: moveWhite @ani-duration infinite;
            }
        }
    }
    @keyframes moveBlack {
        0% {
            animation-timing-function: ease-in;
        }
        25% {
            transform: translate3d(0, 100%, @ballSize);
            animation-timing-function: ease-out;
        }
        50% {
            transform: translate3d(0, 200%, 0);
            animation-timing-function: ease-in;
        }
        75%{
            transform: translate3d(0, 100%, -@ballSize);
            animation-timing-function: ease-out;
        }
    }
    @keyframes moveWhite {
        0% {
            animation-timing-function: ease-in;
        }
        25% {
            transform: translate3d(0, -100%, -@ballSize);
            animation-timing-function: ease-out;
        }
        50% {
            transform: translate3d(0, -200%, 0);
            animation-timing-function: ease-in;
        }
        75%{
            transform: translate3d(0, -100%, @ballSize);
            animation-timing-function: ease-out;
        }
    }
    // 递归生成的函数
    .loop(@i) when(@i <= @n) {
        .dot:nth-child(@{i}) {
            transform: rotate(@pdeg * @i) translateY((-@containerSize / 2));
            &::after, &::before {
                animation-delay: (@ani-duration / @n) * @i * 6;
            }
        }
        .loop(@i + 1)
    }
    .loop(1)
}
</style>