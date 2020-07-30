/// <reference types="Cypress" />

const existingTestUser = {
  emailAddress: "test@test.com",
  password: "drowssap",
  profileURL: "testaccount",
  username: "test account",
};

const nonExistingTestUser = {
  emailAddress: "non-existinguser@text.com",
  password: "drowssap",
  profileURL: "nemo",
  username: "Captain Nemo",
};

let emailField = null;
let passwordField = null;
let loginButton = null;

const protocol = "http://";
const domain = "localhost";
const port = "3000";
const pageURL = "signup";

describe("Signup page fields", () => {
  it("Loads the page from URL", () => {
    cy.visit(`${protocol}${domain}:${port}/${pageURL}`);
    cy.url().should("include", `${domain}:${port}/${pageURL}`);
  });
  it("Should be a html document", () => {
    cy.document().its("contentType").should("eq", "text/html");
  });
  it("has a H1 element", () => {
    cy.get("h1");
  });
  it("Has a working field for: Display Name", () => {
    cy.get("#username-field")
      .type(existingTestUser.username)
      .should("have.value", existingTestUser.username)
      .clear();
  });
  it("Has a working field for: Email", () => {
    cy.get("#email-field")
      .type(existingTestUser.emailAddress)
      .should("have.value", existingTestUser.emailAddress)
      .clear();
  });
  it("Has a working field for: Profile URL", () => {
    cy.get("#profile-url-field")
      .type(existingTestUser.profileURL)
      .should("have.value", existingTestUser.profileURL)
      .clear();
  });
  it("Has a working field for: Password", () => {
    cy.get("#password-field")
      .type(existingTestUser.password)
      .should("have.value", existingTestUser.password)
      .clear();
  });
  it("Has a working field for: Password confirmation", () => {
    cy.get("#confirm-password-field")
      .type(existingTestUser.password)
      .should("have.value", existingTestUser.password)
      .clear();
  });
  it("Has a working button for: Creating Account", () => {
    cy.get("#createAccountButton").click();
  });
});

describe("Form Error messages", () => {
  beforeEach(() => {
    cy.visit(`${protocol}${domain}:${port}/${pageURL}`);
  });
  describe("Username", () => {
    it("Cannot be empty", () => {
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar").contains(
        `"username" is not allowed to be empty`
      );
    });
    it("Minimum 6 characters", () => {
      cy.get("#username-field").type("12345");
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(` length must be at least 6 characters long`);
    });
  });
  describe("Email Address", () => {
    it("Should not be empty", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(` is not allowed to be empty`);
    });
    it("Must be a valid email address", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field").type("12345");
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(` must be a valid email`);
    });
  });
  describe("Profile URL", () => {
    it("Should not be empty", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field")
        .type(existingTestUser.emailAddress)
        .should("have.value", existingTestUser.emailAddress);
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(` is not allowed to be empty`);
    });
    it("Suitable pattern, not numerical", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field")
        .type(existingTestUser.emailAddress)
        .should("have.value", existingTestUser.emailAddress);
      cy.get("#profile-url-field").type("1");
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(
          `"profile_url" with value "1" fails to match the Profile URL must be only alphanumeric, - or _ pattern`
        );
    });
    it("Suitable pattern, with _", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field")
        .type(existingTestUser.emailAddress)
        .should("have.value", existingTestUser.emailAddress);
      cy.get("#profile-url-field").type(`_${existingTestUser.profileURL}`);
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(`"password" is not allowed to be empty`);
    });
    it("Suitable pattern, without _", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field")
        .type(existingTestUser.emailAddress)
        .should("have.value", existingTestUser.emailAddress);
      cy.get("#profile-url-field").type(`${existingTestUser.profileURL}`);
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(`"password" is not allowed to be empty`);
    });
  });
  describe("Password", () => {
    it("Should not be empty", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field")
        .type(existingTestUser.emailAddress)
        .should("have.value", existingTestUser.emailAddress);
      cy.get("#profile-url-field")
        .type(existingTestUser.profileURL)
        .should("have.value", existingTestUser.profileURL);
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(` is not allowed to be empty`);
    });
    it("Passwords Match", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field")
        .type(existingTestUser.emailAddress)
        .should("have.value", existingTestUser.emailAddress);
      cy.get("#profile-url-field")
        .type(existingTestUser.profileURL)
        .should("have.value", existingTestUser.profileURL);
      cy.get("#password-field").type("1");

      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(`Please check that your passwords match`);
    });
    it("Minimum length 6 characters", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field")
        .type(existingTestUser.emailAddress)
        .should("have.value", existingTestUser.emailAddress);
      cy.get("#profile-url-field")
        .type(existingTestUser.profileURL)
        .should("have.value", existingTestUser.profileURL);
      cy.get("#password-field").type("1");
      cy.get("#confirm-password-field").type("1");
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(`"password" length must be at least 6 characters long`);
    });
  });
});
describe("Add new user", () => {
  beforeEach(() => {
    cy.visit(`${protocol}${domain}:${port}/${pageURL}`);
  });
  describe("Information supplied in use by other users already", () => {
    it("User with same email", () => {
      cy.get("#username-field")
        .type(existingTestUser.username)
        .should("have.value", existingTestUser.username);
      cy.get("#email-field")
        .type(existingTestUser.emailAddress)
        .should("have.value", existingTestUser.emailAddress);
      cy.get("#profile-url-field")
        .type(existingTestUser.profileURL)
        .should("have.value", existingTestUser.profileURL);
      cy.get("#password-field")
        .type(existingTestUser.password)
        .should("have.value", existingTestUser.password);
      cy.get("#confirm-password-field")
        .type(existingTestUser.password)
        .should("have.value", existingTestUser.password);
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(`A user with this email already exists`);
    });

    it("User with same profile url", () => {
      cy.get("#username-field")
        .type(nonExistingTestUser.username)
        .should("have.value", nonExistingTestUser.username);
      cy.get("#email-field")
        .type(nonExistingTestUser.emailAddress)
        .should("have.value", nonExistingTestUser.emailAddress);
      cy.get("#profile-url-field")
        .type(existingTestUser.profileURL)
        .should("have.value", existingTestUser.profileURL);
      cy.get("#password-field")
        .type(nonExistingTestUser.password)
        .should("have.value", nonExistingTestUser.password);
      cy.get("#confirm-password-field")
        .type(nonExistingTestUser.password)
        .should("have.value", nonExistingTestUser.password);
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(`A user with this profile url already exists`);
    });

    it("Successful addition of non-existing user", () => {
      cy.get("#username-field")
        .type(nonExistingTestUser.username)
        .should("have.value", nonExistingTestUser.username);
      cy.get("#email-field")
        .type(nonExistingTestUser.emailAddress)
        .should("have.value", nonExistingTestUser.emailAddress);
      cy.get("#profile-url-field")
        .type(nonExistingTestUser.profileURL)
        .should("have.value", nonExistingTestUser.profileURL);
      cy.get("#password-field")
        .type(nonExistingTestUser.password)
        .should("have.value", nonExistingTestUser.password);
      cy.get("#confirm-password-field")
        .type(nonExistingTestUser.password)
        .should("have.value", nonExistingTestUser.password);
      cy.get("#createAccountButton").click();
      cy.get("#client-snackbar")
        .parent()
        .last()
        .contains(`You've successfully signed up`);
    });
  });
});
