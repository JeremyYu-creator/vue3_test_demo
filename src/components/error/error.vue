<script lang="ts" setup>
/**
 * todo:可以更加完善好错误的样式，使组件更加完整
 */
const ErrorStyle = {
    'width': '80vw',
    'height': '80vh',
}
const props = defineProps({
  message: {
    type: String,
    default: '当前页面有问题，请稍后重试',
  }
})
const error = 'error'

</script>
<template>
    <div class="error-class">
        <!--引入新的svg后需要重新编译才会生效-->
        <svg-icon :name="error" :style="ErrorStyle"></svg-icon>
        <div class="error-message-class">
            <span>{{ props.message }}</span>
        </div>
    </div>
</template>
<style lang="less">
.error-class {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.error-message-class{
    font-size: 20px;
}
</style>