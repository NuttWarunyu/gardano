import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
      "https://gardano-production.up.railway.app/api" // URL ของ Backend ที่ Railway
    ),
  },
  plugins: [react()],
  base: "/",
});
