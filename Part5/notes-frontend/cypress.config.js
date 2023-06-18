const { defineConfig } = require("cypress")

module.exports = defineConfig({
	// eslint-disable-next-line no-unused-vars
	e2e: {
		setupNodeEvents(on, config) {
		},
		baseUrl: "http://localhost:3000",
		video: false
	},
	env: {
		BACKEND: "http://localhost:3001/api"
	}
})
