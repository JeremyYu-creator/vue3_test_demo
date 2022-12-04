<script lang="ts" setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onMounted, ref, onUnmounted} from 'vue'
let scene: any = ref(null)
let camera: any =ref(null)
let controls: any = ref(null)
let renderer: any  = ref(null)
let axisHelper: any = ref(null)
let box: any = ref(null)
let timer: any = ref({ })
let picList =  ["left", "right", "top", "bottom", "front", "back"]
const initScene = ()=> {
        scene.value = new THREE.Scene();
        scene.value.background = new THREE.Color(0x101010);
      }
const initCamera = (element: any) =>  {
        camera.value = new THREE.PerspectiveCamera(
          45,
          element.clientWidth / element.clientHeight,
          0.1,
          1000
        );
        camera.position.set(50, 0, 40);
    }
const initControls = (element: any) =>  {
        controls.value = new OrbitControls(camera.value, element);
        controls.value.minDistance = 1;
        controls.value.maxDistance = 100;
        controls.value.enablePan = false;
      }
const initRenderer = (element: any) => {
        renderer.value = new THREE.WebGLRenderer();
        renderer.value.setSize(element.offsetWidth, element.offsetHeight);
        element.appendChild(renderer.value.domElement);
      }
const initContent = () => {
        let boxGeometry = new THREE.BoxGeometry(10, 10, 10);
        let boxMaterials:any = [];
        picList.forEach((item: any) => {
          let texture = new THREE.TextureLoader().load(
            require(`@/assets/image/${item}.png`)
          );
          boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
        });
        box.value = new THREE.Mesh(boxGeometry, boxMaterials);
        box.value.geometry.scale(10, 10, -10);
        scene.add(box.value);
      }
const render = () =>  {
        controls.value.update();
        renderer.value.render(scene.value, camera.value);
        timer.value = requestAnimationFrame(render);
}
let threeDBox: any = ref(null)
const onResize = () => {
        let element = threeDBox.value;
        camera.aspect = element.clientWidth / element.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(element.clientWidth, element.clientHeight);
}

onMounted(() => {
    let element = threeDBox.value;
      initScene();
      initCamera(element);
      initControls(element);
      initContent();
      initRenderer(element);
      render();
      window.addEventListener("resize", onResize, false);
})

onUnmounted(() => {
    cancelAnimationFrame(timer.value);
})
  </script>

<template>
    <div class="home">
      <div class="view-container" ref="threeDBox"></div>
    </div>
  </template>
  
  <style lang="less" scoped>
  .home {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .view-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  </style>
  