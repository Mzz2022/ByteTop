import { defineConfig } from "vitest/config"
import { resolve } from "path"

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
	},
	resolve: {
		alias: {
			"@bytetop/core": resolve(__dirname, "./packages/core/src"),
			"@bytetop": resolve(__dirname, "./packages"),
		},
	},
})
