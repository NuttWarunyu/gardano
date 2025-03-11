import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".", // กำหนด root path ให้เป็นโฟลเดอร์นี้
  publicDir: "public", // ระบุให้ Vite รู้ว่า public folder อยู่ที่ไหน
  build: {
    outDir: "dist", // output directory ที่ Vite จะใช้
    rollupOptions: {
      input: "public/index.html", // ระบุไฟล์ index.html ในโฟลเดอร์ public
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4173,
  },
  plugins: [react()],
  base: "/", // ตั้งค่าให้เป็น root path
});
