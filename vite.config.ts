import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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

      name: "js-upsert", // Replace with your library name
    },
    rollupOptions: {
      output: {
        format: "umd", // Universal Module Definition (UMD)
        // sourcem`ap: true,
      },
    },
    sourcemap: true,
  },
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: "jsdom",
    globals: true,

    setupFiles: "./test/setup.js",
  },
});
