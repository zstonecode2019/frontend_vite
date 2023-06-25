import { v4 as uuidv4 } from 'uuid';
import Chapter from '../Chapter';

export default class Project {
	uuid: string;
	belong_user: string; // 所属用户
	type: string; // 项目类型
	chapters: Array<Chapter> = []; // 章节
	name: string; // 项目名称

	constructor() {
		this.uuid = uuidv4();
	}
	sayHello() {
		console.log(`Hello, I'm Project new ${this.uuid}.`);
	}
	serialize() {
		return {
			uuid: this.uuid,
			belong_user: this.belong_user,
			type: this.type,
			chapters: this.chapters.map((chapter) => chapter.serialize()),
		};
	}
}
