import 'cypress-file-upload';
// Test navbar upload button without login, should notify to log in on open.
const testFilePath = 'test.jpg';

describe('Landing Search Functionality', () => {
  before(() => {
    cy.visit('http://localhost:3000/signup');
    cy.get('#username-field').type('Tester123');
    cy.get('#email-field').type('tester123@email.com');
    cy.get('#profile-url-field').type('testerboi');
    cy.get('#password-field').type('password');
    cy.get('#confirm-password-field').type('password');
    cy.get(':nth-child(8) > .MuiButtonBase-root').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include(`You've successfully signed up!`);
    });
    cy.get('#menu-navbar-button').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email-field').type('tester123@email.com');
    cy.get('#password-field').type('password');
    cy.get('#loginButton').click();
  });

  it('Creates a dummy post to search', () => {
    cy.wait(5000);
    cy.get('#home-navbar-button').click();
    cy.get('#new-upload-navbar-button').click();
    cy.get('#picture-upload').attachFile(testFilePath);
    cy.get('#caption-field').type('Test caption');
    cy.get('#tags-field').type('searchabletag');
    cy.get('#visibility-field').click();
    cy.get('[data-value="2"]').click();
    cy.get('#create-post-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Post successfuly created!');
    });
  });

  it('Should return single post for search query', () => {
    cy.wait(3000);
    cy.get('#home-navbar-button').click();
    cy.wait(3000);
    cy.get('#search-bar').type('searchabletag');
    cy.get('#returned-post-0').should('exist');
  });

  it('Delete dummy account no longer needed', () => {
    cy.get('#edit-profile-button').click();
    cy.get('#delete-account-button').click();
    cy.get('.MuiDialogActions-root > :nth-child(1) > .MuiButton-label').click();
    cy.get('#delete-account-button').click();
    cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include(
        `We're sad to see you go. Your account has been deleted.`
      );
    });
  });
});
