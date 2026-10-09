describe('QAuto App - Docker Firefox Suite', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login functionality for QAuto: should display main page header and Sign In button', () => {
    cy.get('h1').should('be.visible').and('contain', 'Do more!');
    cy.get('.header_signin').should('be.visible').and('contain', 'Sign In');
  });

  it('Navigation and element check: should open and close the Sign In modal dialog', () => {
    cy.get('.header_signin').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-title').should('contain', 'Log in');
    cy.get('.close').click();
    cy.get('.modal-content').should('not.exist');
  });

  it('Dynamic user scenario: should navigate to Guest log-in and open garage panel', () => {
    cy.get('.header-link.-guest').click();
    cy.url().should('include', '/panel/garage');
    cy.get('h1').should('contain', 'Garage');
  });
});
