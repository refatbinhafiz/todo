import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
const manifestForPlugIn = {
  registerType: "prompt",
  includeAssets: ['**/*'],
  manifest: {
    name: "Todo",
    short_name: "Simple Todo",
    description: "A simple todo app",

    icons: [
      {
        src: "./maskable_icon_x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "./maskable_icon_x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "./maskable_icon_x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "./maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./maskable_icon_x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "./maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
