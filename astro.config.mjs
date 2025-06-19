import { defineConfig } from "astro/config";
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    integrations: [react(), tailwind()],
    output: "static",
    base: "/",
    site: "https://iracebuy.com",
});
