import type { Component } from "solid-js";
import { onMount } from "solid-js";

import "./Home.scss"
import Navigation from "../../components/NavBar";

import globe from "../../assets/globe.webp";
import co2_historical from "../../assets/co2_historical.json?url";

import {
	Chart,
	Tooltip,
	LinearScale,
	LineElement,
	PointElement,
	CategoryScale,
	LineController,
} from "chart.js";

Chart.register(
	Tooltip,
	LinearScale,
	LineElement,
	PointElement,
	CategoryScale,
	LineController
);

Chart.defaults.color = "#f00";
Chart.defaults.borderColor = "#f00";

// import satellite_map from "../../assets/land_shallow_topo_15360.webp"; // NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

// import water_mask from "../../assets/world.watermask.8100x4050.webp" // Reto Stöckli; Eric Vermote; Nazmi Saleous; Robert Simmon; David Herring.

// import topography_map from "../../assets/gebco_08_rev_elev_8192x4096.webp" // NASA's Earth Observatory;  British Oceanographic Data Centre; Jesse Allen.

// import cloud_map from "../../assets/cloud_combined_8192.webp" // NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

interface ICO2Historical {
	year: string,
	co2: number,
	map: typeof Array.prototype.map
}

var animation_stage = 0;
var co2_chart_line_progress = 0;

function rgbStringValues(string: string) {
	return string.slice(4, -1).split(", ").map(value => parseFloat(value));
}

const Home: Component = () => {
	let co2_canvas: HTMLCanvasElement | undefined;
	let co2_chart: Chart | undefined;

	document.addEventListener("wheel", event => {
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
					title.style.opacity = (parseFloat(title.style.opacity) - event.deltaY / 500).toString()
				}
				
				if (parseFloat(title.style.opacity) <= 0) {
					animation_stage = 1;
					title.classList.remove("current");
					co2_canvas.classList.add("current");
				}

				break;
			case 1:
				const current_color = rgbStringValues(co2_chart.options.scales.x.grid.color as string);
				const current_opacity = current_color.pop();

				if (
					(current_opacity <= 0.5 && event.deltaY > 0) ||
					event.deltaY <= 0
				) {
					const new_rgb = `rgb(${current_color.join(", ")}, ${current_opacity + event.deltaY / 500})`;

					co2_chart.options.scales.x.grid.color = new_rgb;
					co2_chart.options.scales.x.ticks.color = new_rgb;
					co2_chart.options.scales.x.border.color = new_rgb;
					co2_chart.options.scales.y.grid.color = new_rgb;
					co2_chart.options.scales.y.ticks.color = new_rgb;
					co2_chart.options.scales.y.border.color = new_rgb;

				}

				co2_chart_line_progress += Math.ceil(event.deltaY / 5);
				co2_chart.update();

				if (co2_chart_line_progress <= 0) {
					co2_canvas.classList.remove("current");
					(document.getElementsByClassName("title")[0] as HTMLElement).classList.add("current");
					animation_stage = 0;
				}
				
				break;
		}
	});

	document.getElementsByTagName("main")[0]!.style.backgroundImage = `url(${globe})`;

	onMount(() => fetch(co2_historical).then(async response => {
		const data: ICO2Historical = (await response.json()).reverse();

		co2_chart = new Chart(co2_canvas, {
			type: "line",
			data: {
				labels: data.map(row => row.year),
				datasets: [{
					data: data.map(row => row.co2),
					borderColor: "#fff",
					segment: {
						borderColor: ctx => ctx.p0DataIndex <= co2_chart_line_progress ?  "rgb(255, 255, 255)" : "rgb(0, 0, 0, 0)"
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
						mode: "index",
						intersect: false
					}
				},
				responsive: true,
				scales: {
					x: {
						grid: {
							color: "rgb(255, 255, 255, 0)"
						},
						ticks: {
							color: "rgb(255, 255, 255, 0)"
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
		});
	}));

	return (
		<>
			<Navigation/>
			<div class="stack">
				<div class="title current">
					<h1>Title</h1>
				</div>
				<canvas ref={co2_canvas}></canvas>
			</div>
		</>
	);
};

export default Home;
