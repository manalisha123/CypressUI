const { defineConfig } = require('cypress')

module.exports = defineConfig({
  numTestKeptINMemory: 0,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 2000000,
  ChromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
