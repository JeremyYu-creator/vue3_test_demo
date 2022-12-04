<script lang="ts" setup>
</script>

<template>
    <div>
        <!-- <div class="box"></div> -->
        <video  src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/ogg">
            <!-- <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/ogg"></source> -->
        </video>
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