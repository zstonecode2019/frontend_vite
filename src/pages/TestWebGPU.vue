<template>
	<div>
		<div>
			<canvas id="canvas" ref="canvas_ref" width="800" height="600"></canvas>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
	Engine3D,
	Scene3D,
	Object3D,
	Camera3D,
	View3D,
	LitMaterial,
	BoxGeometry,
	MeshRenderer,
	DirectLight,
	SpotLight,
	HoverCameraController,
	AtmosphericComponent,
} from '@orillusion/core';
const canvas_ref = ref(null);
const init = async () => {
	let canvas = canvas_ref.value;
	console.log(canvas);
	if (!canvas) return;
	await Engine3D.init({
		canvasConfig: { canvas },
	});
	let scene3D = new Scene3D();
	// 添加大气散射天空组件
	let sky = scene3D.addComponent(AtmosphericComponent);
	// 新建摄像机实例
	let cameraObj = new Object3D();
	let camera = cameraObj.addComponent(Camera3D);
	// 根据窗口大小设置摄像机视角
	camera.perspective(60, window.innerWidth / window.innerHeight, 1, 5000.0);
	// 设置相机控制器
	let controller = camera.object3D.addComponent(HoverCameraController);
	controller.setCamera(0, 0, 15);
	// 添加相机节点
	scene3D.addChild(cameraObj);
	// 新建光照
	let light = new Object3D();
	// 添加直接光组件
	let component = light.addComponent(DirectLight);
	// let spot_component1 = light.addComponent(SpotLight);
	// 调整光照参数
	light.rotationX = 45;
	light.rotationY = 30;
	component.intensity = 2;
	// 添加光照对象
	scene3D.addChild(light);
	// // 新建光照
	// let spot_light = new Object3D();
	// // 添加直接光组件
	// let spot_component = spot_light.addComponent(SpotLight);
	// // 调整光照参数
	// spot_light.rotationX = 45;
	// spot_light.rotationY = 30;
	// spot_component.intensity = 2;
	// // 添加光照对象
	// scene3D.addChild(spot_light);
	// 新建对象
	const obj = new Object3D();
	// 为对象添 MeshRenderer
	let mr = obj.addComponent(MeshRenderer);
	// 设置几何体
	mr.geometry = new BoxGeometry(5, 5, 5);
	// 设置材质
	mr.material = new LitMaterial();
	scene3D.addChild(obj);
	// 创建View3D对象
	let view = new View3D();
	// 指定渲染的场景
	view.scene = scene3D;
	// 指定使用的相机
	view.camera = camera;
	// 开始渲染
	Engine3D.startRenderView(view);
};
onMounted(() => {
	init();
});
</script>

<style lang="scss" scoped></style>
