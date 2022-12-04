<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import liveingRoom from '@/assets/image/livingRoom.jpg'
import kitchen from '@/assets/image/kitchen.jpg'
import tip from '@/assets/image/tip.png'
import gsap from "gsap";
let scene: any = ref(null)
let camera: any = ref(null)
let controls: any = ref(null)
let renderer: any = ref(null)
let axisHelper: any = ref(null)
let sphere: any = ref(null)
let timer: any = ref(null)
let threeDBox: any = ref(null)
let time = {
    value: 0
}
let dataList = [
    {
        // image: require("@/assets/image/livingRoom.jpg"),
        image: liveingRoom,
        tipsList: [
            {
                position: { x: -200, y: -4, z: -147 },
                content: {
                    title: "进入厨房",
                    text: "",
                    image: 1,
                    showTip: false,
                    showTitle: true,
                },
            },
            {
                position: { x: -100, y: 0, z: -231 },
                content: {
                    title: "信息点2",
                    text: "77989",
                    showTip: true,
                    showTitle: false,
                },
            },
            {
                position: { x: 150, y: -50, z: -198 },
                content: {
                    title: "信息点3",
                    text: "qwdcz",
                    showTip: true,
                    showTitle: false,
                },
            },
            {
                position: { x: 210, y: 11, z: -140 },
                content: {
                    title: "信息点4",
                    text: "大豆食心虫侦察十大大苏打大大大大大大大",
                    showTip: true,
                    showTitle: false,
                },
            },
            {
                position: { x: 208, y: -12, z: 140 },
                content: {
                    title: "信息点5",
                    text: "eq",
                    showTip: true,
                    showTitle: false,
                },
            },
            {
                position: { x: 86, y: -9, z: 236 },
                content: {
                    title: "进入房间",
                    text: "",
                    showTip: false,
                    showTitle: true,
                },
            },
        ],
    },
    {
        // image: require("@/assets/image/kitchen.jpg"),
        image: kitchen,
        tipsList: [
            {
                position: { x: -199, y: -24, z: 145 },
                content: {
                    title: "进入大厅",
                    text: "",
                    image: 0,
                    showTip: false,
                    showTitle: true,
                },
            },
        ],
    },
]
let tipsSpriteList: any = []
let tooltipPosition = {
    top: "-100%",
    left: "-100%",
}
let titlePosition = {
    top: "-100%",
    left: "-100%",
}
let tooltopContent: any = {}
const initScene = () => {
    scene.value = new THREE.Scene();
    scene.value.background = new THREE.Color(0x101010);
}
const initCamera = (element: any) => {
    camera.value = new THREE.PerspectiveCamera(
        45,
        element.clientWidth / element.clientHeight,
        0.1,
        1000
    );
    camera.value.position.set(50, 0, 40);
}
const initControls = (element: any) => {
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
const initContent = (index = 0) => {
    let sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    sphereGeometry.scale(16, 16, -16);
    let texture = new THREE.TextureLoader().load(dataList[index].image);
    let sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    sphere.value = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.value.add(sphere.value);
    addTipsSprite()
}
const addTipsSprite = (index = 0) => {
    let tipTexture = new THREE.TextureLoader().load(
        // require("@/assets/image/tip.png")
        tip
    );
    let material = new THREE.SpriteMaterial({ map: tipTexture });
    tipsSpriteList = [];
    dataList[index].tipsList.forEach((item: any) => {
        let sprite = new THREE.Sprite(material);
        sprite.scale.set(10, 10, 10);
        sprite.position.set(item.position.x, item.position.y, item.position.z);
        sprite.content = item.content;
        tipsSpriteList.push(sprite);
        scene.value.add(sprite);
    });
}
const changeContentAndtips = (index: number) => {
    scene.value.children = scene.value.children.filter(
        (item: any) => String(item.type) !== "Sprite"
    );
    tipsSpriteList = [];
    let texture = new THREE.TextureLoader().load(dataList[index].image);
    let sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
    });
    sphere.value.material = sphereMaterial;
    gsap.to(sphereMaterial, { transparent: true, opacity: 1, duration: 2 });
    camera.value.updateProjectionMatrix();
    addTipsSprite(index);
}
const render = () => {
    controls.value.update();
    renderer.value.render(scene.value, camera.value);
    renderer.value.sortObjects = false;
    timer.value = requestAnimationFrame(render);
    time.value += 0.015;
}

