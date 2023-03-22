/// <reference types="vite-electron-plugin/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    DIST_ELECTRON: string;
    DIST: string;
    VITE_APP_PLATFORM: "web" | "desktop" | undefined;
    /** /dist/ or /public/ */
    PUBLIC: string;
  }
}
