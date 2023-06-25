import { HandLandmarker, FilesetResolver, HandLandmarkerResult } from '@mediapipe/tasks-vision';

import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

export default class HandLandmarkerWrapper {
	handLandmarker: HandLandmarker | undefined = undefined;
	runningMode: 'IMAGE' | 'VIDEO' = 'VIDEO';

	async init() {
		const vision = await FilesetResolver.forVisionTasks('/wasm');
		this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
			baseOptions: {
				modelAssetPath: `/ai_models/hand_landmarker.task`,
				delegate: 'GPU',
			},
			runningMode: this.runningMode,
			numHands: 2,
		});
	}
	async detectVideo(video: HTMLVideoElement) {
		const canvasElement = document.createElement('canvas');
		const videoWidth = 800;
		const radio = video.videoHeight / video.videoWidth;
		video.style.width = videoWidth + 'px';
		video.style.height = videoWidth * radio + 'px';
		const naturalWidth = video.videoWidth;
		const naturalHeight = video.videoWidth * radio;
		canvasElement.style.width = `${videoWidth}px`;
		canvasElement.style.height = `${videoWidth * radio}px`;
		canvasElement.style.position = `absolute`;

		canvasElement.setAttribute('width', naturalWidth + 'px');
		canvasElement.setAttribute('height', naturalHeight + 'px');
		canvasElement.style.left = 'calc(12.5%)';
		canvasElement.style.top = '0px';
		video.parentNode?.appendChild(canvasElement);

		const predict = async () => {
			if (!this.handLandmarker) return;
			if (this.runningMode === 'IMAGE') {
				this.runningMode = 'VIDEO';
				await this.handLandmarker.setOptions({ runningMode: 'VIDEO' });
			}
			let lastVideoTime = -1;
			let results = undefined;
			const startTimeMs = performance.now();
			if (lastVideoTime !== video.currentTime) {
				lastVideoTime = video.currentTime;
				results = this.handLandmarker.detectForVideo(video, startTimeMs);
			}
			if (results) {
				// console.log(results);
				if (results.landmarks) {
					const landmarks = results.landmarks[0];
					if (landmarks && landmarks.length && landmarks[4] && landmarks[8]) {
						const distance = Math.cbrt(
							Math.pow(landmarks[4].x - landmarks[8].x, 2) +
								Math.pow(landmarks[4].y - landmarks[8].y, 2) +
								Math.pow(landmarks[4].z - landmarks[8].z, 2)
						);
						if (distance < 0.15) {
							console.log(distance);
							console.log(landmarks[4]);
						}
					}
				}
				this.drawResults(canvasElement, results);
			}
			let isVideoPlaying = true;
			video.addEventListener('loadeddata', () => {
				video.addEventListener('play', () => {
					isVideoPlaying = true;
				});
				video.addEventListener('pause', () => {
					isVideoPlaying = false;
				});
			});
			if (isVideoPlaying) {
				requestAnimationFrame(predict);
			}
		};
		predict();
	}
	drawResults(canvasElement: HTMLCanvasElement, results: HandLandmarkerResult) {
		if (!this.handLandmarker) return;

		const canvasCtx = canvasElement.getContext('2d');
		if (!canvasCtx) return;
		canvasCtx.save();
		canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
		if (results.landmarks) {
			results.landmarks.forEach((landmarks, index) => {
				drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
					color: index ? '#00FF00' : '#FF00ff',
					lineWidth: 5,
				});
				drawLandmarks(canvasCtx, landmarks, { color: index ? '#FF0000' : '#00FFff', lineWidth: 2 });
			});
		}
		canvasCtx.restore();
	}
}
