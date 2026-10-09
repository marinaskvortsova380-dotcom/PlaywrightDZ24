Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false;
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        });
    }

    return originalFn(element, text, options);
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    cy.get('button.header_signin').click();
    cy.get('input#signinEmail').type(email);
    cy.get('input#signinPassword').type(password, { sensitive: true });

    cy.get('.modal-footer button.btn-primary').click();
});
