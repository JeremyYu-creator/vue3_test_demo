<template>
  <div class="header-style">
    <span class="text-style">
      <svg-icon :name="iconName" :style="headerSvg"></svg-icon>
    </span>
    <div class="avatar-style">
      <span class="text-style">hello! zhangsan</span>
      <a-dropdown :trigger="['click']" :placement="placements">
        <a-avatar :size="36" src="https://joeschmoe.io/api/v1/random" class="avatar-img-style"></a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="item in personSetting" :key="item.value" @click="setDialog(item.value)">
              {{item.name}}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
  <a-modal v-model:visible="visible" @ok="handleOk">
    <span>确认退出登录吗？</span>
  </a-modal>
</template>
<script lang="ts" setup>
import { getBgcSet, getIcon } from '@/utils/radomBackground'
import { ref, createVNode } from 'vue'
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const iconName = getBgcSet(getIcon)
const router = useRouter()
const personSetting = [
  {
    name: '信息设置',
    value: '1',
    icon: '',
  },
  {
    name: '详情/介绍',
    value: '2',
    icon: '',
  },
  {
    name: '登出',
    value: '3',
    icon: '',
  },
]
const placements = 'bottom'
const headerSvg = {
  'width': '5vw',
  'height': '10vh',
}
const setDialog = (value: string) => {
  console.log(value)
  value === '3' && confirm()
}
const visible = ref(false)
const handleOk = () => {
  visible.value = false
}
const confirm = () => {
  Modal.confirm({
    title: 'Confirm',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定退出登录吗？',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      // sessionStorage.removeItem('GlobalState')
      await sessionStorage.clear()
      router.push('/login')
    }
  });
};
</script>
<style lang="less">
.header-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-img-style {
  cursor: pointer;
  width: 5vw;
  height: 5vh;
  border-radius: 36px;
  border: 1px solid #ffffff;
  margin-left: 20px;
}
</style>
