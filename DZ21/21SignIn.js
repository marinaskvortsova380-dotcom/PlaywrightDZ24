class SignInPage {
  get signInButtonHeader() {
    return cy.get('.header_signin');
  }

  get emailInput() {
    return cy.get('#signinEmail');
  }

  get passwordInput() {
    return cy.get('#signinPassword');
  }

  get loginButton() {
    return cy.get('.modal-footer .btn-primary');
  }

  get signupNameInput() {
    return cy.get('#signupName');
  }

  get signupLastNameInput() {
    return cy.get('#signupLastName');
  }

  get signupEmailInput() {
    return cy.get('#signupEmail');
  }

  get signupPasswordInput() {
    return cy.get('#signupPassword');
  }

  get signupRepeatPasswordInput() {
    return cy.get('#signupRepeatPassword');
  }

  get registerButton() {
    return cy.get('.modal-footer .btn-primary');
  }

  open() {
    cy.visit('/');
  }

  openSignInModal() {
    this.signInButtonHeader.click();
  }

  openSignUpModal() {
    this.signUpButtonHero.click();
  }

  login(email, password) {
    this.openSignInModal();
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.loginButton.click();
  }

  register(name, lastName, email, password, repeatPassword) {
    this.openSignUpModal();
    this.signupNameInput.type(name);
    this.signupLastNameInput.type(lastName);
    this.signupEmailInput.type(email);
    this.signupPasswordInput.type(password);
    this.signupRepeatPasswordInput.type(repeatPassword);
    this.registerButton.click();
  }
}

export default new SignInPage();