export default class Resource {
	file: string | string[];
	name: string;
	type: string;

	constructor(file: string | string[]) {
		this.file = file;
	}
}
