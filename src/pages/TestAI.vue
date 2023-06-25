<template>
	<div class="aitest">
		<div>
			<video class="aitest-video" ref="video" src="/videos/finger.mp4" controls></video>
		</div>
		<div>
			<el-button type="primary" @click="startCapture" :disabled="isStartCapture">开始捕捉</el-button>
		</div>
	</div>
</template>

<script setup>
import HandLandmarkerWrapper from '@/lib/mediapipe/HandLandmarkerWrapper';
import { ref } from 'vue';

const video = ref(null);
let isStartCapture = ref(false);

const startCapture = async () => {
	console.log('startCapture');
	isStartCapture.value = true;
	const handLandmarkerWrapper = new HandLandmarkerWrapper();
	await handLandmarkerWrapper.init();
	handLandmarkerWrapper.detectVideo(video.value);
};
</script>

<style lang="scss" scoped>
.aitest {
	&-video {
		width: 800px;
		height: 600px;
	}
}
</style>
