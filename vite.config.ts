import solidPlugin from "vite-plugin-solid";
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	plugins: [
		solidPlugin(),
		legacy({
			targets: [
				"last 30 versions or > 0.01% or not dead or last 3 IE versions"
			],
		}),
	],
	server: {
		port: 3000,
	}
});
