import { v4 as uuidv4 } from 'uuid';
import Stage from '../Stage';
import Size from './Size';

export default class Page {
	uuid: string;
	belong_chapter: string; // 所属章节
	name: string; // 页面名称
	stage: Stage; // 场景
	canvas: HTMLCanvasElement;
	size: Size;

	constructor(canvas?: HTMLCanvasElement) {
		this.uuid = uuidv4();
		if (canvas) {
			this.canvas = canvas;
		} else {
			this.canvas = document.createElement('canvas');
		}
	}
	sayHello() {
		console.log(`Hello, I'm Page new ${this.uuid}.`);
	}
	serialize() {
		return {
			uuid: this.uuid,
			belong_chapter: this.belong_chapter,
			stage: this.stage.serialize(),
		};
	}
}
