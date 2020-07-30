// / <reference types="Cypress" />

describe('Profile actions', () => {
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
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email-field').type('tester123@email.com');
    cy.get('#password-field').type('password');
    cy.get('#loginButton').click();
  });

  it('Should return a users profile upon successful login', () => {
    cy.get('.MuiTypography-h4').should(($header) => {
      const text = $header.text();

      expect(text).to.include('Tester123');
    });
  });

  it('Should change between single and grid view on button click', () => {
    cy.get('#single-view-button').click();
    // cy.get('.MuiPaper-root > .MuiCardContent-root').should('exist');
    cy.get('#grid-view-button').click();
    // cy.get('.MuiCardMedia-root').should('exist');
  });

  it('Should render edit profile page on button click', () => {
    cy.get('#edit-profile-button').click();
    cy.get('#edit-profile-title').should('exist');
  });

  it('Should pre-fill form inputs with existing data', () => {
    cy.get('#edit-profile-button').click();
    cy.get('#username-field').should('have.value', 'Tester123');
    cy.get('#email-field').should('have.value', 'tester123@email.com');
  });

  it('Update user information upon valid entry', () => {
    cy.wait(5000);
    cy.get('#edit-profile-button').click();
    cy.get('#bio-field').type('This is a test bio');
    cy.get('#update-user-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Your details have been saved!');
    });
  });

  it('Should return validation error upon invalid username update', () => {
    cy.wait(5000);
    cy.get('#edit-profile-button').click();
    cy.get('#username-field').clear();
    cy.get('#update-user-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Please check you have a Username and Email!');
    });
  });

  it('Should return validation error upon invalid email update', () => {
    cy.wait(5000);
    cy.get('#edit-profile-button').click();
    cy.get('#email-field').clear();
    cy.get('#update-user-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Please check you have a Username and Email!');
    });
  });

  it('Should return error message upon missing password values', () => {
    cy.wait(5000);
    cy.get('#edit-profile-button').click();
    cy.get('#change-password-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Please check your passwords and try again!');
    });
  });

  it('Should return error message upon incorrect current_password value', () => {
    cy.wait(5000);
    cy.get('#edit-profile-button').click();
    cy.get('#new-password-field').type('newpassword');
    cy.get('#confirm-password-field').type('newpassword');
    cy.get('#current-password-field').type('incorrect');
    cy.get('#change-password-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include(
        'Some details were incorrect, please check password and try again.'
      );
    });
  });

  it('Should return error message upon mismatched new password values', () => {
    cy.wait(5000);
    cy.get('#edit-profile-button').click();
    cy.get('#new-password-field').type('newpasswsord');
    cy.get('#confirm-password-field').type('newpassssword');
    cy.get('#current-password-field').type('password');
    cy.get('#change-password-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Please check your passwords and try again!');
    });
  });

  it('Should return a confirmation message upon successful password change', () => {
    cy.wait(5000);
    cy.get('#edit-profile-button').click();
    cy.get('#new-password-field').type('newpassword');
    cy.get('#confirm-password-field').type('newpassword');
    cy.get('#current-password-field').type('password');
    cy.get('#change-password-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Your new password has been saved!');
    });
    cy.wait(5000);
    cy.get('#new-password-field').type('password');
    cy.get('#confirm-password-field').type('password');
    cy.get('#current-password-field').type('newpassword');
    cy.get('#change-password-button').click();
    cy.get('#client-snackbar').should(($notifcation) => {
      const text = $notifcation.text();

      expect(text).to.include('Your new password has been saved!');
    });
  });

  it('Should be able to delete an account', () => {
    cy.wait(5000);
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
