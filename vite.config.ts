import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    dts({
      // plugin options
      include: ["**/*.ts"], // Paths to include
      exclude: ["**/*.spec.ts"], // Paths to exclude
      outDir: "dist", // Output directory for declaration files
    }),
    // other plugins...
  ],
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
        // sourcem`ap: true,
      },
    },
  },
});
