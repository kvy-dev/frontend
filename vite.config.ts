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
        name: 'Vite PWA App',
        short_name: 'VitePWA',
        description: 'A Vite + React + PWA app',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon.png',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
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
  }
})