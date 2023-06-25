import { v4 as uuidv4 } from 'uuid';

interface UserData {
	name?: string;
	password?: string;
	age?: number;
	gender?: string;
	avatar?: string;
	nickname?: string;
	level?: number;
	phone_number?: string;
	email?: string;
	address?: string;
	birthday?: string;
}

export default class User {
	uuid: string;
	name: string;
	password: string;
	age: number;
	gender: string;
	avatar: string;
	nickname: string;
	level: number;
	phone_number: string;
	email: string;
	address: string;
	birthday: string;

	constructor(user: UserData) {
		this.uuid = uuidv4();
		Object.assign(this, user);
	}
	sayHello() {
		console.log(`Hello, I'm User new ${this.uuid}.`);
	}
}
