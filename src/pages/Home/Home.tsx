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

Chart.defaults.color = "#fff";
Chart.defaults.borderColor = "#fff8";

// import satellite_map from "../../assets/land_shallow_topo_15360.webp"; // NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

// import water_mask from "../../assets/world.watermask.8100x4050.webp" // Reto Stöckli; Eric Vermote; Nazmi Saleous; Robert Simmon; David Herring.

// import topography_map from "../../assets/gebco_08_rev_elev_8192x4096.webp" // NASA's Earth Observatory;  British Oceanographic Data Centre; Jesse Allen.

// import cloud_map from "../../assets/cloud_combined_8192.webp" // NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

interface ICO2Historical {
	year: string,
	co2: number,
	map: typeof Array.prototype.map
}

const Home: Component = () => {
	document.getElementsByTagName("main")[0]!.style.backgroundImage = `url(${globe})`;

	let co2_chart: HTMLCanvasElement | undefined;

	onMount(() => fetch(co2_historical).then(async response => {
		const data: ICO2Historical = (await response.json()).reverse();

		new Chart(co2_chart, {
			type: "line",
			data: {
				labels: data.map(row => row.year),
				datasets: [{
					data: data.map(row => row.co2),
					borderColor: "#fff"
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
					y: {
						beginAtZero: true
					}
				}
			}
		});
	}));

	return (
		<>
			<Navigation/>
			<div class="stack">
				<canvas ref={co2_chart}></canvas>
			</div>
		</>
	);
};

export default Home;
