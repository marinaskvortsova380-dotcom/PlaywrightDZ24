const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
    specPattern: ['DZ21/**/*.cy.js', 'aqa-advanced_mskvortsova/DZ21/**/*.cy.js'],
    env: {
      user1Email: 'Anton_qauto2@ukr.net',
      user1Password: 'Bb12345*',
      user2Email: 'Ivan_qauto2@ukr.net',
      user2Password: 'Bb12345*',
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
