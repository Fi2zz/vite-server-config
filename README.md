# Reproduce 'vite -- host', server. host=true

Found this issue while developing the plugin

```bash
   vite --host
```

```js
// the plugin

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
```

```js
// vite.config.js

import { defineConfig } from "vite";

export default defineConfig({ plugins: [vitePluginConfigureServer()] });
```
