<script lang="ts" setup>
const NotFoundStyle = {
    'width': '80vw',
    'height': '60vh',
}
</script>
<template>
    <div class="pic-style">
        <svg-icon :name="404" :style="NotFoundStyle"></svg-icon>
    </div>
</template>
<style lang="less">
.pic-style {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>