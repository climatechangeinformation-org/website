import type { Component } from "solid-js";
import { onMount } from "solid-js";

import "./Home.scss"
import Navigation from "../../components/NavBar";

import globe from "../../assets/globe.webp";
import co2_historical from "../../assets/co2_historical.json?url";

import "chartjs-adapter-date-fns";
import { enUS } from 'date-fns/locale';

import { type ChartConfiguration } from "chart.js";

import {
	CategoryScale,
	Chart,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	Tooltip,
} from "chart.js";

Chart.register(
	CategoryScale,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	Tooltip,
);

// TODO: Add sources for the background image
// land_shallow_topo_15360.webp: NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

// world.watermask.8100x4050.webp: Reto Stöckli; Eric Vermote; Nazmi Saleous; Robert Simmon; David Herring.

// gebco_08_rev_elev_8192x4096.webp: NASA's Earth Observatory;  British Oceanographic Data Centre; Jesse Allen.

// cloud_combined_8192.webp: NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.


// TODO: Add sources for the historical CO2 data
// 1959 - 2023 data: Dr. Xin Lan, NOAA/GML (gml.noaa.gov/ccgg/trends/) and Dr. Ralph Keeling, Scripps Institution of Oceanography (scrippsco2.ucsd.edu/).
// 803719 BCE - 1958 data: Bereiter, B., S. Eggleston, J. Schmitt, C. Nehrbass-Ahles, T. F. Stocker, H. Fischer, S. Kipfstuhl, J. Chappellaz. 2015. Revision of the EPICA Dome C CO2 record from 800 to 600 kyr before present. Geophysical Research Letters, 42(2), 542-549. doi: 10.1002/2014GL061957

interface ICO2Historical {
	year: string;
	co2: number;
	map: typeof Array.prototype.map;
}

var animation_stage = 0;
var co2_chart_line_progress = 0;

function rgbStringValues(string: string) {
	return string.slice(4, -1).split(", ").map(value => parseFloat(value));
}

function formatAbsoluteYear(absolute_year: number) {
	if (absolute_year > 0) {
		return absolute_year + " CE";
	}

	return -absolute_year + " BCE";
}

const Home: Component = () => {
	let co2_chart: Chart | undefined;

	document.addEventListener("wheel", event => {
		const co2_chart_canvas = document.getElementById("co2_chart")!;
		switch (animation_stage) {
			case 0:
				const title = document.getElementsByClassName("title")[0] as HTMLElement;

				if (!title.style.opacity) {
					title.style.opacity = "1";
				}

				if (
					(parseFloat(title.style.opacity) <= 1 && event.deltaY < 0) ||
					event.deltaY >= 0
				) {
					title.style.opacity = (parseFloat(title.style.opacity) - event.deltaY / 2000).toString()
				}
				
				if (parseFloat(title.style.opacity) <= 0) {
					animation_stage = 1;
					title.classList.remove("current");
					co2_chart_canvas.classList.add("current");
				}

				break;
			case 1:
				const current_color = rgbStringValues(co2_chart!.options.scales!["x"]!.grid!.color as string);
				const current_opacity = current_color.pop();

				if (
					(current_opacity! <= 0.5 && event.deltaY > 0) ||
					event.deltaY <= 0
				) {
					const new_rgb = `rgb(${current_color.join(", ")}, ${current_opacity! + event.deltaY / 4000})`;

					co2_chart!.options.scales!["x"]!.grid!.color = new_rgb;
					co2_chart!.options.scales!["x"]!.ticks!.color = new_rgb;
					(co2_chart!.options.scales!["x"]! as any).border!.color = new_rgb;
					co2_chart!.options.scales!["y"]!.grid!.color = new_rgb;
					co2_chart!.options.scales!["y"]!.ticks!.color = new_rgb;
					(co2_chart!.options.scales!["y"]! as any).border!.color = new_rgb;
				}

				const progress_max = co2_chart!.data.datasets[0]!.data.length;

				if (
					(co2_chart_line_progress <= progress_max && event.deltaY > 0) ||
					event.deltaY <= 0
				) {
					co2_chart_line_progress += Math.ceil(event.deltaY / 2);
				}

				co2_chart!.update();

				if (co2_chart_line_progress <= 0) {
					co2_chart_canvas.classList.remove("current");
					(document.getElementsByClassName("title")[0] as HTMLElement).classList.add("current");
					animation_stage = 0;
				}
				
				break;
		}
	});

	document.getElementsByTagName("main")[0]!.style.backgroundImage = `url(${globe})`;

	onMount(() => fetch(co2_historical).then(async response => {
		const data: ICO2Historical = (await response.json()).reverse();
		const co2_chart_canvas = document.getElementById("co2_chart")!;

		co2_chart = new Chart(co2_chart_canvas as HTMLCanvasElement, {
			type: "line",
			data: {
				labels: data.map(row => (
					row.year.split(" ")[1] == "CE" ?
					parseInt(row.year.split(" ")[0]) :
					-parseInt(row.year.split(" ")[0])
				)),
				datasets: [{
					data: data.map(row => row.co2),
					borderColor: "#fff",
					segment: {
						borderColor: context => (
							context.p0DataIndex! <= co2_chart_line_progress ?
							"rgb(255, 255, 255)" :
							"rgb(0, 0, 0, 0)"
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
							title: context => formatAbsoluteYear(context[0]!.parsed.x)
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
	}));

	return (
		<>
			<Navigation/>
			<div class="stack">
				<div class="title current">
					<h1>Title</h1>
				</div>
				<canvas id="co2_chart"></canvas>
			</div>
		</>
	);
};

export default Home;
