/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PLATFORM: "web" | "desktop";
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
