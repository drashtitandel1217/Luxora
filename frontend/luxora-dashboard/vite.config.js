import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // LOCK THE PORT HERE
    port: 5175, 
    strictPort: true, // Prevents Vite from auto-switching to 5176, 5177, etc.
    
    proxy: {
      "/active-users": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
      "/login": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
      "/forecast": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
});