import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
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