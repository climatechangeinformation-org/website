import {
	browserTracingIntegration,
	init
} from "@sentry/browser";

const SENTRY_SUBDOMAIN = "88a310cd3fb4f41264c4770d72d65ef3@o4505149986242560";

init({
	dsn: `https://${SENTRY_SUBDOMAIN}.ingest.sentry.io/4506748840771584`,
	integrations: [
		browserTracingIntegration()
	],
	tracesSampleRate: 1.0
});
