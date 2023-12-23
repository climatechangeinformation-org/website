import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";

import "./index.scss";

import Home from "./pages/Home/Home";

const Articles = lazy(() => import("./pages/Articles/Articles"));

render(
	() => <Router>
		<Route path="/" component={Home} />
		<Route path="/articles" component={Articles} />
	</Router>,
	document.getElementById("root") as HTMLElement
);
