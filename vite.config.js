import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    server: {
        allowedHosts: [
            "reselect-dipped-motion.ngrok-free.dev"
        ]
    }
});
