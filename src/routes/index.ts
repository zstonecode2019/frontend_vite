import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import NotFound from '../pages/NotFound.vue';
// import TestAI from '../pages/TestAI.vue'
// import TestWebGPU from '../pages/TestWebGPU.vue'

import api from '@/api/Api';

import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
	{
		path: '/',
		name: 'Home',
		components: {
			default: Home,
		},
		redirect: '/testai',
		children: [
			{ path: '/testai', component: () => import('../pages/TestAI.vue'), name: 'TestAI' },
			{ path: '/testwebgpu', component: () => import('../pages/TestWebGPU.vue'), name: 'TestWebGPU' },
			{ path: '/testtone', component: import('../pages/TestTone.vue'), name: 'TestTone' },
		],
	},
	{ path: '/login', component: Login },
	{ path: '/404', component: NotFound },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
});

// 路由守卫
router.beforeEach((to) => {
	try {
		if (!to.matched.length) {
			router.push('/404?page=' + to.fullPath);
		}
		if (['/login', '/register'].includes(to.fullPath)) {
			return true;
		}
		// 判断是否登录
		if (api.getToken()) {
			return true;
		} else {
			router.push('/login');
		}
	} catch (e) {
		console.log(e);
	}
});
