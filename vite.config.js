import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // önemli: diğer cihazlardan erişim için
    port: 5173,         // istersen değiştirebilirsin (örneğin 3000)
  },
  build: {
    target: ['es2015'], // ES5 değil, ES2015 (yeterli uyumluluk sağlar)
    cssTarget: 'chrome60' // daha eski tarayıcılar için
  },
})
