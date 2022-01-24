import { defineNuxtConfig } from "nuxt3";
import * as path from "path";

export default defineNuxtConfig({
  buildModules: [
    "@pinia/nuxt",
    "@intlify/nuxt3",
  ],
  store: false,
  features: {
    store: false,
  },
  alias: {
    "@lib": path.resolve(__dirname, "./index.ts"),
    "~@/assets": path.resolve(__dirname, "./assets"),
  },
});
