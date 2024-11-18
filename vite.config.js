import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        popup: resolve(__dirname, "public/popup.html"), // Popup giriş noktası
      },
    },
    outDir: "dist", // Çıktı dizini
  },
});
