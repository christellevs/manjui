import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: {
                'bundle': 'lib/index.ts',
                'components': 'lib/components/index.ts',
                'utils': 'lib/utils/index.ts',
            },
            name: 'manjui',
            formats: ['es'],
            cssFileName: 'components',
        },
        rollupOptions: {
            external: ['vue', 'vue-router', 'nanoevent', 'mesh-decorators', 'mesh-ioc'],
        },
    },
    plugins: [
        vue(),
        dts({
            include: ['lib/**'],
            tsconfigPath: './tsconfig.build.json',
        }),
    ],
    esbuild: {
        legalComments: 'none',
        keepNames: true,
    },
    server: {
        port: 8881
    }
});
