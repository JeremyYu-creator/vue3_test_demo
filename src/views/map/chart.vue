<template>
  <div>
    <div class="set-weather-style">
      <a-button @click="citySetVisible = true" primary>设置地图详情</a-button>
    </div>
    <div id="container"></div>
    <div>
      <a-drawer
      v-model:visible="citySetVisible"
      :title="drawerTitle"
      placement="right">
        <div>
          <a-input-search
              v-model:value="cityName"
              placeholder="请输入城市"
              enter-button
              @search="searchCity"
          />
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<!--设置初始画布-->
<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { onBeforeMount, onMounted, ref, onUnmounted} from 'vue'

const map:any = ref(null) // 图层的值
const load:any = ref(null) // 加载load的值
const cityName = ref('北京市') // 跳转搜索城市的名字
const citySetVisible = ref(false)
const drawerTitle = ref('地图城市设置详情')
const setGeolocation = () => { // 设置浏览器相关定位
  const geolocation = new load.value.Geolocation({
    enableHighAccuracy: true,
    timeout: 10000,
    // position: 'RB',
    buttonOffset: new load.value.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    // offset: [10,20],
    zoomToAccuracy: true,
  })
  // todo:目前定位有问题，需要再看看
  /**
   *  逆大天，谷歌浏览器无法进行定位，明明21年我用的时候还好使的，报的错误是"time out"
   *  详情可见：https://lbs.amap.com/faq/js-api/map-js-api/position-related/43361
      这个目前如果拿不到的话自动定位到北京天安门附近，但如果使用其他的浏览器还是可以拿到的，例如windows的edge
   * **/
  // console.log(map.value.getCity(), '----地图获取城市---')
  map.value.addControl(geolocation);
  geolocation.getCurrentPosition((status: string, result: any) => {
    if (status == "complete") {
      console.log(result, 'success');
      console.log(result.position.lng, result.position.lat); // 可以拿到坐标
    } else {
      console.log(result, 'error');
    }
  });
}
const getWeather = (cityName: string) => {
  const weather = new load.value.Weather();// 获取城市天气
  weather.getLive(cityName, function (err: any, data: any) {
    // 默认是北京市，可以后续考虑根据当前定位在哪儿显示当前城市的地图和天气
    // 获取该城市的当前天气情况
    console.log(err, data);
  });
  weather.getForecast(cityName, function (err: any, data: any) {
    // 获取该城市未来的天气状况
    console.log(err, data);
  });
}
const getTraffic = () => {
  const trafficLayer = new load.value.TileLayer.Traffic({ // 城市交通路线图展示
    // 显示当前路段的交通情况
    zIndex: 10,
  });
  map.value.add(trafficLayer);
}
const initMap = async() => { // 初始化加载地图、生成地图实例、后续只需对实例进行操作即可
  try {
    load.value =  await AMapLoader.load({
      key: '07a87fdfe672069746851ffcc8792560', // 申请的apikey
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
    map.value.getCity((info: any) => {
      console.log(info, '----获取的城市信息----')
    })
    getTraffic()
    setGeolocation() // 理想状态下应该是通过拿到当前定位的信息然后把定位城市作为动态设置、再去拿当前城市的天气
    getWeather('北京市')
  }
  catch(e:any) { // 初步方法错误收集
    console.log(e)
  }
}
const searchCity = () => {
  getWeather(cityName.value)
  map.value.setCity(cityName.value)
  map.value.getCity((info: any) => {
    console.log(info, '----获取的城市信息----')
  })
  citySetVisible.value = false
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

<style lang="less" scoped>
// todo: 地图需要设置成响应式，注意下
  #container{
    padding:0px;
    margin: 0px;
    width: 76vw;
    height: 70vh;
    // min-height: 450px;
  }
  .set-weather-style{
    margin-bottom: 15px;
  }

</style>
