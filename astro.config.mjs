import { defineConfig } from "astro/config";

const site = process.env.SITE_URL ?? "https://chrisbuen.github.io";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
