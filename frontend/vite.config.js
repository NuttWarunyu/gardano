import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // นี่คือการติดตั้ง plugin React ของ Vite

export default defineConfig({
  root: ".", // กำหนด root path ให้เป็นโฟลเดอร์นี้
  publicDir: "public", // ระบุให้ Vite รู้ว่า public folder อยู่ที่ไหน
  build: {
    outDir: "dist", // ตั้งค่า output directory ให้เป็น dist
    rollupOptions: {
      input: "index.html", // ระบุไฟล์ index.html
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4173, // ใช้ port ที่ไม่มีการใช้งานอื่น
  },
  plugins: [react()],
  base: "/",
});
