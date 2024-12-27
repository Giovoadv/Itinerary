import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDevelopment = mode === 'development'
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    server: {
      port: 5173,
      proxy: isDevelopment ? {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      } : undefined
    },
    define: {
      'process.env.MODE': JSON.stringify(mode),
      'process.env.VITE_BACK_END_URL': JSON.stringify(env.VITE_BACK_END_URL)
    }
  }
})
