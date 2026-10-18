import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyRequest, request) => {
            if (request.headers.host) {
              proxyRequest.setHeader('x-bloom-dev-host', request.headers.host)
            }
          })
        },
      },
    },
  },
})
