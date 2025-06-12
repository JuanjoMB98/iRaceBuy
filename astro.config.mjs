import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    output: 'static',
    base: '/iRaceBuy/',
    site: 'https://juanjomb98.github.io/'
  })


