import { sveltekit } from '@sveltejs/kit/vite';
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
	envDir: './env',
	plugins: [sveltekit()],
	server: {
		port: 10001,
	},
	preview : {
		port: 10001,
	},
	resolve: {
		alias: {
			'@components': path.resolve('src/components'),
			'@models': path.resolve('./src/types'),
			'@services': path.resolve('./src/services'),
			'@types': path.resolve('./src/types'),
		}
	}
};

export default config;
