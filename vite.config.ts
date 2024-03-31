import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: "/test/index.html",
  },

  build: {
    lib: {
      entry: "index.ts", // Entry point of your library
      name: "js-upsert", // Name of your library (accessible in global scope)
    },
    rollupOptions: {
      output: {
        format: "umd", // Universal Module Definition (UMD)
      },
    },
  },
});
