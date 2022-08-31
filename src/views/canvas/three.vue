<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { TextureLoader } from 'three'

/**
 * 无法使用ref响应式进行值得传递
 */
// const scene: any = ref(null) //场景对象
// const scene: any = ref(null)
// const camera: any = ref(null) // 相机对象 
// const renderer: any = ref(null) // 渲染器对象
// const mesh: any = ref(null) // 网格模型对象

let scene = null //场景对象
let camera = null // 相机对象 
let renderer = null // 渲染器对象
let mesh = null // 网格模型对象

const initScene = () => {
    scene = new THREE.Scene()
    let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    // let geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    let material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    }); //材质对象Material 可以自定义颜色
    mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    /**
     * 光源设置
     */
    //点光源
    let point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    let container: any = document.getElementById('container');
    let width = window.innerWidth; //窗口宽度
    let height = window.innerHeight; //窗口高度
    let k = width / height; //窗口宽高比
    let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    container.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);

}
onMounted(() => {
    initScene()
})


</script>
<template>
    <div class="scene" id="container">
    </div>
</template>
<style lang="less">
#container {
    height: 400px;
}
</style>