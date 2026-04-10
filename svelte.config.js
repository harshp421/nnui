import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*'],
			handleHttpError: ({ path }) => {
				if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.svg')) {
					return;
				}
			}
		}
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => filename.includes('node_modules') ? undefined : { runes: true }
	}
};

export default config;
