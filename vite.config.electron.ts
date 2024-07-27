// vite.config.electron.ts
import { defineConfig } from 'vite'

export default defineConfig({
    publicDir: false,
    build: {
        emptyOutDir: false,
        ssr: 'src-electron/main.ts'
    },
    define: {
        // once again = traduce 'once again' = 'de nuevo'
        'import.meta.env.ELECTRON_APP_URL': JSON.stringify('index.html')
    }
})