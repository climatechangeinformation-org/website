declare module "chart.js" {
	import { type Locale } from "date-fns/types";

	interface ICoordinate {
		x: number;
		y: number;
	}

	interface ISize {
		width: number;
		height: number;
	}

	interface IArea {
		top: number;
		left: number;
		right: number;
		bottom: number;
		width: number;
		height: number;
	}

	type ChartType = (
		"bar" |
		"bubble" |
		"doughnut" |
		"line" |
		"pie" |
		"polarArea" |
		"radar" |
		"scatter"
	);

	type UpdateMode = (
		"active" |
		"default"|
		"hide" |
		"none" |
		"resize" |
		"reset" |
		"show"
	);

	type AnyObject = Record<string, any>;
	type EmptyObject = Record<string, never>;

	type Color = string | CanvasGradient | CanvasPattern;

	export declare class Chart {
		constructor(canvas: HTMLElement, options: IOptions);

		static register(...registrables: any[]): void;
		static unregister(...registrables: any[]): void;

		clear(): this;
		draw(): void;
		render(): void;
		reset(): void;
		stop(): this;
		update(): void;

		readonly attached: boolean;
		readonly height: number;
		readonly id: string;
		readonly platform: BasePlatform;
		readonly width: number;
		static defaults: IDefaults;
		static version: string;
		options: IOptionsOptions;
		data: IOptionsData;
	}

	export declare class BasePlatform {
		acquireContext(
			canvas: HTMLCanvasElement,
			options?: CanvasRenderingContext2DSettings
		): CanvasRenderingContext2D | null;

		addEventListener(
			chart: Chart,
			type: string,
			listener: (event: ChartEvent) => void
		): void;

		getDevicePixelRatio(): number;

		getMaximumSize(
			canvas: HTMLCanvasElement,
			width?: number,
			height?: number,
			aspect_ratio?: number
		): ISize;

		isAttached(
			canvas: HTMLCanvasElement
		): boolean;

		releaseContext(
			context: CanvasRenderingContext2D
		): boolean;

		removeEventListener(
			chart: Chart,
			type: string,
			listener: (event: ChartEvent) => void
		): void;

		updateConfig(
			config: IChartConfiguration | IChartConfigurationTypesDataset
		): void;
	}

	interface IChartConfigurationTypesDataset {
		data: unknown;
		options?: unknown;
		plugins?: unknown[];
	}

	interface IChartConfiguration {
		type: ChartType;
		data: IChartData;
		options?: unknown;
		plugins?: Plugin<TType>[];
		platform?: typeof BasePlatform;
	}

	interface Plugin {
		id: string;
		events?: (keyof HTMLElementEventMap)[];

		install?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		start?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		stop?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		beforeInit?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		afterInit?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject): void;

		beforeUpdate?(
			chart: Chart,
			args: {
				mode: UpdateMode,
				cancelable: boolean
			},
			options: AnyObject
		): boolean | void;

		afterUpdate?(
			chart: Chart,
			args: {
				mode: UpdateMode
			},
			options: AnyObject
		): void;

		beforeElementsUpdate?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		reset?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		beforeDatasetsUpdate?(
			chart: Chart,
			args: {
				mode: UpdateMode
			},
			options: AnyObject
		): boolean | void;

		afterDatasetsUpdate?(
			chart: Chart,
			args: {
				mode: UpdateMode,
				cancelable: boolean
			},
			options: AnyObject
		): void;

		beforeDatasetUpdate?(
			chart: Chart,
			args: {
				index: number,
				meta: unknown,
				mode: UpdateMode,
				cancelable: boolean
			},
			options: AnyObject
		): boolean | void;

		afterDatasetUpdate?(
			chart: Chart,
			args: {
				index: number,
				meta: unknown,
				mode: UpdateMode,
				cancelable: boolean
			},
			options: AnyObject
		): void;

		beforeLayout?(
			chart: Chart,
			args: {
				cancelable: boolean
			},
			options: AnyObject
		): boolean | void;

		beforeDataLimits?(
			chart: Chart,
			args: {
				scale: IScale
			},
			options: AnyObject
		): void;

		afterDataLimits?(
			chart: Chart,
			args: {
				scale: IScale
			},
			options: AnyObject
		): void;

		beforeBuildTicks?(
			chart: Chart,
			args: {
				scale: IScale
			},
			options: AnyObject
		): void;

		afterBuildTicks?(
			chart: Chart,
			args: {
				scale: IScale
			},
			options: AnyObject
		): void;

		afterLayout?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		beforeRender?(
			chart: Chart,
			args: {
				cancelable: boolean
			},
			options: AnyObject
		): boolean | void;

		afterRender?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		beforeDraw?(
			chart: Chart,
			args: {
				cancelable: boolean
			},
			options: AnyObject
		): boolean | void;

		afterDraw?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		beforeDatasetsDraw?(
			chart: Chart,
			args: {
				cancelable: boolean
			},
			options: AnyObject
		): boolean | void;

		afterDatasetsDraw?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject,
			cancelable: boolean
		): void;

		beforeDatasetDraw?(
			chart: Chart,
			args: {
				index: number,
				meta: unknown
			},
			options: AnyObject
		): boolean | void;

		afterDatasetDraw?(
			chart: Chart,
			args: {
				index: number,
				meta: unknown
			},
			options: AnyObject
		): void;

		beforeEvent?(
			chart: Chart,
			args: {
				event: IChartEvent,
				replay: boolean,
				cancelable: boolean,
				inChartArea: boolean
			},
			options: AnyObject
		): boolean | void;

		afterEvent?(
			chart: Chart,
			args: {
				event: IChartEvent,
				replay: boolean,
				changed?: boolean,
				cancelable: boolean,
				inChartArea: boolean
			},
			options: AnyObject
		): void;

		resize?(
			chart: Chart,
			args: {
				size: {
					width: number,
					height: number
				}
			},
			options: AnyObject
		): void;

		beforeDestroy?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		afterDestroy?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		uninstall?(
			chart: Chart,
			args: EmptyObject,
			options: AnyObject
		): void;

		defaults?: Partial<AnyObject>;
	}

	interface IChartEvent {
		type: (
			"contextmenu" |
			"mouseenter" |
			"mousedown" |
			"mousemove" |
			"mouseup" |
			"mouseout" |
			"click" |
			"dblclick" |
			"keydown" |
			"keypress" |
			"keyup" |
			"resize"
		);
		native: Event | null;
		x: number | null;
		y: number | null;
	}

	interface IScale {
		readonly chart: Chart;
		readonly ctx: CanvasRenderingContext2D;
		readonly id: string;
		readonly type: string;

		axis: string;
		labelRotation: number;
		max: number;
		maxHeight: number;
		maxWidth: number;
		min: number;
		paddingBottom: number;
		paddingLeft: number;
		paddingRight: number;
		paddingTop: number;
		ticks: ITick[];

		getMatchingVisibleMetas(
			type?: string
		): unknown;

		drawTitle(
			chart_Area: IArea
		): void;

		drawLabels(
			chart_Area: IArea
		): void;

		drawGrid(
			chart_Area: IArea
		): void;

		getDecimalForPixel(
			pixel: number
		): number;

		getPixelForDecimal(
			decimal: number
		): number;

		getPixelForTick(
			index: number
		): number;

		getLabelForValue(
			value: number
		): string;

		getLineWidthForValue(
			value: number
		): number;

		getPixelForValue(
			value: number,
			index?: number
		): number;

		getValueForPixel(
			pixel: number
		): number | undefined;

		init(
			options: O
		): void;

		parse(
			raw: unknown,
			index?: number
		): unknown;

		getMinMax(
			canStack: boolean
		): {
			min: number;
			max: number
		};

		getLabelItems(
			chartArea?: IArea
		): ILabelItem[];

		generateTickLabels(
			ticks: Tick[]
		): void;

		afterBuildTicks(): void;
		afterCalculateLabelRotation(): void;
		afterDataLimits(): void;
		afterFit(): void;
		afterSetDimensions(): void;
		afterTickToLabelConversion(): void;
		afterUpdate(): void;
		beforeBuildTicks(): void;
		beforeCalculateLabelRotation(): void;
		beforeDataLimits(): void;
		beforeFit(): void;
		beforeSetDimensions(): void;
		beforeTickToLabelConversion(): void;
		beforeUpdate(): void;
		buildTicks(): Tick[];
		calculateLabelRotation(): void;
		configure(): void;
		determineDataLimits(): void;
		fit(): void;
		getBasePixel(): number;
		getBaseValue(): number;
		getLabels(): string[];
		getTicks(): Tick[];
		getUserBounds(): {
			min: number,
			max: number,
			minDefined: boolean,
			maxDefined: boolean
		};
		isFullSize(): boolean;
		setDimensions(): void;
	}

	interface ITick {
		value: number;
		label?: string | string[];
		major?: boolean;
	}

	interface ILabelItem {
		label: string | string[];
		font: CanvasFontSpec;
		textOffset: number;
		options: IRenderTextOptions;
	}

	interface IRenderTextOptions {
		color?: Color;
		decorationWidth?: number;
		maxWidth?: number;
		rotation?: number;
		strikethrough?: boolean;
		strokeColor?: Color;
		strokeWidth?: number;
		textAlign?: CanvasTextAlign;
		textBaseline?: CanvasTextBaseline;
		translation?: [number, number];
		underline?: boolean;
		backdrop?: IBackdropOptions;
	}

	interface IBackdropOptions {
		left: number;
		top: number;
		width: number;
		height: number;
		color: Color | ((
			context: IScaleContext,
			options: AnyObject
		) => Color | undefined);
	}

	interface IScaleContext {
		chart: Chart;
		scale: IScale;
		index: number;
		tick: Tick;
	}

	interface IChartData {
		labels?: unknown[];
		xLabels?: unknown[];
		yLabels?: unknown[];
		datasets: unknown[];
	}

	interface CanvasRenderingContext2DSettings {
		alpha: boolean;
		desynchronized: boolean;
		colorSpace: "srgb" | "display-p3";
		willReadFrequently: boolean;
	}

	interface IDefaults {
		backgroundColor: Color;
		borderColor: Color;
		color: Color;
	}

	interface IOptions {
		data: IOptionsData;
		options: IOptionsOptions;
		type: ChartType;
	}

	interface IOptionsData {
		datasets: IOptionsDataDataset[];
		labels: any[];
	}

	interface IOptionsDataDataset {
		borderColor: Color;
		data: any[];
		segment: IOptionsDataDatasetSegment;
	}

	interface IOptionsDataDatasetSegment {
		borderColor: (context: ISegmentContext) => string;
	}

	interface ISegmentContext {
		datasetIndex: number;
		p0: ISegmentContextPoint;
		p0DataIndex: number;
		p1: ISegmentContextPoint;
		p1DataIndex: number;
		type: string;
	}

	interface ISegmentContextPoint extends ICoordinate {
		active: boolean;
		options: ISegmentContextPointOptions;
		parsed: ICoordinate;
		raw: number;
		skip: boolean;
		stop: boolean;
	}

	interface ISegmentContextPointOptions {
		backgroundColor: Color;
		borderColor: Color;
		borderWidth: number;
		hitRadius: number;
		hoverBorderWidth: number;
		hoverRadius: number;
		pointStyle: boolean;
		radius: number;
		rotation: number;
	}

	interface IOptionsOptions {
		animation: boolean;
		elements: IOptionsElements;
		maintainAspectRatio: boolean;
		plugins: IOptionsPlugins;
		responsive: boolean;
		scales: IOptionsScales;
	}

	interface IOptionsElements {
		point: IOptionsElementsPoint;
	}

	interface IOptionsElementsPoint {
		pointStyle: boolean;
	}

	interface IOptionsPlugins {
		tooltip: IOptionsPluginsTooltip;
	}

	interface IOptionsPluginsTooltip {
		callbacks: IOptionsPluginsTooltipCallbacks;
		mode: string;
		intersect: boolean;
	}

	interface IOptionsPluginsTooltipCallbacks {
		label: (context: any) => any;
		title: (context: any) => any;
	}

	interface IOptionsScales {
		x: IChartScaleAxis;
		y: IChartScaleAxis;
	}
	
	interface IChartScaleAxis {
		parsing?: boolean;
		type?: string;
		adapters?: IChartScaleAxisAdapter;
		beginAtZero?: boolean;
		grid: IChartScaleAxisItem;
		ticks: IChartScaleAxisTicks;
		border: IChartScaleAxisItem;
	}

	interface IChartScaleAxisAdapter {
		date: IChartScaleAxisDateAdapter;
	}

	interface IChartScaleAxisDateAdapter {
		locale: Locale;
	}

	interface IChartScaleAxisItem {
		color: Color;
	}

	interface IChartScaleAxisTicks extends IChartScaleAxisItem {
		callback?: (value: any) => any;
	}

	export class CategoryScale { }
	export class LinearScale { }
	export class LineController { }
	export class LineElement { }
	export class PointElement { }
	export class TimeScale { }
	export class Tooltip { }
}
