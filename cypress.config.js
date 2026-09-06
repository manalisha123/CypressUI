const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'spec',
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 20000,
  requestTimeout: 15000,
  responseTimeout: 30000,
  pageLoadTimeout: 120000,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    baseUrl: 'https://app.pws.int.cruk.org',
    testIsolation: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
