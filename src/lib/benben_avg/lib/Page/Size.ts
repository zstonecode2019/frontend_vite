import { EventEmitter } from 'eventemitter3';

export default class Size extends EventEmitter {
	width: number;
	height: number;
	aspectRatio: number;

	constructor(container: HTMLElement) {
		super();
		this.width = container.clientWidth;
		this.height = container.clientHeight;
		this.aspectRatio = this.width / this.height;
		container.addEventListener('resize', () => {
			this.update(container);
			this.emit('resize');
		});
	}
	update(container: HTMLElement) {
		this.width = container.clientWidth;
		this.height = container.clientHeight;
		this.aspectRatio = this.width / this.height;
	}
}
