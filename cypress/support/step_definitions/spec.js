const { Given } = require("cypress-cucumber-preprocessor/steps");

Given("I visit the Cypress website", () => {
  cy.visit("https://example.cypress.io");
});
