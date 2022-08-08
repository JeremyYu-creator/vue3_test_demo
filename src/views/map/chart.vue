<template>
  <div>
    <div class="set-weather-style">
      <a-button @click="citySetVisible = true" primary class="common_btn_style">设置地图详情</a-button>
      <a-button @click="openWeatherCard" class="common_btn_style">{{openWeather}}</a-button>
    </div>
    <a-card class="map-style">
      <div id="container"></div>
      <a-spin tip="Loading..." class="loading-style" v-if="mapLoading">
      </a-spin>
    </a-card>
    <!--todo：增加关闭按钮-->
    <a-card hoverable class="card-style" :loading="weatherLoading" v-if="weatherVisible">
      <template #cover>
        <img alt="example" src="@/assets/weather/default.gif" class="img-style"/>
      </template>
      <a-card-meta :title="weatherTitle" class="card-title">
        <template #description class="card-text">{{description}}</template>
      </a-card-meta>
    </a-card>
    <div class="loading-style">
    </div>
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
              addon-before="查询城市"
          />
        </div>
        <!--表单搜索地点路线规划-->
        <div style="margin-top: 30px">
          <a-form>
            <a-form-item label="路线类型">
              <a-radio-group v-model:value="formState.routeType" button-style="solid">
                <a-radio-button :value="item.value" v-for="item in routeTypeMap" :key="item.value" style="font-size: 12px">
                  {{item.label}}</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="起点">
              <a-input v-model:value="formState.aimStartPlace" placeholder="请输入起点" />
            </a-form-item>
            <a-form-item label="终点">
              <a-input v-model:value="formState.aimEndPlace" placeholder="请输入终点" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="publicRouteSet(formState.routeType)">查询</a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </div>
    <!--展示路线的卡片，这里的内容完全来自高德地图-->
    <div id="panel" v-if="showDetail"></div>
  </div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import {onMounted, ref, onUnmounted, reactive} from 'vue'
// import AMap from 'AMap'
import {cityInfo} from '@/typing/city'


