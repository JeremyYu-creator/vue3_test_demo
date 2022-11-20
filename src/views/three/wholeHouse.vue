<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
let scene: any = null
let camera: any = null
let controls: any = null
let renderer: any = null
let axisHelper: any = null
let sphere: any = null
let timer: any = null
let threeDBox: any = ref(null)
let time = {
    value: 0
}
let dataList = [
    {
        image: require("@/assets/image/livingRoom.jpg"),
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
        image: require("@/assets/image/kitchen.jpg"),
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
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101010);
}
const initCamera = (element: any) => {
    camera = new THREE.PerspectiveCamera(
        45,
        element.clientWidth / element.clientHeight,
        0.1,
        1000
    );
    camera.position.set(50, 0, 40);
}
const initControls = (element: any) => {
    controls = new OrbitControls(camera, element);
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enablePan = false;
}
const initRenderer = (element: any) => {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(element.offsetWidth, element.offsetHeight);
    element.appendChild(renderer.domElement);
}
const initContent = (index = 0) => {
    let sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    sphereGeometry.scale(16, 16, -16);
    let texture = new THREE.TextureLoader().load(dataList[index].image);
    let sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    addTipsSprite()
}
const addTipsSprite = (index = 0) => {
    let tipTexture = new THREE.TextureLoader().load(
        require("@/assets/image/tip.png")
    );
    let material = new THREE.SpriteMaterial({ map: tipTexture });
    tipsSpriteList = [];
    dataList[index].tipsList.forEach((item: any) => {
        let sprite = new THREE.Sprite(material);
        sprite.scale.set(10, 10, 10);
        sprite.position.set(item.position.x, item.position.y, item.position.z);
        sprite.content = item.content;
        tipsSpriteList.push(sprite);
        scene.add(sprite);
    });
}
const changeContentAndtips = (index: number) => {
    scene.children = scene.children.filter(
        (item: any) => String(item.type) !== "Sprite"
    );
    tipsSpriteList = [];
    let texture = new THREE.TextureLoader().load(dataList[index].image);
    let sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
    });
    sphere.material = sphereMaterial;
    gsap.to(sphereMaterial, { transparent: true, opacity: 1, duration: 2 });
    camera.updateProjectionMatrix();
    addTipsSprite(index);
}
const render = () => {
    controls.update();
    renderer.render(scene, camera);
    renderer.sortObjects = false;
    timer = requestAnimationFrame(render);
    time.value += 0.015;
}

const onResize = () => {
    let element = threeDBox.value;
    camera.aspect = element.clientWidth / element.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(element.clientWidth, element.clientHeight);
}
const onMouseClick = (e: any) => {
    e.preventDefault();
    let element = threeDBox.value;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (e.clientX / element.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / element.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
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
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(tipsSpriteList, true);
    if (intersects.length > 0) {
        let elementWidth = element.clientWidth / 2;
        let elementHeight = element.clientHeight / 2;
        let worldVector = new THREE.Vector3(
            intersects[0].object.position.x,
            intersects[0].object.position.y,
            intersects[0].object.position.z
        );
        let position = worldVector.project(camera);
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
    renderer.domElement.addEventListener(
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
    cancelAnimationFrame(timer);
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

</style>