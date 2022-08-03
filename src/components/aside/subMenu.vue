<template>
  <div>
    <a-sub-menu :key="menuInfo.key">
      <template #icon>
        <component :is="$antIcons[menuInfo.icon]"/>
      </template>
      <template #title>{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <component :is="$antIcons[item.icon]"/>
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-sub-menu>
  </div>
</template>
<script lang="ts" setup>
defineProps<{menuInfo: Object}>()

</script>

<style lang="less">

</style>
