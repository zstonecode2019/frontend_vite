<template>
	<div>
		testTone.js
		<el-button type="primary" v-for="tone in tones" @mousedown="playTone(tone)" @mouseup="stopTone" :key="tone">{{ tone }}</el-button>
	</div>
</template>

<script setup>
import * as Tone from 'tone';

const tones = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

const synth = new Tone.Synth().toDestination();

// let intervalId = null

const playTone = (tone) => {
	console.log('mousedown');
	let now = Tone.now();
	// trigger the attack immediately
	synth.triggerAttack(tone, now);
	// wait one second before triggering the release
	synth.triggerRelease(now + 1);
	// intervalId = setInterval(() => {
	// }, 1000)
};

// const stopTone = () => {
//     clearInterval(intervalId)
// }
</script>

<style lang="scss" scoped></style>
