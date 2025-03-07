import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    allowedHosts: ["gardano-production.up.railway.app"], // ✅ ใช้ URL ของ Railway หรือ Netlify
  },
  define: {
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
      "https://gardano-production.up.railway.app" // ✅ ใช้ URL ของ Backend บน Railway
    ),
  },
  plugins: [react()], // ✅ ใช้ React Plugin ของ Vite
  base: "/", // ✅ ตั้งค่าให้เป็น root path
});
