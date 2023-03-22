import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-electron-plugin";
import { customStart, loadViteEnv } from "vite-electron-plugin/plugin";
import renderer from "vite-plugin-electron-renderer";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  if (process.env.VITE_APP_PLATFORM === "desktop") {
    rmSync("dist-electron", { recursive: true, force: true });

    return {
      resolve: {
        alias: {
          "@": path.join(__dirname, "src"),
        },
      },
      plugins: [
        react(),

        electron({
          include: ["electron"],
          plugins: [
            // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
            loadViteEnv(),
          ],
        }),

        // Use Node.js API in the Renderer-process
        renderer({
          nodeIntegration: true,
        }),
      ],
      clearScreen: false,
    };
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
  };
});
