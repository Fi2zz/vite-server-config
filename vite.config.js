import { defineConfig } from "vite";

function vitePluginConfigureServer() {
	return {
		name: "vite-plugin-configure-server",

		configureServer(resolvedConfig) {
			var server = resolvedConfig.config.server;

			// `vite --host`

			// server.host got 'true' not 'localhost' or others
			if (server.host == true) {
				throw `'server.host' expected be typeof string but got true`;
			}

			var host = server.host || "localhost";
			var protocol = server.https ? "https://" : "http://";
			server.cors = true;
			if (!server.origin) {
				server.origin = `${protocol}${host}:${server.port}`;
			}
		},
	};
}

export default defineConfig({ plugins: [vitePluginConfigureServer()] });
