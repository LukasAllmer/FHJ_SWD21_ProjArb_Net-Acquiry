import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginChecker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		pluginChecker({ typescript: true }),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.png"],
			devOptions: {
				enabled: true,
			},
			manifest: {
				name: "net acquiry",
				short_name: "net acquiry",
				description: "A PWA to request data from users via preconfigured links",
				theme_color: "#e2e2e2",
				icons: [
					{
						src: "favicon.ico",
						sizes: "64x64",
						type: "image/ico",
					},
					{
						src: "apple-touch-icon.png",
						sizes: "180x180",
						type: "image/png",
					},
					{
						src: "mask-icon.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
		}),
	],
});
