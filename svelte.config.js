import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [sveltePreprocess({
    scss: {
      includePaths: 'src/lib/styles',
      prependData: "@import 'src/lib/styles/mixins.scss';",
    }
  })],

  kit: {
    adapter: adapter()
  }
};

export default config;
