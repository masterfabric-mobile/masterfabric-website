/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        // sans: [
        //   "Bricolage Grotesque Variable",
        //   "Inter Variable",
        //   "Inter",
        //   ...defaultTheme.fontFamily.sans,
        // ],
        mono: [
          "Fira Code", // Add your monospace font here
          "Fira Mono",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          ...defaultTheme.fontFamily.mono,
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
