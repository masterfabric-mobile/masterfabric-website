import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless"; // ✅ Vercel adaptörü eklendi
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://masterfabric.co",
  output: "server", // ✅ SSR için gerekli
  adapter: vercel(), // ✅ Vercel adaptörü

  integrations: [tailwind(), mdx(), sitemap(), icon()],

  devToolbar: {
    enabled: false, // ✅ Astro Dev Toolbar dev modda bile görünmez
  },

  vite: {
    resolve: {
      alias: {
        "@layouts": path.resolve("./src/layouts"),
        "@components": path.resolve("./src/components"), // eklediğim örnek alias
        "@pages": path.resolve("./src/pages"),
      },
    },
  },
});
