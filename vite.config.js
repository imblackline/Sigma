import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";


export default defineConfig({
    base: "/",
    plugins: [
        vue(),
    ],
    server: {
        port: 8080,
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: path.resolve(__dirname, "src"),
            },
            {
                find: "~",
                replacement: path.resolve(__dirname, "src"),
            },
        ],
    },
    css: {
        // preprocessorOptions: {
        //     scss: {
        //         additionalData: `@import "./src/assets/styles/media";
        //         @import "./src/assets/styles/animations";`,
        //     },
        // },
    },
});
