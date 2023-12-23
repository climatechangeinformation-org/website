import { A } from "@solidjs/router";

import "./NavBar.scss";

export default function Navigation() {
	return (
		<div>
			<ul>
				<li>
					<A href="/articles">Articles</A>
				</li>
			</ul>
		</div>
	);
}
