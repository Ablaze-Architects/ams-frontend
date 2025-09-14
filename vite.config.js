import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    eslint({
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: ['node_modules', 'dist'],
      overrideConfig: {
        rules: {
          'react-refresh/only-export-components': [
            'warn',
            { 
              allowConstantExport: true,
            },
          ],
        }
      }

    })
  ],
  base: process.env.VITE_BASE_PATH || "/ams-frontend",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  server: {
    hmr: {
      overlay: true // Ensures error overlay shows up
    }
  },
})
