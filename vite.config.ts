import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd(), "")
  const PORT = `${env.VITE_PORT ?? '5173'}`;

  return {
    server: {
      port: parseInt(PORT),
      host: true,
    },
    plugins: [react()],
  }
})
