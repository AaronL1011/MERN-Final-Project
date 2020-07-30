/// <reference types="Cypress" />

const nonExistingTestUser = {
  emailAddress: "non-existinguser@text.com",
  password: "dorwssap",
  profileURL: "nemo",
};

const existingTestUser = {
  emailAddress: "test@test.com",
  password: "drowssap",
  profileURL: "testaccount",
};

let emailField = null;
let passwordField = null;
let loginButton = null;

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
    emailField = cy.get("#email-field");
    emailField
      .type(nonExistingTestUser.emailAddress)
      .should("have.value", nonExistingTestUser.emailAddress)
      .clear();
  });
  it("has a password field that is not disabled", () => {
    passwordField = cy.get("#password-field");
    passwordField
      .type(nonExistingTestUser.password)
      .should("have.value", nonExistingTestUser.password)
      .clear();
  });
  it("has a login button' ", () => {
    loginButton = cy.get("#loginButton");
  });
  it("has a signup link", () => {
    cy.get("#signupLink");
  });
});

describe("Form error messages", () => {
  beforeEach(() => {
    cy.reload();
  });

  it("Email must be at least 6 characters", () => {
    cy.get("#email-field").clear().type("12345").should("have.value", "12345");
    cy.get("#loginButton").click();
    cy.get("#client-snackbar")
      .parent()
      .last()
      .contains(` must be at least 6 characters long`);
    cy.get("#email-field").clear();
  });
  it("Must be a valid email address", () => {
    cy.get("#email-field")
      .clear()
      .type("1234567")
      .should("have.value", "1234567");
    cy.get("#loginButton").click();
    cy.get("#client-snackbar")
      .parent()
      .last()
      .contains(`must be a valid email`);
    cy.get("#email-field").clear();
  });
  it("Minimum password length is 6 characters", () => {
    cy.get("#email-field")
      .clear()
      .type(nonExistingTestUser.emailAddress)
      .should("have.value", nonExistingTestUser.emailAddress);
    cy.get("#password-field")
      .clear()
      .type("12345")
      .should("have.value", "12345");
    cy.get("#loginButton").click();
    cy.get("#client-snackbar")
      .parent()
      .last()
      .contains(`"password" length must be at least 6 characters long`);
    cy.get("#password-field").clear();
  });
});

describe("Prevents non existing user from logging in", () => {
  it("Shows error message if user is not in database", () => {
    cy.reload();
    emailField = cy
      .get("#email-field")
      .type(nonExistingTestUser.emailAddress)
      .should("have.value", nonExistingTestUser.emailAddress);
    passwordField = cy
      .get("#password-field")
      .type(nonExistingTestUser.password)
      .should("have.value", nonExistingTestUser.password);

    cy.get("#loginButton").click();
    cy.get("#client-snackbar").contains(
      "Some details were incorrect, please check email and password and try again."
    );
  });
  it("Stay at the login page", () => {
    cy.url().should("include", "/login");
  });
});

describe("Create an account Link", () => {
  it("'Create account' link directs user to signup page", () => {
    cy.visit(`http://localhost:3000/login`);

    const link = cy.get("#signupLink");
    link.contains("Create an Account");
    link.click().wait(1500).url().should("include", "/signup");
  });
});
describe("Allows existing user to login", () => {
  it("Accepts valid user details", () => {
    cy.visit(`http://localhost:3000/login`);
    cy.get("#email-field")
      .clear()
      .type(existingTestUser.emailAddress)
      .should("have.value", existingTestUser.emailAddress);
    cy.get("#password-field")
      .clear()
      .type(existingTestUser.password)
      .should("have.value", existingTestUser.password);
    cy.get("#loginButton").click();
  });
  it("Provides notification of log in success", () => {
    cy.get("#client-snackbar").parent().last().contains(`You're logged in!`);
  });
  it("Directs user to their profile page", () => {
    cy.url().should("include", `/${existingTestUser.profileURL}`);
  });
});
