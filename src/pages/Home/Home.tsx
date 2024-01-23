import type { Component } from "solid-js";

import "./Home.scss"
import Navigation from "../../components/NavBar";

import satellite_map from "../../assets/land_shallow_topo_15360.webp"; // NASA Goddard Space Flight Center; Reto Stöckli; Robert Simmon.

import water_mask from "../../assets/world.watermask.8100x4050.webp" // Reto Stöckli; Eric Vermote; Nazmi Saleous; Robert Simmon; David Herring.

import topography_map from "../../assets/gebco_08_rev_elev_8192x4096.webp" // NASA's Earth Observatory;  British Oceanographic Data Centre; Jesse Allen.

import atmosphere_vertex from "../../shaders/atmosphere_vertex.glsl";
import atmosphere_fragment from "../../shaders/atmosphere_fragment.glsl";

import * as THREE from "three";
import { LoopSubdivision } from 'three-subdivide';

const Home: Component = () => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(-2, 2.5, 5);
	camera.rotation.set(0, -0.75, 0);

	const renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	const geometry = LoopSubdivision.modify(new THREE.SphereGeometry(3, 48, 48), 4);
	const texture = new THREE.TextureLoader().load(satellite_map);
	const roughness_texture = new THREE.TextureLoader().load(water_mask);
	const displacement_texture = new THREE.TextureLoader().load(topography_map);
	const material = new THREE.MeshStandardMaterial({
		color: 0xffffff,
		map: texture,
		roughnessMap: roughness_texture,
		displacementMap: displacement_texture,
		displacementScale: 0.02
	});

	const sphere = new THREE.Mesh(geometry, material);
	sphere.rotation.y = 0.5;
	scene.add(sphere);

	const atmosphere_material = new THREE.ShaderMaterial({
		vertexShader: atmosphere_vertex,
		fragmentShader: atmosphere_fragment,
		transparent: true
	});
	const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), atmosphere_material);
	atmosphere.scale.set(1.02, 1.02, 1.02);
	scene.add(atmosphere);

	const light = new THREE.PointLight(0xffffff, 200);
	light.position.set(10, 5, -10);
	scene.add(light);

	const ambient = new THREE.AmbientLight();
	scene.add(ambient)

	function animate() {
		requestAnimationFrame(animate);

		sphere.rotation.y += 0.0001;

		renderer.render(scene, camera);
	};

	animate();

	return (
		<div>
			<Navigation/>

			{renderer.domElement}
		</div>
	);
};

export default Home;
