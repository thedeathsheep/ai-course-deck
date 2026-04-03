import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  publicDir: "assets",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, "index.html"),
        slides: path.resolve(__dirname, "slides/index.html"),
      },
    },
  },
});
