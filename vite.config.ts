
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Using '.' as a safe alternative if process.cwd() is causing type issues in certain environments.
  const env = loadEnv(mode, process.cwd?.() || '.', '');
  
  return {
    plugins: [react()],
    define: {
      // This allows your existing code to use process.env.API_KEY
      // It takes the API_KEY set in Netlify dashboard and injects it.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: './index.html'
      }
    }
  };
});
