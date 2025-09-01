// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
var __electron_vite_injected_dirname = "E:\\workspace\\LKSOFTWARES\\proshop";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    server: {
      host: "0.0.0.0"
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__electron_vite_injected_dirname, "src/renderer/index.html"),
          splash: resolve(__electron_vite_injected_dirname, "src/renderer/splash.html")
        }
      }
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [react(), tailwindcss()]
  }
});
export {
  electron_vite_config_default as default
};
