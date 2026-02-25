import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../public/javascripts",
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/stylesheets": "http://localhost:3000",
      "/images": "http://localhost:3000",
    },
  },
});
