declare module "chart.js" {
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
		readonly width: number;
		static defaults: IDefaults;
		static version: string;
		options: IOptionsOptions;
		data: IOptionsData;
	}

	interface IDefaults {
		backgroundColor: string;
		borderColor: string;
		color: string;
	}

	interface ICoordinate {
		x: number;
		y: number;
	}

	interface IOptions {
		data: IOptionsData;
		options: IOptionsOptions;
		type: "bar" | "bubble" | "doughnut" | "line" | "polarArea" | "radar" | "scatter";
	}

	interface IOptionsData {
		datasets: IOptionsDataDataset[];
		labels: any[];
	}

	interface IOptionsDataDataset {
		borderColor: string;
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
		backgroundColor: string;
		borderColor: string;
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
		mode: string;
		intersect: boolean;
	}

	interface IOptionsScales {
		x: IChartScaleAxis;
		y: IChartScaleAxis;
	}
	
	interface IChartScaleAxis {
		beginAtZero?: boolean;
		grid: IChartScaleAxisItem;
		ticks: IChartScaleAxisItem;
		border: IChartScaleAxisItem;
	}

	interface IChartScaleAxisItem {
		color: string;
	}

	export class CategoryScale { }
	export class LinearScale { }
	export class LineController { }
	export class LineElement { }
	export class PointElement { }
	export class Tooltip { }
}
