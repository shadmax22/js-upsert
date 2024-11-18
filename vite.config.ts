import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    dts({
      // plugin options
      include: ["**/*.ts", "src/**/*.d.ts"], // Paths to include
      exclude: ["**/*.spec.ts"], // Paths to exclude
      outDir: "dist/types", // Output directory for declaration files
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
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: "jsdom",
    globals: true,

    setupFiles: "./test/setup.js",
  },
});
