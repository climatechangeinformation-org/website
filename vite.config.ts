import browserslist from 'browserslist';
import legacy from "@vitejs/plugin-legacy";
import lightningCss from "postcss-lightningcss";
import solidPlugin from "vite-plugin-solid";

import { browserslistToTargets } from "lightningcss";
import { defineConfig, splitVendorChunkPlugin } from 'vite';

const browsers = "last 30 versions or > 0.01% or not dead or last 3 IE versions";

export default defineConfig({
	build: {
		minify: "terser",
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					if (id.includes("solid-js")) {
						return "solidjs";
					} else if (id.includes("@solidjs/router")) {
						return "solidjs-router";
					} else if (id.includes("dayjs")) {
						return "dayjs";
					} else if (id.includes("chart.js")) {
						if (id.includes("helpers")) {
							return "chart-js-helper";
						}

						return "chart-js";
					} else if (id.includes("@kurkle/color")) {
						return "color";
					}

					return "vendor";
				}
			}
		}
	},
	css: {
		postcss: {
			plugins: [
				lightningCss({
					lightningcssOptions: {
						targets: browserslistToTargets(browserslist(browsers))
					}
				})
			]
		}
	},
	plugins: [
		solidPlugin(),
		splitVendorChunkPlugin(),
		legacy({
			targets: [
				browsers
			],
		}),
	],
	publicDir: "src/public",
	server: {
		port: 3000,
	}
});
