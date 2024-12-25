import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import { robots } from "vite-plugin-robots";
import { VitePWA } from "vite-plugin-pwa";
import { webUpdateNotice } from "@plugin-web-update-notification/vite";
import { Buffer } from "buffer";
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

const base64Encode = (plaintext: string): string => {
  return Buffer.from(plaintext).toString("base64");
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ViteMinifyPlugin({}),
    legacy({
      targets: ["defaults"]
    }),
    robots(),
    webUpdateNotice({
      logVersion: true,
      versionType: 'build_timestamp',
      hiddenDefaultNotification: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Frontend App Test",
        short_name: "Frontend",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/"
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5_000_000
      }
    })
  ],
  server: {
    proxy: {
      "/api/rest": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest/, "")
      },
      "/misc/ps": {
        target: "http://localhost:8000",
        rewrite: (path) => path.replace(/^\/misc\/ps/, "")
      },
      "/misc/zk/spans": {
        target: "http://localhost:9411",
        rewrite: (path) => path.replace("/misc/zk/spans", "/api/v2/spans")
      }
    }
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const cleanName = id.toString()
              .split("node_modules/")[1].split("/")[0]
              .toString();
            return base64Encode(cleanName);
          }
        }
      }
    }
  }
});