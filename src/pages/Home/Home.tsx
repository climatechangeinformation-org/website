import type { Component } from "solid-js";
import { createSignal, Show } from "solid-js";

import "./Home.scss";
import Navigation from "../../components/NavBar";

import globe from "../../assets/globe.webp";

// TODO: Add sources for the background image

// land_shallow_topo_15360.webp:
// NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

// world.watermask.8100x4050.webp:
// Reto Stöckli; Eric Vermote; Nazmi Saleous; Robert Simmon; David Herring.

// gebco_08_rev_elev_8192x4096.webp:
// NASA's Earth Observatory;  British Oceanographic Data Centre; Jesse Allen.

// cloud_combined_8192.webp:
// NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.


// TODO: Add sources for the historical CO2 data

// 1959 - 2023 data:
// Dr. Xin Lan, NOAA/GML (gml.noaa.gov/ccgg/trends/) and
// Dr. Ralph Keeling, Scripps Institution of Oceanography
// (scrippsco2.ucsd.edu/).

// 803719 BCE - 1958 data:
// Bereiter, B., S. Eggleston, J. Schmitt, C. Nehrbass-Ahles, T. F. Stocker,
// H. Fischer, S. Kipfstuhl, J. Chappellaz. 2015.
// Revision of the EPICA Dome C CO2 record from 800 to 600 kyr before present.
// Geophysical Research Letters, 42(2), 542-549. doi: 10.1002/2014GL061957

let animation_stage = 0;
let co2_chart_module: {
	initiateCO2Chart: () => void;
	updateAnimation: (event: WheelEvent) => number;
} | undefined;

const Home: Component = () => {
	const [show_co2_chart, set_show_co2_chart] = createSignal(false);

	document.addEventListener("wheel", event => {
		switch (animation_stage) {
			case 0: {
				const title = document.getElementsByClassName("title")[0] as HTMLElement;

				if (!title.style.opacity) {
					title.style.opacity = "1";
				}

				if (
					(parseFloat(title.style.opacity) <= 1 && event.deltaY < 0) ||
					event.deltaY >= 0
				) {
					const decrement = event.deltaY / 2000;
					const new_opacity = parseFloat(title.style.opacity) - decrement;
					title.style.opacity = new_opacity.toString();
				}

				if (parseFloat(title.style.opacity) <= 0) {
					animation_stage = 1;

					title.classList.remove("current");

					if (typeof co2_chart_module === "undefined") {
						import("./CO2Chart").then(async chart_module => {
							set_show_co2_chart(true);
							await chart_module.initiateCO2Chart();

							const co2_chart_canvas = document.getElementById("co2_chart");
							co2_chart_canvas?.classList.add("current");

							co2_chart_module = chart_module;
						}).catch(() => {
							console.error("CO2Chart module failed to import");
						});
					} else {
						const co2_chart_canvas = document.getElementById("co2_chart");
						co2_chart_canvas?.classList.add("current");
					}
				}

				break;
			} case 1: {
				if (typeof co2_chart_module !== "undefined") {
					const new_stage = co2_chart_module.updateAnimation(event);

					if (new_stage >= 0) {
						animation_stage = new_stage;
					}
				}

				break;
			} default: {
				console.warn("Invalid animation stage variable");
			}
		}
	});

	const main_element = document.getElementsByTagName("main")[0] as HTMLElement;
	main_element.style.backgroundImage = `url(${globe})`;

	return (
		<>
			<Navigation/>
			<div class="stack">
				<div class="title current">
					<h1>Climate Change</h1>
				</div>
				<Show
					when={show_co2_chart()}
					fallback={<p>Loading...</p>}
				>
					<canvas id="co2_chart"></canvas>
				</Show>
			</div>
		</>
	);
};

export default Home;