const map:any = ref(null) // 图层的值
const load:any = ref(null) // 加载load的值
const cityName = ref('北京市') // 跳转搜索城市的名字
const citySetVisible = ref(false)
const drawerTitle = ref('地图城市设置详情')
const weatherTitle = ref('')
const description = ref('')
const mapLoading = ref(true)
const weatherLoading = ref(true)
const isShow = ref(true)
const openWeather = ref('')
const weatherVisible = ref(true)
const routeDraw: any = ref(null)
const showDetail = ref(true)
const formState = reactive({
  routeType: '1',
  aimStartPlace: '',
  aimEndPlace: '',
})
// const typeLoader = { // 用不了
//   '1': 'Transfer',
//   '2': '',
//   '3': '',
// }
const routeTypeMap = [
  {
    value: '1',
    label: '公交出行',
  },
  {
    value: '2',
    label: '驾车出行',
  },
  {
    value: '3',
    label: '骑车出行',
  },
]
const setGeolocation = () => { // 设置浏览器相关定位
  const geolocation = new load.value.Geolocation({
    enableHighAccuracy: true,
    timeout: 10000,
    // position: 'RB',
    buttonOffset: new load.value.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    // offset: [10,20],
    zoomToAccuracy: true,
  })
  map.value.getCity((info: cityInfo) => { // 高德地图的命名不是驼峰
    console.log(info, '----获取的城市信息----')
    const { city, province }  = info
    cityName.value = city ? city : province
  })
  // todo:目前定位有问题，需要再看看
  /**
   *  逆大天，谷歌浏览器无法进行定位，明明21年我用的时候还好使的，报的错误是"time out"
   *  详情可见：https://lbs.amap.com/faq/js-api/map-js-api/position-related/43361
      这个目前如果拿不到的话自动定位到北京天安门附近，但如果使用其他的浏览器还是可以拿到的，例如windows的edge
   * **/
  map.value.addControl(geolocation);
  geolocation.getCurrentPosition((status: string, result: any) => {
    if (status === "complete") {
      console.log(result, 'success');
      console.log(result.position.lng, result.position.lat); // 可以拿到坐标
    } else {
      console.log(result, 'error');
    }
  });
}
const getWeather = (cityName: string) => {
  // console.log(cityName,)
  const weather = new load.value.Weather();// 获取城市天气
  weather.getLive(cityName, function (err: any, data: any) {
    // 默认是北京市，可以后续考虑根据当前定位在哪儿显示当前城市的地图和天气
    // 获取该城市的当前天气情况
    console.log(err, data);
    const {city, province, reportTime, temperature, weather, windDirection, windPower} = data
    weatherTitle.value = `${city}/${province}`
    description.value = `温度：${temperature}，天气：${weather},
    风力：${windPower}，风向：${windDirection}，天气更新时间：${reportTime}`
    weatherLoading.value = false
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
// 设置初始画布
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
        "AMap.citySearch"
        // "AMap.IndoorMap",
      ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: "1.1", // AMapUI 缺省 1.1
        plugins: [], // 需要加载的 AMapUI ui插件
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: "2.0", // Loca 版本，缺省为2.0版本
      },
    })
    map.value = new load.value.Map('container', { // 创建地图实例
      viewMode:"2D",    //是否为3D地图模式
      zoom: 15,           //初始化地图级别
      // center:[116.397428, 39.90923], //初始化地图中心点位置, 不写默认展示天安门的坐标
    })
    console.log('地图初始化执行顺序')
    mapLoading.value = false
    isShow.value = false
    openWeather.value = (weatherVisible.value ? '关闭' : '打开') + '天气卡片'
  }
  catch(e:any) { // 初步方法错误收集
    console.log(e)
    mapLoading.value = false
  }
}
const openWeatherCard = () => {
  weatherVisible.value = !weatherVisible.value
  openWeather.value = (weatherVisible.value ? '关闭' : '打开') + '天气卡片'
}
const searchCity = async() => {
  await initMap()
  getWeather(cityName.value)
  map.value.setCity(cityName.value)
  await map.value.getCity((info: any) => {
    console.log(info, '----获取的城市信息----')
  })
  citySetVisible.value = false
}
const publicRouteSet = (type: string) => { // 跳转指定路线
  routeDraw.value = null
  const transOptions = reactive({
    map: map.value,
    city: cityName.value ? '北京' : cityName.value,
    // city: '北京市',
    panel: "panel",
    policy: load.value.TransferPolicy.LEAST_TIME,
  })
  const commonOptions = reactive({
    map: map.value,
    city: cityName.value ? '北京' : cityName.value,
    panel: "panel",
  })
  if (type === '1') {
    routeDraw.value =  new load.value.Transfer(transOptions)
  } else if (type === '2'){
    routeDraw.value = new load.value.Riding(commonOptions)
  } else {
    routeDraw.value = new load.value.Driving(commonOptions)
  }
  routeDraw.value.search([
    {
      keyword: formState.aimStartPlace,
      city: cityName.value,
    },
    {
      keyword: formState.aimEndPlace,
      city: cityName.value,
    }
  ],
    function(status: any, result: any) {
      if (status === "complete") {
        console.log(result);
        console.log("绘制交通路线完成！");
      } else {
        console.log("绘制失败！" + result);
      }
    }
  )
  citySetVisible.value = false
}
onMounted(async() =>
  {
    try {
      await initMap()
      await getTraffic()
      await setGeolocation() // 理想状态下应该是通过拿到当前定位的信息然后把定位城市作为动态设置、再去拿当前城市的天气
      await getWeather(cityName.value)
    } catch(err:any) {
      console.log(err)
    }
  }
)
onUnmounted(() => {
  console.log('被销毁了')
  map.value.destroy()
})
</script>

<style lang="less" scoped>
::v-deep(.map-style) {
  .ant-card-body {
    padding: 0;
  }
}
</style>
<style lang="less" scoped>
// todo: 地图需要设置成响应式，注意下
  #container{
    padding:0px;
    margin: 0px;
    width: auto;
    height: 70vh;
    max-height: 800px;
    position: relative;
  }
  .set-weather-style{
    margin-bottom: 15px;
  }
  .img-style {
    width: 240px;
    height: 180px;
    object-fit: cover;
  }
  .card-style {
    width: 240px;
    position: absolute;
    //left: 13.5vw;
    top: 25%; // 后续需要进行适配
  }
  .map-style {
    padding: 0;
    text-align: center;
  }
  .loading-style{
    position: absolute;
    top: 50%;
  }
  .common_btn_style {
    width: @common_button_width;
    margin-right: 20px;
  }
  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 64px;
    right: 10px;
    width: 280px;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
</style>
