<script lang="ts" setup>
import { getBgcSet, bgcArr } from '@/utils/radomBackground'
import { ref, onMounted, reactive } from 'vue'
import useStore from '@/store/index'
import { useRouter } from 'vue-router'
import { FormState } from '@/typing/user'

onMounted(() => {// 动态设置随机背景图
    backgroundSet.value = getBgcSet(bgcArr)
})
const router = useRouter()
const backgroundSet = ref('')
const formState = reactive<FormState>({
    userName: '',
    password: '',
});
// remember: false,
const remember = ref(false)
const { user } = useStore()
const onFinish = async () => { // 成功的回调函数
    // 提交信息通过接口返回判断相关逻辑
    try {
        const res = await user.sendUserInfo(formState)
        /**
         * 要考虑保存下当前页面，可以让用户在重新登陆后再次到之前的页面
         * **/
        if (res?.desc === 'success') {
            user.setToken(res?.token)
            user.setUserInfo(formState)
            router.push('/')
        } else {
            console.log('error')
        }
    } catch (err) {
        console.log(err)
    }
};

const onFinishFailed = (errorInfo: any) => { // 失败的回调函数
    console.log('Failed:', errorInfo);
};

</script>
<template>
    <div class="background-style" :style="{ backgroundImage: `url(${backgroundSet})` }">
        <a-card class="login-card-style">
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="账号" name="userName" :rules="[{ required: true, message: '请输入账号!' }]">
                    <a-input v-model:value="formState.userName" />
                </a-form-item>

                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="remember">Remember me</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<style lang="less">
.background-style {
    height: 100%;
    width: 100%;
    /*把背景图片放大到适合元素容器的尺寸，图片比例不变*/
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
}

.login-card-style {
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.9;
    background: linear-gradient(rgba(255, 255, 255), rgb(241, 233, 233));
    border-radius: 10px;
}
</style>