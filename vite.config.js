import { sveltekit } from '@sveltejs/kit/vite';
import path from "path";
import devtoolsJson from 'vite-plugin-devtools-json';


/** @type {import('vite').UserConfig} */
const config = {
	envDir: './env',
	plugins: [sveltekit(), devtoolsJson()],
	server: {
		port: 5173,
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
