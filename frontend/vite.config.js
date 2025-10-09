import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `${process.env.REACT_APP_BACEND_URI}`,
        changeOrigin: true,
        secure: false
      }
    },
    historyApiFallback: true, // 👈 Add this line
  },
});
