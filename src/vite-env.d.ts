/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BACKEND_URL: string;
	// 更多环境变量...
}
declare module '*.vue' {
	import type { DefineComponent } from 'vue';

	const vueComponent: DefineComponent<any, any, any>;

	export default vueComponent;
}
