import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VISITLY',
        short_name: 'Visitly',
        description: 'Scan property visits',
        theme_color: '#2a115b',
        background_color: '#2a115b',
        orientation: 'portrait',
        display: 'standalone',
        icons: [
          {
            "src": "manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }        
        ],
      },
      devOptions: {
        enabled: false, // Keep true for dev mode
        type: "module",
        navigateFallback: undefined, // Prevents dev-sw.js from being used
      },
      workbox: {
        // Disable caching to avoid overwriting issues
        runtimeCaching: [],
      },
    }),
  ],
  resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        "services": path.resolve(__dirname, "./src/services/"),
        "utils": path.resolve(__dirname, "./src/utils/"),
        "pages": path.resolve(__dirname, "./src/pages/"),
        "components": path.resolve(__dirname, "./src/components/"),
        "hooks": path.resolve(__dirname, "./src/hooks/"),
        "routes": path.resolve(__dirname, "./src/routes/"),
      }
  },
  server: {
    host: '0.0.0.0', // Allow external access
    allowedHosts: ['major-brooms-smoke.loca.lt'], // Add the host here
  },
})