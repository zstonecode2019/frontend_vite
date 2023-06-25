import { v4 as uuidv4 } from 'uuid';
import Page from '../Page/index';

export default class Project {
	uuid: string;
	belong_project: string; // 所属项目
	pages: Array<Page>; // 页面
	name: string; // 章节名称

	constructor() {
		this.uuid = uuidv4();
	}
	sayHello() {
		console.log(`Hello, I'm Chapter new ${this.uuid}.`);
	}
	serialize() {
		return {
			uuid: this.uuid,
			belong_project: this.belong_project,
			pages: this.pages.map((page) => page.serialize()),
		};
	}
}
