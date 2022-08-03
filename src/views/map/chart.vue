<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<!--设置初始画布-->
<script lang="ts" setup>
// import { MapLoader } from '@/utils/loadMap'
// import AMap from 'AMap'
import AMapLoader from '@amap/amap-jsapi-loader'
import { onBeforeMount, onMounted, ref} from 'vue'
const load: any = ref(null)
const map: any = ref(null)
const setMap = () => {
  load.value = AMapLoader.load({
    key: 'b9ea9c40cd19cdb2752e4751c21fdc56',
    version: '2.0',
    plugins: [
      // 一次性在最开始全部加载
      "AMap.Weather",
      "AMap.ToolBar",
      "AMap.PlaceSearch",
      "AMap.Marker",
      "AMap.Geolocation",
      "AMap.Autocomplete",
      "AMap.Driving",
      "AMap.DragRoute",
      "AMap.Geocoder",
      "AMap.Transfer",
      "AMap.Riding",
      // "AMap.IndoorMap",
    ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    AMapUI: {
      // 是否加载 AMapUI，缺省不加载
      version: "1.1", // AMapUI 缺省 1.1
      plugins: [], // 需要加载的 AMapUI ui插件
    },
    Loca: {
      // 是否加载 Loca， 缺省不加载
      version: "2.0", // Loca 版本，缺省 1.3.2
    },
  })
  map.value = new load.value.Map("container", {
    zoom: 15, //级别
    center: [116.4929, 39.942], //中心点坐标: 这里可以写成动态获取坐标吗？小程序方面需要获取用户允许才可以拿到位置
    viewMode: "3D", //使用3D视图
    // showIndoorMap:false, // 隐藏地图自带的室内地图图层
  });
}
const getMap = () => {

}
onBeforeMount(() => {
  // setMap()
})
onMounted(() => {

})
</script>

<style lang="less">

</style>
