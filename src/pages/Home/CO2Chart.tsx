import co2_historical from "../../assets/co2_historical.json?url";

import { enUS } from "date-fns/locale";

import "chartjs-adapter-date-fns";

import { type ChartConfiguration } from "chart.js";

import {
	CategoryScale,
	Chart,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	Tooltip
} from "chart.js";

Chart.register(
	CategoryScale,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	Tooltip
);

import { type IChartScale } from "chart.js-supplementary";

let co2_chart_line_progress = 0;
let co2_chart: Chart | undefined;

interface ICO2Historical {
	year: string;
	co2: number;
}

function rgbStringValues(string: string) {
	return string.slice(4, -1).split(", ").map(value => parseFloat(value));
}

function formatAbsoluteYear(absolute_year: number) {
	if (absolute_year > 0) {
		return `${absolute_year} CE`;
	}

	return `${-absolute_year} BCE`;
}

export async function initiateCO2Chart() {
	const response = await fetch(co2_historical);
	let data = await response.json() as ICO2Historical[];
	data = data.reverse();
	const co2_chart_canvas = document.getElementById("co2_chart");

	co2_chart = new Chart(co2_chart_canvas as HTMLCanvasElement, {
		type: "line",
		data: {
			labels: data.map(row => (
				row.year.split(" ")[1] === "CE"
					? parseInt(row.year.split(" ")[0] as string)
					: -parseInt(row.year.split(" ")[0] as string)
			)),
			datasets: [{
				data: data.map(row => row.co2),
				borderColor: "#fff",
				segment: {
					borderColor: context => (
						context.p0DataIndex <= co2_chart_line_progress
							? "rgb(255, 255, 255)"
							: "rgb(0, 0, 0, 0)"
					)
				}
			}]
		},
		options: {
			animation: false,
			elements: {
				point: {
					pointStyle: false
				}
			},
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					callbacks: {
						label: context => context.formattedValue,
						title: context => formatAbsoluteYear(context[0]?.parsed.x as number)
					},
					mode: "index",
					intersect: false
				}
			},
			responsive: true,
			scales: {
				x: {
					parsing: false,
					type: "time",
					adapters: {
						date: {
							locale: enUS
						}
					},
					grid: {
						color: "rgb(255, 255, 255, 0)"
					},
					ticks: {
						color: "rgb(255, 255, 255, 0)",
						stepSize: 20,
						callback: value => formatAbsoluteYear(value as number)
					},
					border: {
						color: "rgb(255, 255, 255, 0)"
					}
				},
				y: {
					beginAtZero: true,
					grid: {
						color: "rgb(255, 255, 255, 0)"
					},
					ticks: {
						color: "rgb(255, 255, 255, 0)"
					},
					border: {
						color: "rgb(255, 255, 255, 0)"
					}
				}
			}
		}
	} as ChartConfiguration);
}

export function updateAnimation(event: WheelEvent) {
	const co2_chart_canvas = document.getElementById("co2_chart");

	const scales = co2_chart?.options.scales;
	const x_scale = scales?.["x"] as IChartScale;
	const y_scale = scales?.["y"] as IChartScale;
	const current_color = rgbStringValues(x_scale.grid.color);
	const current_opacity = current_color.pop() as number;

	if (
		(current_opacity <= 0.5 && event.deltaY > 0) ||
		event.deltaY <= 0
	) {
		const increment = current_opacity + (event.deltaY / 4000);
		const new_rgb = `rgb(${current_color.join(", ")}, ${increment})`;

		x_scale.grid.color = new_rgb;
		x_scale.ticks.color = new_rgb;
		x_scale.border.color = new_rgb;
		y_scale.grid.color = new_rgb;
		y_scale.ticks.color = new_rgb;
		y_scale.border.color = new_rgb;
	}

	const dataset = co2_chart?.data.datasets[0];
	const progress_max = dataset?.data.length as number;

	if (
		(co2_chart_line_progress <= progress_max && event.deltaY > 0) ||
		event.deltaY <= 0
	) {
		co2_chart_line_progress += Math.ceil(event.deltaY / 2);
	}

	co2_chart?.update();

	if (co2_chart_line_progress <= 0) {
		const title_element = document.getElementsByClassName("title")[0];
		co2_chart_canvas?.classList.remove("current");
		title_element?.classList.add("current");
		return 0;
	}

	return -1;
}
