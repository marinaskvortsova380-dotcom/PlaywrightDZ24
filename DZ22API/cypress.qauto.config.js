const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    specPattern: ['DZ22API/**/*.cy.js', 'aqa-advanced_mskvortsova/DZ22API/**/*.cy.js'],
    supportFile: 'cypress/support/e2e.js',
    env: {
      user1Email: 'Marina_qauto@ukr.net',
      user1Password: 'Aa1234567*',
      basicAuthHeader: 'Basic Z3Vlc3Q6d2VsY29tZTJxYXV0bw==',
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/dz22',
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
