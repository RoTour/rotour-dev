import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			"@components/*": "./src/components/*",
			"@models/*": "./src/types/*",
			"@services/*": "./src/services/*",
			"@types/*": "./src/types/*",
		}
	},
};

export default config;
