import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    integrations: [
        react(),
        tailwind(),
        sitemap()
    ],

    i18n: {
            locales: ["es", "en"],
            defaultLocale: "en",
            routing: {
                prefixDefaultLocale: true,
            },
        },

    output: "static",
    base: "/",
    site: "https://iracebuy.com",
});
