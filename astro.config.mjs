import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://masterfabric.co",
  integrations: [tailwind(), mdx(), sitemap(), icon()],
   output: "server", 
  adapter: vercel(),

  devToolbar: {
    enabled: false, 
  },

  vite: {
    resolve: {
      alias: {
        "@layouts": path.resolve("./src/layouts"),
        "@components": path.resolve("./src/components"), 
        "@pages": path.resolve("./src/pages"),
      },
    },
  },
});
