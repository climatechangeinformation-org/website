declare module "postcss-lightningcss" {
	import { type Plugin } from "postcss";
	import { type Targets } from "lightningcss";

	export default function lightningCss(partialOptions: {
		browsers?: string;
		cssModules?: string | RegExp;
		cssModulesJSON?(
			cssFileName: string,
			json: object,
			outputFileName: string
		): void;
		lightningcssOptions?: {
			minify?: boolean;
			sourceMap?: boolean;
			cssModules?: boolean;
			targets?: Targets | {
				[key: string]: number;
			};
			drafts?: {
				[key: string]: boolean;
			};
		};
	}): Plugin;
}
