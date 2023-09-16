import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [threeMinifier(), sveltekit()],

	ssr: {
		noExternal: ['three', 'threlte']
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
});
