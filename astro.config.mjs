import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    integrations: [
        react(),
        tailwind(),
    ],

    i18n: {
            locales: ["es", "en"],
            defaultLocale: "en",
            routing: {
                prefixDefaultLocale: false,
            },
        },

    output: "static",
    base: "/",
    site: "https://iracebuy.com",
});
