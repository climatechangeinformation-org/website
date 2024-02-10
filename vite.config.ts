import { browserslistToTargets } from 'lightningcss';
import lightningCss from "postcss-lightningcss";
import solidPlugin from "vite-plugin-solid";
import legacy from "@vitejs/plugin-legacy";
import browserslist from 'browserslist';
import { defineConfig } from "vite";

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
	},
	css: {
		postcss: {
			plugins: [
				lightningCss({
					lightningcssOptions: {
						targets: browserslistToTargets(browserslist("last 30 versions or > 0.01% or not dead or last 3 IE versions"))
					}
				})
			]
		}
	}
});
