import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'site',
    },
    plugins: [
        vue(),
    ],
    esbuild: {
        legalComments: 'none',
        keepNames: true,
    },
});
