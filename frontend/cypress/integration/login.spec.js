/// <reference types="Cypress" />

const testUser = {
  emailAddress: "test@text.com",
  password: "dorwssap",
};

describe("Test login page elements", () => {
  it("Access login page", () => {
    cy.visit(`http://localhost:3000/login`);
  });
  it("Should be a html document", () => {
    cy.document().its("contentType").should("eq", "text/html");
  });
  it("has a H1 element", () => {
    cy.get("h1");
  });
  it("has an email field that is not disabled", () => {
    const emailField = cy
      .get("#email-field")
      .type(testUser.emailAddress)
      .clear();
  });
  it("has a password field that is not disabled", () => {
    const passwordField = cy
      .get("#password-field")
      .type(testUser.password)
      .clear();
  });
  it("has a login button' ", () => {
    cy.get("#loginButton");
  });
  it("has a signup link", () => {
    cy.get("#signupLink");
  });
});

describe("Prevents user that ");
