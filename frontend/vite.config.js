import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})


export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                // allows external access (e.g., 10.195.250.163)
    port: 5173,                // optional if you’re using 5173
    allowedHosts: ['ips.iitdh.ac.in'],  // 👈 add your hostname here
  },
  
})
