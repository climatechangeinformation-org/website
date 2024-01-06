import { A } from "@solidjs/router";

import "./NavBar.scss";

export default function Navigation() {
	return (
		<nav>
			<A href="/impacts">Impacts</A>
			<A href="/causes">Causes</A>
		</nav>
	);
}
