// import type { Component } from "solid-js";

import styles from "./App.module.css";
import Navigation from "../../components/NavBar";

export default () => {
	return (
		<div class={styles["App"]}>
			<Navigation/>
		</div>
	);
};
