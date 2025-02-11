import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    allowedHosts: ["gardano-frontend.onrender.com"], // ✅ อนุญาตให้ใช้โดเมน Render
  },
  plugins: [react()], // ✅ ใช้ React Plugin ของ Vite
});
