const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    specPattern: [
      'DZ21/**/*.cy.js',
      'DZ22API/**/*.cy.js',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    ],
    env: {
      user1Email: 'Marina_qauto@ukr.net',
      user1Password: 'Aa1234567*',
      user2Email: 'Maria_qauto@ukr.net',
      user2Password: 'Aa1234567*',
    },
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
