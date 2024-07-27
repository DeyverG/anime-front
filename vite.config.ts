import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  base: env.mode === 'production' ? './' : '/',
  plugins: [react()],
}))
