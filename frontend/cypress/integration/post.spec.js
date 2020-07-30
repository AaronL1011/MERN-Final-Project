import 'cypress-file-upload';
// Test navbar upload button without login, should notify to log in on open.
const testFilePath = 'test.jpg';

describe('Post actions', () => {
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

  it('Should return notification to log in if user not signed in when trying to post.', () => {
    cy.visit('http://localhost:3000');
    cy.get(
      ':nth-child(2) > .MuiBottomNavigationAction-wrapper > .MuiSvgIcon-root'
    ).click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('You need to log in to create a post!');
    });
    cy.get('.MuiButton-outlinedPrimary > .MuiButton-label').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('You need to log in to create a post!');
    });
    cy.get('#caption-field').should('be.disabled');
    cy.get('#tags-field').should('be.disabled');
  });

  it('Should ask for a valid file type if no file selected', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email-field').type('tester123@email.com');
    cy.get('#password-field').type('password');
    cy.get('#loginButton').click();
    cy.get(
      ':nth-child(2) > .MuiBottomNavigationAction-wrapper > .MuiSvgIcon-root'
    ).click();
    cy.wait(7000);
    cy.get('.MuiButton-outlinedPrimary > .MuiButton-label').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Please choose either a JPEG or PNG!');
    });
  });

  it('Fields should not be disabled when logged in', () => {
    cy.get('#caption-field').should('not.be.disabled');
    cy.get('#tags-field').should('not.be.disabled');
    cy.get('#visibility-field').should('not.be.disabled');
  });

  it('Should be able to create a post when logged in', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email-field').type('tester123@email.com');
    cy.get('#password-field').type('password');
    cy.get('#loginButton').click();
    cy.wait(5000);
    cy.get('#new-upload-navbar-button').click();
    cy.get('#picture-upload').attachFile(testFilePath);
    cy.get('#caption-field').type('Test caption');
    cy.get('#tags-field').type('test, tags');
    cy.get('#visibility-field').click();
    cy.get('[data-value="2"]').click();
    cy.get('#create-post-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Post successfuly created!');
    });
  });

  it('Should be able to update a post information', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email-field').type('tester123@email.com');
    cy.get('#password-field').type('password');
    cy.get('#loginButton').click();
    cy.get('.MuiCardMedia-root').click();
    cy.get('.MuiButton-outlinedPrimary').click();
    cy.get('#caption-field').type('Testing caption');
    cy.get('#tags-field').type('testing, tags');
    cy.wait(7000);
    cy.get(
      '.MuiCardActions-root > .MuiButton-outlinedPrimary > .MuiButton-label'
    ).click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Post successfully updated!');
    });
  });

  it('Should be able to delete a post', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email-field').type('tester123@email.com');
    cy.get('#password-field').type('password');
    cy.get('#loginButton').click();
    cy.get('.MuiCardMedia-root').click();
    cy.wait(5000);
    cy.get('.MuiButton-outlinedSecondary > .MuiButton-label').click();
    cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Post successfully deleted.');
    });
  });

  it('Delete dummy account no longer needed', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email-field').type('tester123@email.com');
    cy.get('#password-field').type('password');
    cy.get('#loginButton').click();
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
