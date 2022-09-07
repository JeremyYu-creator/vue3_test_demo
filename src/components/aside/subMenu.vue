<template>
  <div>
    <a-sub-menu :key="menuInfo.key">
      <template #icon>
        <component :is="$antIcons[menuInfo.icon]" />
      </template>
      <template #title>
        <span @click="checkTo(menuInfo)">
          {{ menuInfo.title }}
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <component :is="$antIcons[item.icon]" />
            </template>
            <span @click="checkTo(item)">
              {{ item.title }}
            </span>
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
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import MenuList from "@/typing/menu";
// 这个地方如果使用Object会导致上方没有此属性报错
defineProps<{
  menuInfo: any
}>()

const router = useRouter()

/**
 * 由于可能是不止二级路由，也可能是三级路由，因此方法的触发位置上需要是在两个地方都要有，故跳转路由的方法要写在两个地方上
 * 如果想不跳错的话就要考虑是否存在此路由，就目前而言，如果是最后的要跳转的路由，它的children会是null，可以以此作为条件判断
 * **/
const checkTo = (e: MenuList) => {
  if (!e.children) {
    router.push(
      {
        name: e.meta,
      }
    )
    // menu.setCurrent(e.key,)
    console.log(e)
  }
}
// defineExpose({
//   selectedKeys,
//   openKeys,
// })

</script>

<style lang="less">
</style>
