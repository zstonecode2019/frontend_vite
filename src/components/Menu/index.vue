<template>
	<div>
		<el-menu
			active-text-color="#ffd04b"
			background-color="#545c64"
			class="el-menu-vertical-demo"
			default-active="2"
			text-color="#fff"
			@open="handleOpen"
			@close="handleClose"
		>
			<el-menu-item v-for="menu in menus" :key="menu.name" :index="menu.name" @click="routeTo(menu)">
				<el-icon><icon-menu /></el-icon>
				<span>{{ menu.name }}</span>
			</el-menu-item>
			<!-- 
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <el-icon>
                    <document />
                </el-icon>
                <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <span>Navigator Four</span>
            </el-menu-item> -->
		</el-menu>
	</div>
</template>

<script setup>
import { routes } from '@/routes';
import { useRouter } from 'vue-router';
let menus = routes.find((route) => {
	return route.name === 'Home';
}).children;
console.log(menus);
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
const router = useRouter();
const handleOpen = (key, keyPath) => {
	console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
	console.log(key, keyPath);
};
const routeTo = (menu) => {
	// console.log('menu');
	router.push({ path: menu.path });
};
</script>

<style lang="scss" scoped></style>
