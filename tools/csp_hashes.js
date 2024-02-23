import { cspHashes } from "@vitejs/plugin-legacy";
import { readFileSync } from "node:fs";

let missing_headers = cspHashes;

const headers = readFileSync("src/public/_headers").toString().split("\n");

for (const line of headers) {
	if (line.toLowerCase().includes("content-security-policy")) {
		const policies = line.slice(line.indexOf(":") + 1).split(";");

		for (const policy of policies) {
			if (policy.toLowerCase().startsWith("script-src")) {
				const origins = policy.slice(policy.indexOf(" ") + 1).split(" ");

				for (let origin of origins) {
					origin = origin.slice(1, -1);

					if (origin.startsWith("sha256-")) {
						origin = origin.slice(7);

						if (missing_headers.includes(origin)) {
							missing_headers = missing_headers.filter(item => item !== origin);
						}
					}
				}

				break;
			}
		}

		break;
	}
}

if (missing_headers.length) {
	console.log("Missing script-src policy hashes:");
	console.log(missing_headers.join("\n"));
	process.exitCode = 1;
}
