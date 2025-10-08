import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Development server configuration
  server: {
    host: "::", // Listen on all network interfaces
    port: 8080, // Dev server port
    proxy: {
      // Forward any /api requests to the backend server
      "/api": {
        target: "http://localhost:5000", // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Vite plugins
  plugins: [
    react(), // React SWC plugin for fast compilation
  ],

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // "@/..." maps to "./src/..."
    },
  },

  // Fix for dependency pre-bundling issues
 optimizeDeps: {
  include: ['react', 'react-dom'],
  exclude: ['@tanstack/react-query', 'react-router-dom'],
},

});