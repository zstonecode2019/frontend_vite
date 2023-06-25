import Page from './';
import Size from './Size';
import Constants from '../Constants';

export default class VerticalPage extends Page {
	// 竖屏页面
	constructor() {
		super();
		this.canvas.width = Constants.PAGE_HEIGHT;
		this.canvas.height = Constants.PAGE_WIDTH;
		this.size = new Size(this.canvas);
	}
}
