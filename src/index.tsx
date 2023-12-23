import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.scss";
import Home from "./pages/Home/Home";

const root = document.getElementById("root");

if (!(root instanceof HTMLElement)) {
	throw new Error("Root element not found.");
}

render(() => (
	<Router>
		<Route path="/" component={Home} />
	</Router>
), root);
