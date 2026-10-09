const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    specPattern: ['DZ21/**/*.cy.js', 'aqa-advanced_mskvortsova/DZ21/**/*.cy.js'],
    env: {
      user1Email: 'Marina_qauto@ukr.net',
      user1Password: 'Aa1234567*',
      user2Email: 'Maria_qauto@ukr.net',
      user2Password: 'Aa1234567*',
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/qauto',
      overwrite: false,
      html: true,
      json: true
    }
  }
});
