import path from "path"; // 1. path 불러오기
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 2. resolve 설정 추가
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
