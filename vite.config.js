import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: 5173, 
      strictPort: true, // don't automatically try another port if 5173 is in use
    },
    define: {
      'process.env': env
    },
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'react-toastify']
    }
  }
})