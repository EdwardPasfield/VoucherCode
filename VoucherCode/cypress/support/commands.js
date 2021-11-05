/// <reference types="Cypress" />

// -- Start of Command for simpleLogin --
Cypress.Commands.add("simpleLogin", function(login, pass) {
  cy.get(".header__account-icon").click();
  cy.get(".header__account-register > .btn-primary").click();
  cy.get("#log-in-email")
    .type(login)
    .should("have.value", login);
  cy.get("#log-in-password").type(pass);
  cy.get(".login-form__content .btn").contains("Log in").click();
});
// -- End of Command for simpleLogin --