const onResize = () => {
    let element = threeDBox.value;
    camera.value.aspect = element.clientWidth / element.clientHeight;
    camera.value.updateProjectionMatrix();
    renderer.value.setSize(element.clientWidth, element.clientHeight);
}
const onMouseClick = (e: any) => {
    e.preventDefault();
    let element = threeDBox.value;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (e.clientX / element.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / element.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera.value);
    let intersects = raycaster.intersectObjects(tipsSpriteList, true);
    if (intersects.length > 0 && intersects[0].object.content.showTitle) {
        changeContentAndtips(intersects[0].object.content.image);
        handleTooltipHide(e);
    }
}
const tooltipBox: any = ref(null)
const titleBox: any = ref(null)
const onMousemove = (e: any) => {
    e.preventDefault();
    let element = threeDBox;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (e.clientX / element.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / element.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera.value);
    let intersects = raycaster.intersectObjects(tipsSpriteList, true);
    if (intersects.length > 0) {
        let elementWidth = element.clientWidth / 2;
        let elementHeight = element.clientHeight / 2;
        let worldVector = new THREE.Vector3(
            intersects[0].object.position.x,
            intersects[0].object.position.y,
            intersects[0].object.position.z
        );
        let position = worldVector.project(camera.value);
        tooltopContent = intersects[0].object.content;
        if (intersects[0].object.content.showTip) {
            let left = Math.round(
                elementWidth * position.x +
                elementWidth -
                tooltipBox.value?.clientWidth / 2
            );
            let top = Math.round(
                -elementHeight * position.y +
                elementHeight -
                tooltipBox.value?.clientHeight / 2
            );
            tooltipPosition = {
                left: `${left}px`,
                top: `${top}px`,
            };
        } else if (intersects[0].object.content.showTitle) {
            let left = Math.round(
                elementWidth * position.x +
                elementWidth -
                titleBox.value?.clientWidth / 2
            );
            let top = Math.round(-elementHeight * position.y + elementHeight);
            titlePosition = {
                left: `${left}px`,
                top: `${top}px`,
            };
        }
    } else {
        handleTooltipHide(e);
    }
}
const handleTooltipHide = (e: any) => {
    e.preventDefault();
    tooltipPosition = {
        top: "-100%",
        left: "-100%",
    };
    titlePosition = {
        top: "-100%",
        left: "-100%",
    };
    tooltopContent = {};
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
    window.addEventListener("click", onMouseClick, false);
    renderer.value.domElement.addEventListener(
        "mousemove",
        onMousemove,
        false
    );
    tooltipBox.value.addEventListener(
        "mouseleave",
        handleTooltipHide,
        false
    );
})

onUnmounted(() => {
    cancelAnimationFrame(timer.value);
})
</script>

<template>
    <div class="home">
        <div class="view-container" ref="threeDBox"></div>
        <div class="tooltip-box" :style="tooltipPosition" ref="tooltipBox">
            <div class="container">
                <div class="title">标题：{{ tooltopContent.title }}</div>
                <div class="explain">说明：{{ tooltopContent.text }}</div>
            </div>
        </div>
        <p class="title-text" ref="titleBox" :style="titlePosition">
            {{ tooltopContent.title }}
        </p>
    </div>
</template>

<style lang="less">
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
  .title-text {
    position: absolute;
    width: 66px;
    color: #382129;
  }
  .tooltip-box {
    position: absolute;
    padding: 0px 0px 40px 0px;
    line-height: 30px;
    border-radius: 4px;
    color: #ffffff;
    z-index: 100;
    cursor: pointer;
    .container {
      position: relative;
      width: 240px;
      max-height: 200px;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.6);
      // &::before {
      //   content: "";
      //   position: absolute;
      //   bottom: -16px;
      //   left: 20%;
      //   border-top: 16px solid rgba(0, 0, 0, 0.8);
      //   border-left: 10px solid transparent;
      //   border-right: 10px solid transparent;
      // }
      .title {
        width: 100%;
        padding: 6px 0;
      }
      .explain {
        width: 100%;
        max-height: 100px;
        font-size: 14px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        &::-webkit-scrollbar-track {
          background: #353535;
          border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb {
          background: #cdcdcd;
          border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #9c9c9c;
        }
        &::-webkit-scrollbar-corner {
          background: #f6f6f6;
        }
      }
    }
  }
}
</style>