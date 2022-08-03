<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <!--todo: 头部组件-->
      <div class="logo" />
      <Header/>
    </a-layout-header>
    <!--todo: 面包屑待做，通过面包屑进行页面的跳转-->
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <!--通过递归子组件方式进行渲染
              注意里面的数据结构一定要是一样的，
              否则无法进行递归-->
          <a-menu
              v-model:selectedKeys="selectedKeys"
              v-model:openKeys="openKeys"
              mode="inline"
              style="height: 100%"
          >
            <template v-for="item in menuList" :key="item.key">
                <template v-if="!item.children">
                  <a-menu-item :key="item.key">
                    <template #icon>
                      <component :is="$antIcons[item.icon]"/>
                    </template>
                    {{ item.title }}
                  </a-menu-item>
                </template>
              <template v-else>
                <sub-menu :key="item.key" :menu-info="item" />
              </template>
            </template>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <!--todo: 路由跳转-->
          Content
        </a-layout-content>
      </a-layout>
    </a-layout-content>
      <!--todo：footer组件-->
    <a-layout-footer style="text-align: center">
      <Footer/>
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined } from '@ant-design/icons-vue';
import Header from '@/components/header/header.vue'
import Footer from '@/components/footer/footer.vue'
import SubMenu from '@/components/aside/subMenu.vue'
import menuList from '@/mock/menuList'
import { ref, } from 'vue'
const collapsed = ref(false)
const selectedKeys = ref<string[]>([''])
const openKeys = ref<string[]>([''])
</script>

<style lang="less">
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
