const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  reporter: 'spec',
  defaultCommandTimeout: 60000,
  chromeWebSecurity: false,
  allowCypressEnv: false,
  pageLoadTimeout: 2000000,
  chromeWebSecurity: false,
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://app.pws.int.cruk.org',
    testIsolation: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
