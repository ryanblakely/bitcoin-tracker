import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true
  }),
  compressHTML: true,
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true
    }
  }
});
