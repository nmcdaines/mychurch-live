import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    commonjsOptions: {
      dynamicRequireTargets: ["@libsql/darwin-arm64"],
    },
    rollupOptions: {
      external: ["@libsql/client", "@libsql/darwin-arm64"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
