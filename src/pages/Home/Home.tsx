import type { Component } from "solid-js";

import "./Home.scss"
import Navigation from "../../components/NavBar";

import globe from "../../assets/globe.webp";

// import satellite_map from "../../assets/land_shallow_topo_15360.webp"; // NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

// import water_mask from "../../assets/world.watermask.8100x4050.webp" // Reto Stöckli; Eric Vermote; Nazmi Saleous; Robert Simmon; David Herring.

// import topography_map from "../../assets/gebco_08_rev_elev_8192x4096.webp" // NASA's Earth Observatory;  British Oceanographic Data Centre; Jesse Allen.

// import cloud_map from "../../assets/cloud_combined_8192.webp" // NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

const Home: Component = () => {
	document.getElementsByTagName("main")[0]!.style.backgroundImage = `url(${globe})`
	
	return (
		<>
			<Navigation/>
		</>
	);
};

export default Home;
