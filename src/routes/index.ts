
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'

import api from '@/api/Api'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

// 路由守卫
router.beforeEach((to, from) => {
    if (['/login', '/register'].includes(to.fullPath)) {
        return true;
    }
    // 判断是否登录
    if (api.getToken()) {
        return true;
    } else {
        router.push('/login')
    }
    // ...
    // explicitly return false to cancel the navigation
    // return true
})

export default router;