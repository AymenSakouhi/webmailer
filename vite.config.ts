import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// set putting @rollup/plugin-commonjs v21 into the build.rollupOptions.plugins

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
