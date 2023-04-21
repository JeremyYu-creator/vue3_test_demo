<script lang="ts" setup>
import { useRouter } from 'vue-router'
import useStore from '@/store/index'
import { TwitterOutlined } from '@ant-design/icons-vue';
const router = useRouter()
const { menu } = useStore()
const NotFoundStyle = {
    'width': '80vw',
    'height': '60vh',
}
const wayBack = () => {
    menu.setBreadCrumb([{
        name: '首页',
        path: '/',
        child: true,
        key: '1'
    }])
    router.push(menu.path)
}
</script>
<template>
    <div class="pic-style">
        <svg-icon :name="'404'" :style="NotFoundStyle"></svg-icon>
        <div>
            <a-button type="primary" shape="round" class="row-btn-style" @click="wayBack">
                <twitter-outlined />back home
            </a-button>
        </div>
    </div>
</template>
<style lang="less">
.pic-style {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.row-btn-style {
    margin-top: 20px;
}
</style>