import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// The dev proxy follows the API's own PORT from server/.env, so changing the port there is the only edit needed
// (set API_URL to point at a different host entirely).
export default defineConfig(({ mode }) => {
    const serverEnv = loadEnv(mode, '../server', '');
    const target = process.env.API_URL || `http://localhost:${serverEnv.PORT || 5000}`;
    return {
        plugins: [react()],
        server: {
            port: 5173,
            proxy: { '/api': target },
        },
    };
});
