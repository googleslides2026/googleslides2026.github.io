import { defineConfig } from "vite";

// This project is meant to be hosted at a GitHub Pages *user* site
// (e.g. https://<username>.github.io), which is served from the domain
// root. If you instead deploy this as a *project* page
// (https://<username>.github.io/<repo>), change `base` below to
// "/<repo>/" so built asset paths resolve correctly.
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
