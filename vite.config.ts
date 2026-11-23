import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Mode "preview" dipakai untuk pratinjau (alamat relatif + HashRouter).
// Build biasa dipakai untuk hosting di domain sendiri.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // BASE_PATH dipakai bila situs berada di sub-folder, misalnya GitHub Pages "/andalrumah/".
  base: mode === "preview" ? "./" : process.env.BASE_PATH ?? "/",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/app[extname]",
      },
    },
  },
}));
