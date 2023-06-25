import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'node:path';
import { normalizePath } from 'vite';

const copySourcePath = normalizePath(path.resolve(__dirname, './src/lib/benben_avg/dist/benben_avg.js'));
const copyDestPath = normalizePath(path.resolve(__dirname, './public/js'));

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		resolveExternalsPlugin({
			benben_avg: 'benben_avg',
		}),
		viteStaticCopy({
			targets: [
				{
					src: copySourcePath,
					dest: copyDestPath,
				},
			],
		}),
	],
});
