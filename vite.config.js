import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svg'],
  },
  server: {
    port: (process.env.NODE_ENV === 'production' ? process.env.PORT : 5173) || 4000,
    // strictPort: true,
    // proxy: {
    //   '/api': {
    //     target: process.env.BACKEND_SERVER_URL,
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, ''),
    //   },
    // },
  },
});
