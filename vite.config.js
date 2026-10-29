import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 저장소 경로 (https://{사용자명}.github.io/my-community/)
  base: '/my-community/',
})
