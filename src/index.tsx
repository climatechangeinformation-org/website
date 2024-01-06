import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";

import "./index.scss";

import Home from "./pages/Home/Home";

const Impacts = lazy(() => import("./pages/Impacts/Impacts"));
const Causes = lazy(() => import("./pages/Causes/Causes"));

render(
	() => <Router>
		<Route path="/" component={Home} />
		<Route path="/impacts" component={Impacts} />
		<Route path="/causes" component={Causes} />
	</Router>,
	document.getElementById("root") as HTMLElement
);
