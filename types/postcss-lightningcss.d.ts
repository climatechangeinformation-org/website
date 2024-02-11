declare module "postcss-lightningcss" {
	import { Plugin } from "postcss";

	export default function lightningCss(partialOptions: {[key: string]: any}): Plugin;
}
