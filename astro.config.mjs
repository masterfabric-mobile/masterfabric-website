import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://masterfabric.co",
  integrations: [tailwind(), mdx(), sitemap(), icon()],
  devToolbar: {
    enabled: false,
  },
  alias: {
    "@layouts": path.resolve("./src/layouts"),
  },
});
