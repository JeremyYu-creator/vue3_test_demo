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
import { onBeforeMount, onMounted, ref, onUnmounted} from 'vue'

// const map:any = shallowRef(null)
const map:any = ref(null) // 图层的值
const load:any = ref(null) // 加载load的值
const cityName = ref('') // 跳转搜索城市的名字
const initMap = async() => {
  try {
    load.value =  await AMapLoader.load({
      key: '07a87fdfe672069746851ffcc8792560',
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
    map.value = new load.value.Map('container', { // 创建地图实例
      viewMode:"2D",    //是否为3D地图模式
      zoom: 15,           //初始化地图级别
      // center:[116.397428, 39.90923], //初始化地图中心点位置, 不写默认展示天安门的坐标
    })
    const trafficLayer = new load.value.TileLayer.Traffic({ // 城市交通路线图展示
      // 显示当前路段的交通情况
      zIndex: 10,
    });
    map.value.add(trafficLayer);
    const geolocation = new load.value.Geolocation({ // 浏览器定位相关实例创建
      enableHighAccuracy: true,
      timeout: 10000,
      buttonOffset: new load.value.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      zoomToAccuracy: true,
    })
    // todo:目前定位有问题，需要再看看
    map.value.addControl(geolocation);
    map.value.setCity('长春市') // 后续改成动态城市
    geolocation.getCurrentPosition((status: string, result: any) => {
      if (status == "complete") {
        console.log(result, 'success');
        console.log(result.position.lng, result.position.lat); // 可以拿到坐标
      } else {
        console.log(result, 'error');
      }
    });
    const weather = new load.value.Weather();// 获取城市天气
    weather.getLive("长春市", function (err: any, data: any) {
      // 默认是北京市，可以后续考虑根据当前定位在哪儿显示当前城市的地图和天气
      // 获取该城市的当前天气情况
      console.log(err, data);
    });
    weather.getForecast("长春市", function (err: any, data: any) {
      // 获取该城市未来的天气状况
      console.log(err, data);
    });
  }
  catch(e:any) {
    console.log(e)
  }
  
}
const getMap = () => {

}
onBeforeMount(() => {
  // setMap()
})
onMounted(() => {
    initMap()
})
onUnmounted(() => {
  console.log('被销毁了')
})
</script>

<style lang="less">
  #container{
    padding:0px;
    margin: 0px;
    width: 100%;
    height: 800px;
  }
</style>
