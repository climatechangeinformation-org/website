import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";

import * as Sentry from "@sentry/browser";

import "./index.scss";

import Home from "./pages/Home/Home";

const Impacts = lazy(() => import("./pages/Impacts/Impacts"));
const Causes = lazy(() => import("./pages/Causes/Causes"));

Sentry.init({
	dsn: "https://88a310cd3fb4f41264c4770d72d65ef3@o4505149986242560.ingest.sentry.io/4506748840771584",
	integrations: [
		Sentry.browserTracingIntegration(),
	],
	tracesSampleRate: 1.0
});

render(
	() => <Router>
		<Route path="/" component={Home} />
		<Route path="/impacts" component={Impacts} />
		<Route path="/causes" component={Causes} />
	</Router>,
	document.getElementsByTagName("main")[0] as HTMLElement
);
