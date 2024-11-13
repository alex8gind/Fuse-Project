import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173, 
      strictPort: true, 
      cors: true, // Enable CORS for QR scanner
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    define: {
      'process.env': env,
      global: {},  // for qrcode package compatibility
    },
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
      commonjsOptions: {
        include: [/qrcode/, /node_modules/]
      }
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom', 
        'react-toastify',
        'qrcode',
        '@yudiel/react-qr-scanner'
      ]
    },
    
  }
})